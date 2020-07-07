import React, { Component } from 'react';
import RequestCard from '../../Components/Notification/RequestCard';
import {getFormattedDate} from '../../utils/helper';

class SentRequests extends Component {
    constructor(props) {
        debugger
        super(props);        
    }
    render() {
        return (
            <div className="column is-6">
            {
                this.props.sentRequestsList.length > 0 ? 
                this.props.sentRequestsList.map((request,index)=>(
                    <RequestCard
                            key={index.toString()}
                            imageUrl = {request.bookId.imageLinks.smallThumbnail !== null ? request.bookId.imageLinks.smallThumbnail : './book.png'}
                            title={request.bookId.title}
                            authors={request.bookId.authors}
                            email={request.requestedTo}
                            status={request.status}
                            fromDate={getFormattedDate(request.fromDate)}
                            toDate={getFormattedDate(request.toDate)}
                            requestId={request._id}
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

export default SentRequests;