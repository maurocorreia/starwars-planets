import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [planetsData, setPlanets] = useState([]);
  const [planetDataStorage, setPlanetDataStorage] = useState([]);
  const [fetchStatus, setLoad] = useState(false);
  const [input, setInput] = useState({ filterByName: { name: '' } });
  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  // Montagem do filtro.
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [filterArray, setFilterArray] = useState([]);

  // Montagem da lista.
  const fetchAPI = async () => {
    const api = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const apiJSON = await api.json();
    const data = apiJSON.results;
    setPlanets(data);
    setPlanetDataStorage(data);
    setLoad(true);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // Adição de Filtros
  const filterPlanets = () => {
    setFilterArray((prevState) => [...prevState, { column, comparison, value }]);
    const optionsFilter = options.filter((aux) => aux !== column);
    setOptions(optionsFilter);
  };

  // Filtrando a Lista.
  const filterAction = () => {
    if (filterArray.length > 0) {
      filterArray.map((filterData) => {
        const { column: columnIn, comparison: comparisonIn, value: valueIn } = filterData;

        if (comparisonIn === 'maior que') {
          const filteredArray = planetDataStorage.filter((aux) => Number(aux[columnIn]) > Number(valueIn));
          return setPlanetDataStorage(filteredArray);
        }
        if (comparisonIn === 'menor que') {
          const filteredArray = planetDataStorage
            .filter((aux) => Number(aux[columnIn]) < Number(valueIn));
          return setPlanetDataStorage(filteredArray);
        }
        if (comparisonIn === 'igual a') {
          const filteredArray = planetDataStorage
            .filter((aux) => Number(aux[columnIn]) === Number(valueIn));
          return setPlanetDataStorage(filteredArray);
        }
        return 'ERROR';
      });
    } else {
      return setPlanetDataStorage(planetsData);
    }
  };

  useEffect(() => {
    console.log(filterArray);
    filterAction();
  }, [filterArray]);

  // Input.
  const updatePlanets = () => {
    const filteredArray = planetsData
      .filter((aux) => aux.name.includes(input.filterByName.name.toLowerCase()));
    setPlanetDataStorage(filteredArray);
  };

  useEffect(() => {
    updatePlanets();
  }, [input, planetsData]);

  // Remoção de Items.
  const removeItem = (aux) => {
    const arrayRemoved = filterArray.filter((array) => array !== aux);
    setFilterArray(arrayRemoved);
    setPlanetDataStorage(planetsData);
    setOptions((prevState) => [aux.column, ...prevState]);
  };

  const removeFilters = () => {
    setFilterArray([]);
  };

  return (
    <Context.Provider
      value={ {
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
      } }
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
