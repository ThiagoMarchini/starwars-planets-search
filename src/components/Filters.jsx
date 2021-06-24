import React, { useContext } from 'react';
import SWContext from '../context/SWContext';

function Filters() {
  const { addNameFilter } = useContext(SWContext);

  function handleChange(event) {
    addNameFilter(event.target.value);
  }

  return (
    <form>
      <h1>Filtros</h1>
      <label htmlFor="name">
        Nome:
        <input
          type="text"
          name="name"
          id="name"
          data-testid="name-filter"
          onChange={ handleChange }
        />
      </label>
    </form>
  );
}

export default Filters;
