import React, { Component } from 'react';
import ListItem from './ListItem';

class RentedBooks extends Component {
    constructor(props) {
        debugger
        super(props);        
    }
    
    render() {
        return (
            <div className="column is-6 px-3">
                {
                    this.props.rentedBookList.length > 0 ? 
                    this.props.rentedBookList.map((book,index)=>(
                        <ListItem 
                            key={index.toString()} 
                            authors={book.bookId.authors} 
                            title={book.bookId.title} 
                            imageUrl={book.bookId.imageLinks.smallThumbnail === undefined ? "./book.png" : book.bookId.imageLinks.smallThumbnail}
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

export default RentedBooks;