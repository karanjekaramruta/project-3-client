import React, { Component } from 'react';
import ListItem from './ListItem';

class OwnedBooks extends Component {
    constructor(props) {
        super(props);      
    }

    render() {
        return (
            <div className="column is-6 px-5">
                {
                    this.props.ownedBookList.length > 0 ? 
                    this.props.ownedBookList.map((book,index)=>(
                        <ListItem 
                            key={index.toString()} 
                            authors={book.authors} 
                            title={book.title} 
                            imageUrl={book.imageLinks.smallThumbnail === undefined ? "./book.png" : book.imageLinks.smallThumbnail}
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

export default OwnedBooks;