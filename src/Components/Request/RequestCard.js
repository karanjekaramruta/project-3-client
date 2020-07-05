import React, { Component } from 'react';
import axios from 'axios';

class RequestCard extends Component {

    constructor(props) {
        super(props); 
        this.acceptRequest = this.acceptRequest.bind(this);       
    }

    state={
        successMessage:""
    }


    acceptRequest(requestId){
        debugger
        
        const url = `http://localhost:3000/request/accept?requestId=${requestId}`
        axios.post(url, {status:"Accepted"}, {withCredentials:true}, { contentType: 'application/json' })
            .then((response=>{
                this.setState({
                    successMessage:response.successMessage
                })
            }))
            .catch((error)=>{
                debugger
                this.setState({
                    error:error
                });
        })
    }
    
    render() {
        return (
        <div>
            <div>
                <h2>{this.props.title}</h2>
                {
                    this.props.authors.map((author)=>(
                        <p>{author}</p>
                    ))
                }
                <p><em>Requested By</em>{this.props.requestedFromFirstName} {this.props.requestedFromLastName}</p>
                <p><em>Email</em>{this.props.requestedFromEmail}</p>
                <p><em>Status</em>{this.props.requestStatus}</p>
                <p><em>FromDate</em>{this.props.fromDate}</p>
                <p><em>ToDate</em>{this.props.toDate}</p>
                {
                    this.state.successMessage && <p>{this.state.successMessage}</p>
                }   
            </div>
            <div>
                <button onClick={this.acceptRequest(this.props.requestId)}>Accept</button>
                <button onClick={this.rejectRequest}>Reject</button>
            </div>
        </div>
        );
    }
}

export default RequestCard;