import React from 'react';
import './App.css';
import ShipmentProducts from './ShipmentProducts/ShipmentProducts';

class App extends React.Component {
  render(){
    const countries =
    [
        "Afghanistan",
        "Åland Islands",
        "Albania",
        "Algeria"
    ];
    return (
      <div className="App">
        <header className="App-header">
         <ShipmentProducts content={countries}/>
        </header>
      </div>
    );
  }
  
}

export default App;
