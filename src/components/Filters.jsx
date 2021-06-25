import React, { useContext, useState } from 'react';
import SWContext from '../context/SWContext';

function Filters() {
  const {
    addNameFilter,
    addOtherFilters,
    otherFilters,
    removeNumberFilter,
  } = useContext(SWContext);
  const [columnFilter, setColumnFilter] = useState([
    { population: 'population' },
    { orbital_period: 'orbital_period' },
    { diameter: 'diameter' },
    { rotation_period: 'rotation_period' },
    { surface_water: 'surface_water' },
  ]);
  const [comparisonFilter] = useState([
    'maior que',
    'menor que',
    'igual a',
  ]);
  const [filters, setFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    number: '0',
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
      number: value.toString(),
    });
  }

  function applyOtherFilters() {
    const { column, comparison, number } = filters;
    const newColumnFilter = columnFilter;
    const population = 0;
    const orbital = 1;
    const diameter = 2;
    const rotation = 3;
    const water = 4;
    switch (column) {
    case 'population':
      newColumnFilter.splice(population, 1);
      break;
    case 'orbital_period':
      newColumnFilter.splice(orbital, 1);
      break;
    case 'diameter':
      newColumnFilter.splice(diameter, 1);
      break;
    case 'rotation_period':
      newColumnFilter.splice(rotation, 1);
      break;
    default:
      newColumnFilter.splice(water, 1);
      break;
    }
    setColumnFilter(newColumnFilter);
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
            {comparisonFilter.map((entry, id) => (
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
            type="number"
            name="number"
            data-testid="value-filter"
            onChange={ handleNumberInput }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ applyOtherFilters }
        >
          Filtrar
        </button>
      </form>
    );
  }

  function remove(element, column) {
    const newColumns = columnFilter;
    const population = 0;
    const orbital = 1;
    const diameter = 2;
    const rotation = 3;
    const water = 4;
    let index;
    removeNumberFilter(element);
    switch (column) {
    case 'population':
      index = population;
      break;
    case 'orbital_period':
      index = orbital;
      break;
    case 'diameter':
      index = diameter;
      break;
    case 'rotation_period':
      index = rotation;
      break;
    default:
      index = water;
      break;
    }
    newColumns.splice(index, 0, column);
    setColumnFilter(newColumns);
  }

  function showAppliedFilters() {
    if (otherFilters.length !== 0) {
      return (
        <div className="filters">
          {otherFilters.map((entry, id) => (
            <span key={ id } data-testid="filter">
              { entry.column }
              &nbsp;
              { entry.comparison }
              &nbsp;
              { entry.number }
              &nbsp;
              <button
                onClick={ () => remove(id, entry.column) }
                type="button"
                name="button"
                id="button"
              >
                X
              </button>
            </span>
          ))}
        </div>
      );
    }
  }

  return (
    <div>
      <h1>Filtros</h1>
      {textFilter()}
      {selectors()}
      {showAppliedFilters()}
    </div>
  );
}

export default Filters;
