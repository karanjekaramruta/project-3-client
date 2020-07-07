import React, { Component } from "react";
import { signup } from "../../utils/auth";
import { Link } from 'react-router-dom';
import {
  fas,
  faEnvelope,
  faUser,
  faKey,
  faUserPlus,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
  }

  state = {
    user: {},
    error: null,
    successMessage:null
  };

  handleInputChange(e) {
    let userCopy = { ...this.state.user };
    userCopy[e.target.name] = e.target.value;
    this.setState({
      user: userCopy,
    });
  }

  handleSignupClick(e) {
    e.preventDefault();
    signup(this.state.user)
      .then((response) => {
        this.setState(
          {
            error: null,
          },
          () => {
            this.setState({
              successMessage:"Signed Up succcessfully."
            })
          }
        );
      })
      .catch((error) => {
        this.setState({error: error.response && error.response.data})
      });
  }

  render() {
    return (
      <div>
        <h1 className="has-text-centered">
          <FontAwesomeIcon icon={(fas, faUserPlus)} size="4x" />
        </h1>
        <form onSubmit={this.handleSignupClick}>
          <div className="field py-1">
            <label className="label">Firstname</label>
            <div className="control has-icons-left has-icons-right">
              <input
                required="true"
                className="input"
                type="text"
                name="firstname"
                placeholder="Firstname"
                onChange={this.handleInputChange}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={(fas, faUser)} />
              </span>
            </div>
          </div>
          <div className="field py-1">
            <label className="label">Lastname</label>
            <div className="control has-icons-left has-icons-right">
              <input
                required="true"
                className="input"
                name="lastname"
                type="text"
                placeholder="Lastname"
                onChange={this.handleInputChange}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={(fas, faUser)} />
              </span>
            </div>
          </div>
          <div className="field py-1">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                required="true"
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleInputChange}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={(fas, faEnvelope)} />
              </span>
            </div>
          </div>
          <div className="field py-1">
            <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
              <input
                required="true"
                className="input"
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.handleInputChange}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={(fas, faKey)} />
              </span>
            </div>
          </div>
          <div className="field py-1">
            <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
              <input
                required="true"
                className="input"
                name="postalCode"
                type="text"
                placeholder="Postal code"
                onChange={this.handleInputChange}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={(fas, faMapMarkerAlt)} />
              </span>
            </div>
          </div>
          <div className="field py-1">
            <div className="control">
              <button
                type="submit"
                className="button is-primary is-medium is-fullwidth"
              >
                Sign Up
              </button>
            </div>
          </div>
          {this.state.error && (
            <p className="help is-size-6 is-danger has-text-centered"><b>{this.state.error.errorMessage}</b></p>
          )}
          {this.state.successMessage && (
            <p className="help is-size-6 is-success has-text-centered"><b>{this.state.successMessage}</b></p>
          )}
        </form>
        <hr />
        <p className="has-text-centered">
          Already have an account? 
          <Link to={`/login`}>Login here</Link>
        </p>
      </div>
    );
  }
}

export default Signup;
