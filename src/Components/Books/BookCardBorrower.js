import React, { Component } from "react";
import "./BookCard.css";
import { fas, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getUser } from "../../utils/auth";
import axios from "axios";

class BookCardBorrower extends Component {
  constructor(props) {
    debugger;
    super(props);
    this.displayaModal = this.displayaModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  user = getUser();

  state = {
    showModal: false,
    selectedFromDate: null,
    selectedToDate: null,
    comments: "",
    successMessage: "",
  };

  handleInputChange(e) {
    this.setState({
      comments: e.target.value,
    });
  }

  displayaModal() {
    this.setState({
      showModal: true,
    });
  }

  hideModal() {
    this.setState({
      showModal: false,
    });
  }

  sendRequest() {
    debugger;
    let request = {
      bookId: this.props.book._id,
      requestedTo: this.props.email,
      requestedFrom: this.user._id,
      fromDate: this.state.selectedFromDate,
      toDate: this.state.selectedToDate,
      status: "Pending",
      comments: this.state.comments,
    };

    axios
      .post(
        process.env.REACT_APP_BASE_URL + "request/add",
        request,
        { withCredentials: true },
        { contentType: "application/json" }
      )
      .then((response) => {
        this.setState({
          successMessage: "Request sent!",
        });
      })
      .catch((error) => {
        debugger;
        this.setState({
          error: error,
        });
      });
  }

  render() {
    return (
      <div className="column is-4">
        <Modal
          width={950}
          height={340}
          isOpen={this.state.showModal}
          onRequestClose={this.hideModal}
        >
          <h1>Request A Book for Rent</h1>
          <label className="label" htmlFor="">
            From
          </label>
          <DatePicker
            selected={this.state.selectedFromDate}
            onChange={(date) => this.setState({ selectedFromDate: date })}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
          <label htmlFor="">To</label>
          <DatePicker
            selected={this.state.selectedToDate}
            onChange={(date) => this.setState({ selectedToDate: date })}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
          <textarea
            name="comments"
            rows="5"
            onChange={this.handleInputChange}
          ></textarea>
          <div className="mt-2">
            <button
              onClick={this.sendRequest}
              className="button is-primary mr-2"
            >
              Send Request
            </button>
            <button onClick={this.hideModal} className="button is-primary">
              Close
            </button>
          </div>
          {this.state.successMessage && <p>{this.state.successMessage}</p>}
        </Modal>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">{this.props.book.title}</p>
          </header>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  {this.props.book.imageLinks.smallThumbnail ? (
                    <img src={this.props.book.imageLinks.smallThumbnail} />
                  ) : (
                    <img src="../book.png" />
                  )}
                </figure>
              </div>
              <div>
                {this.props.book.authors.map((author, index) => (
                  <p key={index.toString()}>{author}</p>
                ))}
                <p>
                  <span>
                    <small className="has-text-weight-bold px-1">Owner:</small>
                  </span>
                  {this.props.firstname} {this.props.lastname}
                </p>
                <p>
                  <span className="icon is-small is-left py-1">
                    <FontAwesomeIcon icon={(fas, faMapMarkerAlt)} />
                  </span>
                  {this.props.postalCode}
                </p>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button
              onClick={this.displayaModal}
              className="button is-primary is-small mr-2"
            >
              Request
            </button>
            <button
              onClick={this.viewDetailsHandler}
              className="button is-primary is-small mr-2"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default BookCardBorrower;
