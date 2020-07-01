import React, { Component } from 'react';
import {getUser} from "../../utils/auth";
import './BookCard.css';
import axios from 'axios';



class BookCard extends Component {
    constructor(props) {
        debugger
        super(props);
        this.viewDetailsHandler = this.viewDetailsHandler.bind(this);
        this.addToListHandler = this.addToListHandler.bind(this);
    }

    user = getUser();




    viewDetailsHandler(){

    }

    addToListHandler(){
        
        debugger
        let book = this.props.book;
        const url = "http://localhost:3000/book/add"
        
        axios.post(url, book)
        .then((response=>{
            debugger
            console.log(response);
        }))
        .catch((error)=>{
            debugger
            this.setState({
                error:error.response.data.message
            });
        })
        
    }

    
    
    render() {
        return (
        <div className="column is-3">
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        {this.props.book.volumeInfo.title}
                    </p>
                </header>
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                {
                                    this.props.book.volumeInfo.imageLinks.smallThumbnail ? 
                                    <img src={this.props.book.volumeInfo.imageLinks.smallThumbnail} /> :
                                    <img src="./images/book.png" />
                                } 
                            </figure>
                        </div>
                    {
                        this.props.book.volumeInfo.authors.map((author,index)=>(
                            <p key={index.toString()}>{author}</p> 
                        ))
                    }                   
                    </div>
                </div>
                <div className="card-footer">
                    {/* <button onClick={()=> {this.props.addToListHandler(this.props.book)}} className="button is-primary is-small mr-2">Add to List</button> */}
                    <button onClick={this.addToListHandler} className="button is-primary is-small mr-2">Add to List</button>
                    <button  onClick={this.viewDetailsHandler} className="button is-primary is-small mr-2">Details</button>
                </div>
            </div>
        </div>
        );
    }
}

export default BookCard;