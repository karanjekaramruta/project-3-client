import React, { Component } from "react";
import DefaultLayout from "../Layout/Default";
import OwnedBooks from "../Components/Dashboard/OwnedBooks";
import Heading from "../Components/Common/Heading";
import StatusBox from "../Components/Common/StatusBox";
import RentedBooks from "../Components/Dashboard/RentedBooks";
import axios from "axios";

class Dashboard extends Component {

  state = {
    ownedBookList: [],
    rentedBookList: [],
    countOwnedBooks: 0,
    countRentedBooks: 0,
    error: null,
  };

  componentDidMount() {
    let ownedBooks = axios.get(
      process.env.REACT_APP_BASE_URL + "book/ownedBooks",
      { withCredentials: true }
    );
    let rentedBooks = axios.get(
      process.env.REACT_APP_BASE_URL + "book/rentedBooks",
      { withCredentials: true }
    );

    axios
      .all([ownedBooks, rentedBooks])
      .then(
        axios.spread((ownedBooks, rentedBooks) => {
          this.setState({
            ownedBookList: ownedBooks.data.listOfOwnedBooks,
            rentedBookList: rentedBooks.data,
          });
        })
      )
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  }

  render() {
    return (
      <DefaultLayout>
        <div className="section">
          <div className="columns">
            <main className="column">
              <Heading heading="Dashboard" />
              <hr />
              <div className="columns is-multiline">
                <StatusBox
                  status="Books I Own"
                  qty={this.state.ownedBookList.length}
                  nameOfClass={"owned"}
                />
                <StatusBox
                  status="Books rented"
                  qty={this.state.rentedBookList.length}
                  nameOfClass={"rented"}
                />
              </div>
              <div className="columns is-multiline">
                {this.state.ownedBookList.length > 0 ? (
                  <OwnedBooks ownedBookList={this.state.ownedBookList} />
                ) : (
                  <div className="column is-6"><h2 className="subtitle px-5 py-2">You have not listed any books yet!</h2></div>
                )}
                {this.state.rentedBookList.length > 0 ? (
                  <RentedBooks rentedBookList={this.state.rentedBookList} />
                ) : (
                  <div className="column is-6"><h2 className="subtitle px-5 py-2">No Books Rented</h2></div>
                )}
              </div>
            </main>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

export default Dashboard;
