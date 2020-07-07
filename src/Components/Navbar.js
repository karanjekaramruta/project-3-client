import React, { Component } from 'react';
import {getUser} from '../utils/auth'
import { fas, faSignOutAlt,faBell, faUser} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

class Navbar extends Component {

constructor(props) {
    super(props);
    
}

  user = getUser();

  render(){
    return (
      
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="#"><img src="./navbarlogo.png"/></a>
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
                        <a className="navbar-item" href="/dashboard">Dashboard</a>
                        <a className="navbar-item" href="/books">Search Book</a>
                        <a className="navbar-item" href="/borrower/books">Books available for Rent</a>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <Link to={"/notification"}>
                                <span className="icon"><FontAwesomeIcon icon={fas, faBell} size="lg"/></span>
                            </Link>
                        </div>
                        <div className="navbar-item">
                            <a href="/userProfile" className="mr-2">
                                <span className="icon"><FontAwesomeIcon icon={fas, faUser} size="lg"/></span>
                            </a>
                            {this.user.firstname}
                        </div>
                        <div className="navbar-item mb-2">
                            <div className="buttons">
                                <span className="icon"><FontAwesomeIcon icon={fas, faSignOutAlt} /></span>                               
                                <a href="/logout"><strong>Logout</strong></a>                                
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

