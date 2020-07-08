import React, { Component } from 'react';
import './BookCard.css';
import { fas, faPlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";

const axios = Axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, //'http://localhost:3000/',
    withCredentials: true, // this prevents cors errors, they also could have called it 'withCors'
    headers: { 'content-type': 'application/json' }
});


class BookCard extends Component {
    constructor(props) {
        debugger
        super(props);
        this.viewDetailsHandler = this.viewDetailsHandler.bind(this);
        this.addToListHandler = this.addToListHandler.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.handleQtyChange = this.handleQtyChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
    }

    state={
        showForm:false,
        qty:0,
        price:0,
        successMessage:""
    }

    viewDetailsHandler(){

    }

    toggleForm(){
        this.setState({
            showForm:!this.state.showForm
        })
    }

    handleQtyChange(e){        
        this.setState({
            qty: e.target.value,
        })
    }

    handlePriceChange(e){
        this.setState({
            price:e.target.value
        })
    }

    addToListHandler(){
        
        let book = {
            book:this.props.book,
            qty:this.state.qty,
            price:this.state.price
        };

        axios.post(process.env.REACT_APP_BASE_URL + 'book/add', book, {withCredentials:true})
            .then((response=>{
                this.toggleForm();
                this.setState({
                    successMessage:"Added!"
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
                                    <img src={this.props.book.volumeInfo.imageLinks.smallThumbnail} alt="book-img"/> :
                                    <img src="./images/book.png" alt="book-img" />
                                } 
                            </figure>
                        </div>
                        <div>
                            {
                                
                                this.props.book.volumeInfo.authors.map((author,index)=>(
                                    <p key={index.toString()}>{author}</p> 
                                ))
                            }
                            {
                                this.state.showForm && 
                                <form>
                                    <div className="level py-4">
                                        <label className="label is-small">Qty</label>
                                        <p className="control formControl">
                                            <input  required="true" className="input" name="qty" type="text" onChange={this.handleQtyChange}/>
                                        </p>
                                        <label className="label is-small">Price($)</label>
                                        <p className="control formControl">
                                            <input  required="true" className="input" name="price" type="text" onChange={this.handlePriceChange}/>
                                        </p>
                                        <a  href="#" onClick={this.addToListHandler}>
                                            <span className="icon"><FontAwesomeIcon icon={(fas, faPlus)} /></span>
                                        </a>
                                    </div>
                                </form>
                            }

                            {
                                this.state.successMessage && <p className="has-text-success">{this.state.successMessage}</p>
                            }
      
                        </div>                  
                    </div>


                </div>
                <div className="card-footer">
                    {/* <button onClick={()=> {this.props.addToListHandler(this.props.book)}} className="button is-primary is-small mr-2">Add to List</button> */}
                    <button onClick={this.toggleForm} className="button is-primary is-small mr-2">Add to List</button>
                    <button  onClick={this.viewDetailsHandler} className="button is-primary is-small mr-2">Details</button>
                </div>
            </div>
        </div>
        );
    }
}

export default BookCard;