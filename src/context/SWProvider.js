import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import getSWData from '../services/SWAPI';

function SWProvider({ children }) {
  const [data, setData] = useState([]);
  const [rootData, setRootData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });
  const [isFetching, setIsFetching] = useState(false);

  const fetchSWData = async () => {
    setIsFetching(true);
    const newData = await getSWData();
    newData.results.forEach((element) => {
      delete element.residents;
    });
    setData(newData.results);
    setRootData(newData.results);
  };

  // Filtro por nome
  const applyNameFilter = (value) => {
    const filteredData = data.filter((entry) => entry.name.includes(value));
    setData(filteredData);
  };

  useEffect(() => {
    if (filters.filterByName.name !== '') {
      applyNameFilter(filters.filterByName.name);
    } else {
      setData(rootData);
    }
  }, [filters.filterByName.name]);

  const addNameFilter = (value) => {
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  // Filtro pelas outras opções
  const applyOtherFilters = () => {
    if (filters.filterByNumericValues.length !== 0) {
      filters.filterByNumericValues.forEach((element) => {
        const { column, comparison, number } = element;
        const intNumber = parseInt(number, 10);
        let filteredData;
        switch (comparison) {
        case 'maior que':
          filteredData = data.filter(
            (entry) => parseInt(entry[column], 10) > intNumber,
          );
          break;
        case 'menor que':
          filteredData = data.filter(
            (entry) => parseInt(entry[column], 10) < intNumber,
          );
          break;
        default:
          filteredData = data.filter(
            (entry) => parseInt(entry[column], 10) === intNumber,
          );
          break;
        }
        setData(filteredData);
      });
    }
  };

  useEffect(() => {
    if (filters.filterByNumericValues.length !== 0) {
      applyOtherFilters();
    } else {
      setData(rootData);
    }
  }, [filters.filterByNumericValues]);

  const addOtherFilters = (column, comparison, number) => {
    setFilters({
      ...filters,
      filterByNumericValues: filters.filterByNumericValues.concat({
        column,
        comparison,
        number,
      }),
    });
  };

  const removeNumberFilter = (id) => {
    const newFilter = filters.filterByNumericValues;
    newFilter.splice(id, 1);

    setFilters({
      ...filters,
      filterByNumericValues: newFilter,
    });
    setData(rootData);
    if (filters.filterByNumericValues.length > 0) {
      applyOtherFilters();
    }
    console.log(filters.filterByNumericValues);
  };

  const otherFilters = filters.filterByNumericValues;

  return (
    <SWContext.Provider
      value={
        { data,
          isFetching,
          fetchSWData,
          addNameFilter,
          addOtherFilters,
          removeNumberFilter,
          otherFilters }
      }
    >
      { children }
    </SWContext.Provider>
  );
}

SWProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SWProvider;
