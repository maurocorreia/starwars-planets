import React, { useContext } from 'react';
import Context from '../context/Context';

function List() {
  const {
    planetDataStorage,
    fetchStatus,
    filterPlanets,
    options,
    filterArray,
    removeFilters,
    removeItem,
    value,
    column,
    comparison,
    setValue,
    setComparison,
    setColumn,
    setInput,
  } = useContext(Context);

  

  return (
    <section>
      <section className="input-div">
        <input
          placeholder='Digite o planeta...'
          className="main-input"
          data-testid="name-filter"
          type="text"
          onChange={ (event) => setInput({ filterByName: { name: event.target.value } }) }
        />
      </section>

      <section className="menu">
        <select
          data-testid="column-filter"
          value={ column }
          onClick={ (event) => setColumn(event.target.value) }
          onChange={ (event) => setColumn(event.target.value) }
        >
          { options.map((option, key) => (
            <option value={ option } key={ key }>{ option }</option>
          ))}
        </select>

        <select
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ (event) => setComparison(event.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="number"
          data-testid="value-filter"
          value={ value }
          onChange={ (event) => setValue(event.target.value) }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ filterPlanets }
          >
          Filtrar
        </button>

        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ removeFilters }
        >
          Remover Filtros
        </button>
      </section>
     
      <section className="filters">
        {filterArray.map((aux) => (
          <div data-testid="filter" key={ aux.column } className="filter-container">
            <p>{`${aux.column}  ${aux.comparison} ${aux.value}`}</p>
            <button type="button" onClick={ () => removeItem(aux) }>X</button>
          </div>))}
      </section>

      <section class="table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rotation Period</th>
              <th>Orbital Period</th>
              <th>Diameter</th>
              <th>Climate</th>
              <th>Gravity</th>
              <th>Terrain</th>
              <th>Surface Water</th>
              <th>Population</th>
            </tr>
          </thead>

          <tbody>
            {fetchStatus && planetDataStorage.map((aux) => (
              <tr key={ aux.name } className={aux.name}>
                <td className='planetName'>{aux.name}</td>
                <td>{aux.rotation_period}</td>
                <td>{aux.orbital_period}</td>
                <td>{aux.diameter}</td>
                <td>{aux.climate}</td>
                <td>{aux.gravity}</td>
                <td>{aux.terrain}</td>
                <td>{aux.surface_water}</td>
                <td>{aux.population}</td>
              </tr>
            ))}            
          </tbody>
        </table>
      </section>
    </section>
  );
}

export default List;
