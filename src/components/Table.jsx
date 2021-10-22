import React, { useContext, useEffect } from 'react';
import SWContext from '../context/SWContext';
import BSTable from 'react-bootstrap/Table';

function Table() {
  const { data, isFetching, fetchSWData } = useContext(SWContext);

  useEffect(() => {
    fetchSWData();
  }, []);

  const createTableHeaders = () => {
    let headers;
    if (data.length !== 0) {
      headers = Object.keys(data[0]);
      return (
        headers.map((entry, id) => <th key={ id }>{entry}</th>)
      );
    }
  };

  const createTableRows = () => {
    if (data.length !== 0) {
      const planets = data.map((entry) => Object.values(entry));
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
    <BSTable responsive striped bordered hover variant="dark">
      <thead>
        <tr>
          {createTableHeaders()}
        </tr>
      </thead>
      <tbody>
        {createTableRows()}
      </tbody>
    </BSTable>
  );
}

export default Table;
