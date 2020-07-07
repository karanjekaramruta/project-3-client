import React from 'react';
import './App.css';
import SignUp from './Components/auth/SignUp';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Books from './Pages/Books';
import Logout from './Components/auth/Logout';
import BorrowerBooks from './Pages/BorrowerBooks';
import Notification from './Pages/Notification';
import RequestDetail from './Pages/RequestDetail';
import { Route } from 'react-router-dom';
import ProtectRoute from './Components/Common/ProtectRoute';


function App() {
  return (
    <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component ={Login} />
        <ProtectRoute exact path="/dashboard" redirectTo="/" component ={Dashboard} />
        <ProtectRoute exact path="/books" redirectTo="/" component ={Books} />
        <ProtectRoute exact path="/borrower/books" redirectTo="/" component ={BorrowerBooks} />
        <ProtectRoute exact path="/logout" redirectTo="/" component={Logout} />
        <ProtectRoute exact path="/notification" redirectTo="/" component={Notification} />
        <ProtectRoute exact path="/request/detail" redirectTo="/" component={RequestDetail} />
    </div>
  );
}

export default App;
