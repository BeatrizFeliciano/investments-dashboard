import { useState } from 'react';
import './App.css';
import data from "./assets/investors.json"
import Header from './components/Header';
import InsightsArea from './components/InsightsArea/InsightsArea';

function App() {
  const [selectedEntity, setSelectedEntity] = useState();
  return (
    <div className="App">
      <Header data={data} setSelectedEntity={setSelectedEntity} />
      {selectedEntity && <InsightsArea selectedEntity={selectedEntity}/>}
    </div>
  );
}

export default App;
