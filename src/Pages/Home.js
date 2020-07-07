import React, { Component } from "react";
import Signup from "../Components/auth/SignUp";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="container is-fullheight mt-6 is-mobile">
        <div className="column"></div>
        <div className="columns is-multiline">
          <div className="column is-half has-text-centered">
            <div className="logo">
              <img src="./logo.gif" alt="logo" />
              <img className="steps" src="./homepage.png" alt="logo" />
            </div>
          </div>

          <div className="column is-4 is-offset-2 box">
            <Signup />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
