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
          isOpen={this.state.showModal}
          onRequestClose={this.hideModal}
          style={{
            overlay: {
                position: 'fixed',
                top: 0,
                left: 50,
                right: 0,
                bottom: 40,
                backgroundColor: 'rgba(255, 255, 255, 0.75)'
            },
            content: {
                position: 'absolute',
                top: '150px',
                left: '180px',
                right: '250px',
                bottom: '120px',
                border: '1px solid #ccc',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
                padding: '2px'
            }
        }}
        >
          <h1 className="subtitle ml-5 py-2">Request A Book for Rent</h1>
            <div class="field is-horizontal">
                <div className="field-label is-normal">
                        <label className="label" htmlFor="">From</label>
                </div>            
                <div class="field-body">
                    <div className="field">
                        <div className="control">
                            <DatePicker
                                selected={this.state.selectedFromDate}
                                onChange={(date) => this.setState({ selectedFromDate: date })}
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                            />
                        </div>                       
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label" htmlFor="">To</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <DatePicker
                                selected={this.state.selectedToDate}
                                onChange={(date) => this.setState({ selectedToDate: date })}
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label" htmlFor="">Comments</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                        <textarea
                            name="comments"
                            rows="5"
                            cols="20"
                            onChange={this.handleInputChange}
                            className="textarea is-info"
                        ></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label"></div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <button onClick={this.sendRequest} className="button is-primary mr-2">Send Request</button>
                            <button onClick={this.hideModal} className="button is-primary">Close</button>
                        </div>
                    </div>
                </div>
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
                    <img src={this.props.book.imageLinks.smallThumbnail} alt="book-img"/>
                  ) : (
                    <img src="../book.png" alt="book-img" />
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
