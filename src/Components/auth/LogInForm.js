import React, { Component } from 'react';
import {login} from "../../utils/auth";
import { fas, faKey, faUser, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LogInForm extends Component {
    constructor(props) {
        debugger
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);        
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

    handleLogin(e){
        debugger
        e.preventDefault();
        login(this.state.user)
        .then(()=> {
            this.setState({
                error: null
            }, ()=> {
                this.props.history.push("/dashboard")
            })
        })
        .catch((error)=> {
            this.setState({error: error.response && error.response.data})
        })
    }


    
    render() {
        return (
            <div className="px-3">
                <h1 className="has-text-centered py-6">
                    <FontAwesomeIcon icon={fas, faUser} size="4x" />
                </h1>
                <form onSubmit={this.handleLogin}>
                    <div className="field py-2">
                        <label className="label">Email</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input" type="email" name="email" placeholder="Email" onChange={this.handleInputChange} />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={fas, faEnvelope} />
                                </span>
                            </div>
                    </div>
                    <div className="field py-2">
                        <label className="label">Password</label>
                        <div className="control has-icons-left has-icons-right">
                            <input className="input" name="password" type="password" placeholder="Password" onChange={this.handleInputChange}/>
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={fas, faKey} />
                            </span>
                        </div>
                    </div>              
                    <div className="field py-3">
                        <div className="control">
                            <button type="submit" className="button is-primary is-medium is-fullwidth">Login</button>
                        </div>
                    </div>             
                </form>
            </div>
        );
    }
}

export default LogInForm;