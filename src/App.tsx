import React from 'react';
import ShipmentProducts from './ShipmentProducts/ShipmentProducts';
import './App.css';

const App: React.FC = () => {
  // TODO: implement react routing system
  return (
    <div className="App">
      <header className="App-header">
        <ShipmentProducts/>
      </header>
    </div>
  );
}

export default App;
