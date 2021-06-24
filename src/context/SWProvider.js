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
    const { column, comparison, number } = filters.filterByNumericValues;
    let filteredData;
    switch (comparison) {
    case 'maior que':
      filteredData = data.filter((entry) => entry[column] > number);
      break;
    case 'menor que':
      filteredData = data.filter((entry) => entry[column] < number);
      break;
    default:
      filteredData = data.filter((entry) => entry[column] === number);
      break;
    }
    setData(filteredData);
  };

  useEffect(() => {
    if (filters.filterByNumericValues !== []) {
      applyNameFilter(filters.filterByName.name);
    } else {
      fetchSWData();
    }
  }, [applyNameFilter, filters.filterByName.name]);

  const addOtherFilters = (column, comparison, number) => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        filters.filterByNumericValues.concat({
          column,
          comparison,
          number,
        }),
      ],
    });
  };

  console.log(data);
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
