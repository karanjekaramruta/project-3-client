import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from './Components/auth/SignUp';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Books from './Pages/Books';
import { Route } from 'react-router-dom';


function App() {
  return (
    <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component ={Login} />
        <Route exact path="/dashboard" component ={Dashboard} />
        <Route exact path="/books" component ={Books} />
    </div>
  );
}

export default App;
