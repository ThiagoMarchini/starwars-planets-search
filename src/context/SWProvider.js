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
  });
  const [isFetching, setIsFetching] = useState(false);

  const applyFilter = (value) => {
    const filteredData = data.filter((entry) => entry.name.includes(value));
    setData(filteredData);
  };

  const fetchSWData = async () => {
    setIsFetching(true);
    const newData = await getSWData();
    setData(newData.results);
  };

  useEffect(() => {
    if (filters.filterByName.name !== '') {
      applyFilter(filters.filterByName.name);
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

  return (
    <SWContext.Provider value={ { data, isFetching, fetchSWData, addNameFilter } }>
      { children }
    </SWContext.Provider>
  );
}

SWProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SWProvider;
