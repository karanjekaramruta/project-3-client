import React, { Component } from 'react';
import axios from 'axios';
import { fas, faEnvelope, faUser, faCalendar} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './RequestCard.css';

class RequestCard extends Component {

    constructor(props) {
        super(props); 
        this.acceptRequest = this.acceptRequest.bind(this);
        this.rejectRequest = this.rejectRequest.bind(this); 
    }

    state={
        successMessage:"",
        showRejectButton:true,
        showAcceptButton:true
    }

    
    
    acceptRequest(){
        axios.post(process.env.REACT_APP_BASE_URL+ `request/accept?requestId=${this.props.requestId}`, {status:"Accepted"}, {withCredentials:true}, { contentType: 'application/json' })
            .then((response=>{
                this.setState({
                    successMessage:response.data.successMessage,
                    showAcceptButton:!this.state.showAcceptButton,
                })
            }))
            .catch((error)=>{
                debugger
                this.setState({
                    error:error
                });
        })
    }

    rejectRequest(){
        axios.post(process.env.REACT_APP_BASE_URL+`request/reject?requestId=${this.props.requestId}`, {status:"Rejected"}, {withCredentials:true}, { contentType: 'application/json' })
            .then((response=>{
                this.setState({
                    successMessage:response.data.successMessage,
                    showRejectButton:!this.state.showRejectButton
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
        <div className="column">
            <div className={"card " + this.state.classNameForCard}>
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img src={this.props.imageUrl} alt={this.props.title}/>
                            </figure>
                        </div>
                        <div className="media-right">
                            <h2>{this.props.title}</h2>
                            {
                                this.props.authors.map((author)=>(
                                    <h3>{author}</h3>
                                ))
                            }
                            
                        </div>
                    </div>
                    <div>
                    {
                        (this.props.firstname || this.props.lastname) &&
                        <p>
                            <span className="icon is-small is-left mr-2">
                                <FontAwesomeIcon icon={(fas , faUser)} />
                            </span>{this.props.firstname} {this.props.lastname}
                        </p>
                    }

                        <p>
                            <span className="icon is-small is-left mr-2">
                                <FontAwesomeIcon icon={(fas, faEnvelope)} />
                            </span>
                            {this.props.email}
                        </p>
                        <p> 
                            <span className="icon is-small is-left mr-2">
                                <FontAwesomeIcon icon={(fas, faCalendar)} />
                            </span>
                            {this.props.fromDate} to {this.props.toDate}
                        </p>
                        {
                            this.state.successMessage && <p>{this.state.successMessage}</p>
                        }
                    </div>   
                </div>
                {this.hideButtons && 
                <div className="card-footer">
                     {
                         this.state.showAcceptButton && 
                            <button onClick={this.acceptRequest} className= {"button is-primary is-small mr-2"}>
                                Accept
                            </button>}
                     {
                         this.state.showRejectButton && 
                            <button onClick={this.rejectRequest} className= {"button is-danger is-small mr-2"}>
                                Reject
                            </button> }
                </div>
                }
            </div>
        </div>
        );
    }
}

export default RequestCard;