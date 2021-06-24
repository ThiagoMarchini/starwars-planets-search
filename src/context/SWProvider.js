import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import getSWData from '../services/SWAPI';

function SWProvider({ children }) {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchSWData = async () => {
    // seta isFetching pra true
    setIsFetching(true);
    // fazer a requisicao
    const newData = await getSWData();
    // armazenar o resultado no context
    setData(newData);
  };

  return (
    <SWContext.Provider value={ { data, isFetching, fetchSWData } }>
      { children }
    </SWContext.Provider>
  );
}

SWProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SWProvider;
