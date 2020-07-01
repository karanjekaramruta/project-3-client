import React, { Component } from 'react';
import axios from 'axios';

class TestComponent extends Component {
    constructor(props) {
        super(props);       
    }

    state={
        message:null
    }

    componentDidMount(){
        debugger
        axios.get(`http://localhost:3000`)
             .then(response =>{
                this.setState({
                    message:response.data.message
                })
            })
            .catch(error=>{
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                {this.state.message ? <h1>Hello {this.state.message}</h1> : <h1>Loading...</h1>}
            </div>
        );
    }
}

export default TestComponent;