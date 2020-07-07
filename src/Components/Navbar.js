import React, { Component } from 'react';
import {getUser} from '../utils/auth'
import { fas, faSignOutAlt,faBell, faUser, faBook} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {

constructor(props) {
    super(props);   
}

  user = getUser();

  render(){
    return (
      
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
            <span className="logo">
                <FontAwesomeIcon icon={(fas, faBook)} size="lg"/>
              </span>
                <a role="button" className="navbar-burger burger">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            {
                this.user ? 
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item link grow" to={"/dashboard"}>Dashboard</Link>
                        <Link className="navbar-item link grow" to={"/books"}>Search Book</Link>
                        <Link className="navbar-item link grow" to={"/borrower/books"}>Books available for Rent</Link>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <Link className="navbar-item link" to={"/notification"}>
                                <span className="icon"><FontAwesomeIcon icon={fas, faBell} size="lg"/><sup>3</sup></span>
                            </Link>
                        </div>
                        <div className="navbar-item">
                            <Link to={"/userProfile"} className="mr-2">
                                <span className="icon"><FontAwesomeIcon icon={fas, faUser} size="lg"/></span>
                            </Link>
                            {this.user.firstname}
                        </div>
                        <div className="navbar-item mb-2">
                            <div className="buttons">
                                <span className="icon"><FontAwesomeIcon icon={fas, faSignOutAlt} size="lg" /></span>                               
                                <Link className="navbar-item link grow" to={"/logout"}>Logout</Link>                                
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" href="#">Books</a>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary" href="#"><strong>Sign Up</strong></a>
                            </div>
                        </div>
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary" href="#"><strong>Login</strong></a>
                            </div>
                        </div>
                    </div>
                </div>               

            }

        </nav>
  );
  }


}

export default Navbar;

