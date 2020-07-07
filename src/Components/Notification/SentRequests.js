import React, { Component } from 'react';
import RequestCard from '../../Components/Notification/RequestCard';
import {getFormattedDate} from '../../utils/helper';
import { Link } from 'react-router-dom';

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
                            email={request.requestedTo}
                            status={request.status}
                            fromDate={getFormattedDate(request.fromDate)}
                            toDate={getFormattedDate(request.toDate)}
                            requestId={request._id}
                            hideButtons={true}
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

export default SentRequests;