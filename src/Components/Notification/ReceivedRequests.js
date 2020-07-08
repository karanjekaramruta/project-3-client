import React, { Component } from 'react';
import RequestCard from '../../Components/Notification/RequestCard';
import {getFormattedDate} from '../../utils/helper';
import { Link } from 'react-router-dom';

class ReceivedRequests extends Component {
    
    render() {        
        return (
        <div className="column is-6">
            {
                this.props.receivedRequestsList.length > 0 ? 
                this.props.receivedRequestsList.map((request,index)=>(
                    <Link 
                        to={{
                            pathname:"/request/detail",
                            search:`?requestId=${request._id}`,
                            state:{request:request}
                        }}
                    >
                    <RequestCard
                            key={index.toString()}
                            imageUrl = {request.bookId.imageLinks.smallThumbnail !== null ? request.bookId.imageLinks.smallThumbnail : './book.png'}
                            title={request.bookId.title}
                            authors={request.bookId.authors}
                            firstname={request.requestedFrom.firstname}
                            lastname={request.requestedFrom.lastname}
                            email={request.requestedFrom.email}
                            status={request.status}
                            fromDate={getFormattedDate(request.fromDate)}
                            toDate={getFormattedDate(request.toDate)}
                            requestId={request._id}
                            cardClass={getClassNameBasedOnStatus(request.status)}
                            classNameForButton={getClassNameForButton(request.status)}

                    />
                     </Link>
                ))
                 :
                <h2>Loading...</h2>
            }
            <hr/>
        </div>
        );
    }
}

export default ReceivedRequests;

function getClassNameBasedOnStatus(status){
    debugger
    let className = "";
    switch(status.toLowerCase()){
        case 'accepted':
            className = 'accepted'
            break;
        case 'pending' :
            className =  'pending'
            break;
        case 'rejected':
            className = 'rejected'
            break;
        default:
            className = "pending"
            break;
    }
    return className;
}

function getClassNameForButton(status){
    let className="";
    status.toLowerCase() === 'accepted' || 'rejected' ? className = "hideButton" : "";
    return className;

}