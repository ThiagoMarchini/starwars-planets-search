import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import getSWData from '../services/SWAPI';

function SWProvider({ children }) {
  const [data, setData] = useState([]);
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
      fetchSWData();
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
    console.log(filters);
    if (filters.filterByNumericValues.length !== 0) {
      const { column, comparison, number } = filters.filterByNumericValues[0];
      const intNumber = parseInt(number, 10);
      let filteredData;
      switch (comparison) {
      case 'maior que':
        filteredData = data.filter((entry) => parseInt(entry[column], 10) > intNumber);
        break;
      case 'menor que':
        filteredData = data.filter((entry) => parseInt(entry[column], 10) < intNumber);
        break;
      default:
        filteredData = data.filter((entry) => parseInt(entry[column], 10) === intNumber);
        break;
      }
      setData(filteredData);
    }
  };

  useEffect(() => {
    if (filters.filterByNumericValues.length !== 0) {
      applyOtherFilters();
    } else {
      fetchSWData();
    }
  }, [filters.filterByNumericValues]);

  const addOtherFilters = (column, comparison, number) => {
    setFilters({
      ...filters,
      filterByNumericValues: [{
        column,
        comparison,
        number,
      }],
    });
  };

  return (
    <SWContext.Provider
      value={
        { data,
          isFetching,
          fetchSWData,
          addNameFilter,
          addOtherFilters }
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
