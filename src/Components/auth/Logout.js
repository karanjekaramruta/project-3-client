import React, { Component } from 'react';
import {logout} from "../../utils/auth";
import DefaultLayout from "../../Layout/Default";

class Logout extends Component {

    componentDidMount(){
        debugger
        logout()
            .then(()=>{
                this.props.history.push("/");
            })
            .catch(err=>{
                console.log(err);
            })
    }
    render() {
        return (
            <DefaultLayout>
                <h1>Logging out...</h1>
            </DefaultLayout>
        );
    }
}

export default Logout;