import React, { Component } from 'react';
import Flowers from './components/Flowers';
import AddSighting from './components/AddSighting';
import EditFlower from './components/EditFlower';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import { Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {

  render() {
    const App = () => (
      <div>
        <NavBar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/flowers">
            <Flowers/>
          </Route>
          <Route path="/add">
            <AddSighting/>
          </Route>
          <Route path="/edit">
            <EditFlower/>
          </Route>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }

}

export default App;

