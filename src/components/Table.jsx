import React, { useContext, useEffect } from 'react';
import SWContext from '../context/SWContext';

function Table() {
  const { data, isFetching, fetchSWData } = useContext(SWContext);

  useEffect(() => {
    fetchSWData();
  }, []);

  const createTableHeaders = () => {
    let headers;
    if (data.length !== 0) {
      headers = Object.keys(data.results[0])
        .filter((entry) => entry !== 'population');
      return (
        headers.map((entry) => <td key={ entry }>{entry}</td>)
      );
    }
  };

  const createTableRows = () => {
    if (data.length !== 0) {
      const planets = data.results.map((entry) => Object.values(entry));
      // console.log(planets);
      return (
        planets.map((planet, id) => (
          <tr key={ id }>
            {planet.map((entry, id2) => (
              <td key={ id2 }>
                {entry}
              </td>))}
          </tr>))
      );
    }
  };

  if (!isFetching) return <h1>Loading...</h1>;

  return (
    <table>
      <thead>
        <tr>
          {createTableHeaders()}
        </tr>
      </thead>
      <tbody>
        {createTableRows()}
      </tbody>
    </table>
  );
}

export default Table;
