import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Nav from './layout/Nav';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className = "container">
            <Nav />
            <Route exact path = "/" component = {Home} />


          </div>
        </Router>
      </div>
    );
  }
}

export default App;
