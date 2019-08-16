import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import ShipmentProducts from './ShipmentProducts/ShipmentProducts';
import ShipmentDetails from './ShipmentDetails/ShipmentDetails';
import './App.css';

const App: React.FC = () => {
  // TODO: implement react routing system
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <ul>
            <li className={'navigation'}>
              <Link className={'linkColor'} to="/">Home</Link>
            </li>
            <li className={'navigation'}>
              <Link className={'linkColor'} to="/shipments">Shipments</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path='/' component={RedirectTo('/shipments')} />
            <Route exact path='/shipments' component={ShipmentProducts} />
            <Route path='/shipments/:id/details' component={ShipmentDetails} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

function RedirectTo(pathname: string) {
  return () => (<Redirect to={{ pathname }} />);
}

export default App;
