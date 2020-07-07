import React, { Component } from 'react';
import RequestCard from '../../Components/Notification/RequestCard';
import {getFormattedDate} from '../../utils/helper';

class ReceivedRequests extends Component {
    constructor(props) {
        super(props);        
    }
    
    render() {        
        return (
        <div className="column is-6">
            {
                this.props.receivedRequestsList.length > 0 ? 
                this.props.receivedRequestsList.map((request,index)=>(
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
    }
    return className;
}

function getClassNameForButton(status){
    let className = "";
    return status.toLowerCase() === 'accepted' || 'rejected' ? className = "hideButton" : ""

}