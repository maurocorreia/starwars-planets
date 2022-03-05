import React from 'react';
import Provider from './context/Provider';
import Home from './pages/Home';
import './App.css';
import Stars from './components/Stars';

function App() {


  return (
    <Provider>
      <Stars/>
      <Home />
    </Provider>
  );
}

export default App;
