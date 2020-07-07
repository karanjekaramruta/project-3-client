import React, { Component } from 'react';
import axios from "axios";
import BookCardBorrower from '../Components/Books/BookCardBorrower';
import DefaultLayout from "../Layout/Default";
import {getUser} from '../utils/auth';


class BorrowerBooks extends Component {
    constructor(props) {
        super(props);
        this.setSearchTerm = this.setSearchTerm.bind(this);
    }

    state={
        listOfAvailableBooks:[],
        error:null,
        searchTerm: '',
        searchResults:[]
    }

    user = getUser();

    componentDidMount(){
        debugger
        axios.get(process.env.REACT_APP_BASE_URL + 'book/allOwnedBooks', {withCredentials:true})
        .then((response=>{
            let list = [];
            
            response.data.map((res)=>{
                list.push(res);              
            })

            this.setState({
                listOfAvailableBooks:list,
                searchResults:list
            })
        }))
        .catch((error)=>{
            debugger
            this.setState({
                error:error
            });
        })
    }

    setSearchTerm(e){
        this.setState({
            searchTerm: e.target.value,
        });
        this.handleSearch(e.target.value);
    }

    handleSearch(searchTerm){
        debugger
        let l = [];

        let listOfBooksModified = this.state.listOfAvailableBooks.map((item)=>{
            item.map(i=>
                i.book.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        })

        this.setState({
            searchResults: listOfBooksModified,
        });
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
                                        <input 
                                            className="input" 
                                            type="text" 
                                            name="search" 
                                            placeholder="search" 
                                            onChange={this.setSearchTerm} 
                                            value={this.state.searchTerm} 
                                            handleSearch={this.setSearchTerm}
                                        />
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
                    book.filter(b=>b.email !== this.user.email).map((innerBook)=>(
                        <BookCardBorrower 
                            key={innerBook.id} 
                            book={innerBook.book} 
                            firstname={innerBook.firstname}
                            lastname={innerBook.lastname}
                            postalCode = {innerBook.postalCode}
                            email={innerBook.email}
                            

                        />                        
                    ))
                    
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