import React, { Component } from 'react';
import {signup} from "../../utils/auth";
import { fas, faEnvelope, faUser, faKey, faUserPlus, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Signup extends Component {
    constructor(props) {
        debugger
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSignupClick = this.handleSignupClick.bind(this);        
    }

    state={
        user:{},
        error:null
    }

    handleInputChange(e){
        let userCopy = {...this.state.user};
        userCopy[e.target.name] =  e.target.value;
        
        this.setState({
            user: userCopy
        })
        console.log(this.state.user);
    }

    handleSignupClick(e){
        debugger
        e.preventDefault();
        signup(this.state.user)
        .then((response)=> {
            this.setState({
                error: null
            }, ()=> {
                
                //this.props.history.push("/login")
            })
        })
        .catch((error)=> {
            debugger
            this.setState({error: error.response && error.response.data})
        })
    }


    
    render() {
        return (
            <div>
                <h1 className="has-text-centered">
                    <FontAwesomeIcon icon={fas, faUserPlus} size="4x" />
                </h1>
                <form onSubmit={this.handleSignupClick}>
                <div className="field py-1">
                    <label className="label">Firstname</label>
                    <div className="control has-icons-left has-icons-right">
                        <input  required="true" className="input" type="text" name="firstname" placeholder="Firstname" onChange={this.handleInputChange}/>
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={fas, faUser} />
                        </span>
                    </div>
                </div>
                <div className="field py-1">
                    <label className="label">Lastname</label>
                    <div className="control has-icons-left has-icons-right">
                        <input  required="true" className="input" name="lastname" type="text" placeholder="Lastname" onChange={this.handleInputChange}/>
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={fas, faUser} />
                        </span>
                    </div>
                </div>
                <div className="field py-1">
                    <label className="label">Email</label>
                    <div className="control has-icons-left has-icons-right">
                        <input  required="true" className="input" type="email" name="email" placeholder="Email" onChange={this.handleInputChange} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={fas, faEnvelope} />
                        </span>
                    </div>
                </div>
                <div className="field py-1">
                    <label className="label">Password</label>
                    <div className="control has-icons-left has-icons-right">
                        <input required="true" className="input" name="password" type="password" placeholder="Password" onChange={this.handleInputChange}/>
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={fas, faKey} />
                        </span>
                    </div>
                </div>
                <div className="field py-1">
                    <label className="label">Password</label>
                    <div className="control has-icons-left has-icons-right">
                        <input required="true" className="input" name="postalCode" type="text" placeholder="Postal code" onChange={this.handleInputChange}/>
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={fas, faMapMarkerAlt} />
                        </span>
                    </div>
                </div>
                <div className="field py-1">
                    <div className="control">
                        <button type="submit" className="button is-primary is-medium is-fullwidth">Sign Up</button>
                    </div>
                </div>
                {   this.state.error && <p className="help is-danger">{this.state.error}</p> }
                </form>
                <hr/>
                <p className="has-text-centered pb-3">Already have an account? <a href="/login">Login here</a></p>
                </div>
        );
    }
}

export default Signup;