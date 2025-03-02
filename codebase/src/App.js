import { useState } from 'react';
import data from "./assets/investors.json"
import Header from './components/Header';
import InsightsArea from './components/InsightsArea/InsightsArea';
import './App.css';
import NoSelection from './components/InsightsArea/components/NoSelection';

function App() {
  const [selectedEntity, setSelectedEntity] = useState();
  return (
    <div className="App">
      <Header data={data} setSelectedEntity={setSelectedEntity} />
      {selectedEntity ? 
        <InsightsArea selectedEntity={selectedEntity}/>
        :
        <NoSelection/>
      }
    </div>
  );
}

export default App;
