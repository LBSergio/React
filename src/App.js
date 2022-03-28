import React from 'react';
import { UseState } from './UseState.js';
import { ClassState } from './ClassState.js';
import { UseReducer } from './UseReducer.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name="UseState nombre"/>
      <ClassState name="ClassState nombre"/>
      <UseReducer name="UseReducer nombre"/>
    </div>
  );
}

export default App;
