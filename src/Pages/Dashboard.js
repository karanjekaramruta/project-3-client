import React, { Component } from 'react';
import DefaultLayout from "../Layout/Default";
import OwnedBooks from "../Components/Dashboard/OwnedBooks";
import Heading from "../Components/Common/Heading";
import StatusBox from "../Components/Common/StatusBox";
import RentedBooks from "../Components/Dashboard/RentedBooks";
import axios from "axios";

class Dashboard extends Component {
    constructor(props) {
        debugger
        super(props);       
    }

    state={
        ownedBookList:[],
        count:0,
        error:null
    }

    componentDidMount(){
        debugger
        axios.get(process.env.REACT_APP_BASE_URL + 'book/ownedBooks', {withCredentials:true})
        .then((response=>{
            debugger
            this.setState({
                ownedBookList:response.data.listOfOwnedBooks,
                count:response.data.listOfOwnedBooks.length
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
            <div className="section">
                <div className="columns">
                    <main className="column">
                        <Heading heading="Dashboard" />
                        <hr/>
                        <div className="columns is-multiline">
                            <StatusBox status="Books I Own" qty={this.state.count}/>
                            <StatusBox status="Books rented" qty={5}/>
                        </div>
                        <div className="columns is-multiline">
                        {
                            this.state.ownedBookList.length > 0 ? 
                                <OwnedBooks ownedBookList={this.state.ownedBookList}/>
                            :
                            <h2>Loading...</h2>
                        }
                        <RentedBooks />
                        </div>
                    </main>
                </div>
               
            </div>
            </DefaultLayout>
        );
    }
}

export default Dashboard;