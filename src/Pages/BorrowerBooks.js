import React, { Component } from 'react';
import axios from "axios";
import BookCardBorrower from '../Components/Books/BookCardBorrower';
import DefaultLayout from "../Layout/Default";


class BorrowerBooks extends Component {
    constructor(props) {
        super(props);
    }

    state={
        listOfAvailableBooks:[],
        error:null
    }

    componentDidMount(){
        axios.get(process.env.REACT_APP_BASE_URL + 'book/allOwnedBooks', {withCredentials:true})
        .then((response=>{
            let list = [];
            response.data.map((res)=>{
                res.map((book)=>{
                    list.push(book)
                })
            })
            this.setState({
                listOfAvailableBooks:list,
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
            <DefaultLayout>
            <div>
            <section className="container">
                <div className="hero-body">                   
                    <div className="column is-12">
                        <h1 className="title">Search Books</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="field is-grouped">
                                    <p className="control is-expanded">
                                        <input className="input" type="text" name="search" placeholder="search" onChange={this.handleInputChange} />
                                    </p>
                                    <button type="submit" className="button is-primary">Search</button>
                            </div>              
                        </form>
                    </div>
                </div>
            </section>
            <section className="container">
            <div className="columns is-multiline">
            {
                this.state.listOfAvailableBooks.length > 0 ? 
                this.state.listOfAvailableBooks.map((book,index)=>(
                    <BookCardBorrower key={book.id} book={book} />                    
                ))
                : <h1>Loading...</h1>
            }
            </div>
            </section>
            </div>
            </DefaultLayout>
        );
    }
}

export default BorrowerBooks;