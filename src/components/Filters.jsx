import React, { useContext, useState } from 'react';
import SWContext from '../context/SWContext';

function Filters() {
  const { addNameFilter, addOtherFilters } = useContext(SWContext);
  const [filters, setFilters] = useState({
    column: '',
    comparison: '',
    number: null,
  });

  function handleNameChange({ target: { value } }) {
    addNameFilter(value);
  }

  function textFilter() {
    return (
      <label htmlFor="name">
        Nome:
        <input
          type="text"
          name="name"
          id="name"
          data-testid="name-filter"
          onChange={ handleNameChange }
        />
      </label>
    );
  }

  function handleColumnSelect({ target: { value } }) {
    setFilters({
      ...filters,
      column: value,
    });
  }

  function handleComparisonSelect({ target: { value } }) {
    setFilters({
      ...filters,
      comparison: value,
    });
  }

  function handleNumberInput({ target: { value } }) {
    setFilters({
      ...filters,
      number: value,
    });
  }

  function applyComparison() {
    const { column, comparison, number } = filters;
    addOtherFilters(column, comparison, number);
  }

  function selectors() {
    return (
      <form>
        <label htmlFor="columnSelect">
          Coluna:
          <select
            name="columnSelect"
            data-testid="column-filter"
            onChange={ handleColumnSelect }
          >
            {columnFilter.map((entry, id) => (
              <option
                key={ id }
                value={ Object.keys(entry) }
              >
                { Object.values(entry) }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison">
          Faixa:
          <select
            name="comparison"
            data-testid="comparison-filter"
            onChange={ handleComparisonSelect }
          >
            {comparison.map((entry, id) => (
              <option
                key={ id }
                value={ entry }
              >
                { entry }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="number">
          Quantidade:
          <input
            type="numbers"
            name="number"
            data-testid="value-filter"
            onChange={ handleNumberInput }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ applyComparison }
        >
          Filtrar
        </button>
      </form>
    );
  }

  return (
    <div>
      <h1>Filtros</h1>
      {textFilter()}
      {selectors()}
    </div>
  );
}

export default Filters;
