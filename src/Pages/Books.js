import React, { Component } from 'react';
import axios from "axios";
import BookCard from '../Components/Books/BookCard';
import DefaultLayout from "../Layout/Default";

class Books extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getNextBooks =this.getNextBooks.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.addToListHandler = this.addToListHandler.bind(this);
    }

    state={
        book:"",
        results: [],
        error:null,
        page: 0,
        bookList:[]
    }

    handleSubmit(event){
        debugger
        event.preventDefault();
        this.setState({
            results: [],
            page: 0
        },()=> {
            this.getNextBooks();
        })

    }
    getNextBooks(){
        const maxResults = 10;
        const apiKey = process.env.REACT_APP_API_KEY
        const url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.book}&key=${apiKey}&startIndex=${this.state.page}&maxResults=${maxResults}`
        axios.get(url)
            .then(response=>{
                
                let resultsCopy = [...this.state.results];
                resultsCopy.push(...response.data.items);
                
                this.setState({
                    results:resultsCopy
                })
            })
            .catch(err=>{
                this.setState({
                    error:err
                })
            })
    }
    handleInputChange(event){
        
        const bookCopy = event.target.value;
        this.setState({
            book:bookCopy
        })
        console.log(bookCopy);
    }

    
    handleNext(){
        
        let pageCopy = this.state.page;
        pageCopy = pageCopy + 10;
        this.setState({
            page: pageCopy
        }, ()=>{
            this.getNextBooks();
        })
    }

    handlePrev(){
        let totalResults = this.state.results.length-10;
        let resultsCopy = [...this.state.results];
        
        this.setState({
            results:resultsCopy,
            page:this.state.page - 10
        })
    }

    addToListHandler(book){
        console.log(this.user);
        debugger
        let bookListCopy = [...this.state.bookList];
        bookListCopy.push(book);
        this.setState({
            bookList:bookListCopy
        })
        //console.log(bookListCopy.length);
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
                this.state.results.length > 0 && this.state.results.map((book,index)=>(
                    <BookCard key={book.id} book={book} />                    
                ))
            }
            {/* <BookCard key={book.id} book={book} addToListHandler={this.addToListHandler}/> */}
            </div>
            </section>
            {
                (this.state.results.length > 0) && <div className="buttons is-centered py-5">
                <button onClick={this.handlePrev} className="button is-primary mr-2">Prev</button>
                <button onClick={this.handleNext} className="button is-primary">Next</button>
            </div>
            }
            </div>
            </DefaultLayout>
        );
    }
}

export default Books;