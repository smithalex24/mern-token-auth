import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import Footer from './layout/Footer';
import Home from './Home';
import Login from './auth/Login';
import Nav from './layout/Nav';
import Profile from './Profile';
import Signup from './auth/Signup';

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: null
    }
  }

  componentDidMount = () => {
    console.log('component did mount!');
    this.getUser();
  }

  getUser = () => {
    console.log('get user');
    var token = localStorage.getItem('mernToken');
    if(token){
      console.log('token found in LS', token);
      // There is a token in local storage. Try to validate it 
      axios.post('/auth/me/from/token', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        console.log('SUCCESS', response);
        this.setState({
          user: response.data.user
        });
      })
      .catch(err => {
        console.log('ERROR', err);
        console.log('response', err.response);
        localStorage.removeItem('mernToken');
        this.setState({
          user: null
        });
      });
    }
    else {
      console.log('No token was found');
      localStorage.removeItem('mernToken');
        this.setState({
          user: null
        });
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div className = "container">
            <Nav user = {this.state.user} updateUser = {this.getUser} />
            <Route exact path = "/" component = {Home} />
            <Route path = "/login" component = {
              () => (<Login user={this.state.user} updateUser = {this.getUser} />)
            } />
            <Route path = "/signup" component = {
              () => (<Signup user={this.state.user} updateUser = {this.getUser} />)
            } />
            <Route path = "/profile" component = {
              () => (<Profile user={this.state.user} />)
            } />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
