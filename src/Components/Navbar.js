import React from 'react';
import {getUser} from '../utils/auth'
import { fas, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar(props) {
  let user = getUser();

  return (
      
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="#"><img src="./logo.png"/></a>
                <a role="button" className="navbar-burger burger">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            {
                user ? 
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" href="#">Dashboard</a>
                        <a className="navbar-item" href="#">Books</a>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                        <div className="field">
                            <input id="switchExample" type="checkbox" name="switchExample" className="switch" checked="checked"/>
                            <label for="switchExample">Seller</label>
                        </div>
                        </div>
                        <div className="navbar-item">
                            <div className="buttons">
                                <span className="icon"><FontAwesomeIcon icon={fas, faSignOutAlt}/></span>
                                <a className="button is-primary" href="/logout"><strong>Logout</strong></a>
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

export default Navbar;

