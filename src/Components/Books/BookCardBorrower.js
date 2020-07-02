import React, { Component } from 'react';
import './BookCard.css';


class BookCardBorrower extends Component {
    constructor(props) {
        debugger
        super(props);
    }

    render() {
        return (
        <div className="column is-3">
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        {this.props.book.title}
                    </p>
                </header>
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                {
                                    this.props.book.imageLinks.smallThumbnail ? 
                                    <img src={this.props.book.imageLinks.smallThumbnail} /> :
                                    <img src="./images/book.png" />
                                } 
                            </figure>
                        </div>
                        <div>
                            {                                
                                this.props.book.authors.map((author,index)=>(
                                    <p key={index.toString()}>{author}</p> 
                                ))
                            }      
                        </div>                  
                    </div>
                </div>
                <div className="card-footer">
                    <button onClick={this.toggleForm} className="button is-primary is-small mr-2">Request</button>
                    <button  onClick={this.viewDetailsHandler} className="button is-primary is-small mr-2">Details</button>
                </div>
            </div>
        </div>
        );
    }
}

export default BookCardBorrower;