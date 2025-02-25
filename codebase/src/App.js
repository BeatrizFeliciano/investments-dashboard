import { useEffect, useState } from 'react';
import './App.css';
import data from "./assets/investors.json"
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header data={data}/>
    </div>
  );
}

export default App;
