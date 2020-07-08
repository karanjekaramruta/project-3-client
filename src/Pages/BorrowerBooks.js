import React, { Component } from 'react';
import axios from "axios";
import BookCardBorrower from '../Components/Books/BookCardBorrower';
import DefaultLayout from "../Layout/Default";
import {getUser} from '../utils/auth';


class BorrowerBooks extends Component {

    state={
        listOfAvailableBooks:[],
        error:null
    }

    user = getUser();

    componentDidMount(){
        debugger
        axios.get(process.env.REACT_APP_BASE_URL + 'book/allOwnedBooks', {withCredentials:true})
        .then((response=>{
            let list = [];
            
            response.data.map((res)=>{
                return list.push(res);              
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


    render() {
        return (
            <DefaultLayout>
            <div>
            <section className="container py-5">
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