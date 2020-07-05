import React, { Component } from 'react';
import axios from "axios";
import DefaultLayout from "../Layout/Default";
import {getFormattedDate} from '../utils/helper';
import RequestCard from '../Components/Request/RequestCard';


class Notification extends Component {
    constructor(props) {
        super(props);    
    }

    state={
        requests:[],
        error:null
    }

    componentDidMount(){
        debugger
        axios.get(process.env.REACT_APP_BASE_URL + 'request/all', {withCredentials:true})
        .then((response=>{
            this.setState({
                requests:response.data.requests
            })
        }))
        .catch((error)=>{
            this.setState({
                error:error
            });
        })
    }


    render() {
        return (
            <DefaultLayout>
             <div>
            {                
                this.state.requests.length > 0 ? 
                this.state.requests.map((request,index)=>(
                        <RequestCard
                            key={index.toString()}
                            title={request.bookId.title}
                            authors={request.bookId.authors}
                            requestedFromFirstName={request.requestedFrom.firstname}
                            requestedFromLastName={request.requestedFrom.lastname}
                            requestedFromEmail={request.requestedFrom.email}
                            status={request.status}
                            fromDate={getFormattedDate(request.fromDate)}
                            toDate={getFormattedDate(request.toDate)}
                            requestId={request._id}
                        />
                ))
                : <h1>Loading...</h1>
                
            }                   
            </div>
            </DefaultLayout>           
        );
            
    }
}

export default Notification;