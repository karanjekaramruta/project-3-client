import React, { Component } from "react";
import DefaultLayout from "../Layout/Default";
import {
  fas,
  faEnvelope,
  faUser,
  faCalendar,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFormattedDate } from "../utils/helper";
import axios from 'axios';
import {getUser} from "../utils/auth";

class RequestDetail extends Component {
  constructor(props) {
    debugger;
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  user = getUser();

  state = {
    request: this.props.location.state.request,
    comments:[],
    successMessage:"",
    message:""
  };

  handleInputChange(e){
    this.setState({
        message:e.target.value
    })
  }

  componentDidMount(){
    debugger
    axios.get(process.env.REACT_APP_BASE_URL + `comments/all?requestId=${this.state.request._id}`)
        .then(response=>{            
            this.setState({
                comments:response.data.comments
            })
        })
        .catch(err=>{
            this.setState({
                error:err
            })
        })
  }

  

  handleUpdate(){
    
    let commentsCopy = this.state.comments;
    let newComment = {
        username:this.user.firstname,
        message:this.state.message
    }
    commentsCopy.push(newComment);
    axios.post(process.env.REACT_APP_BASE_URL+`request/update?requestId=${this.state.request._id}`, {comments:commentsCopy}, {withCredentials:true}, { contentType: 'application/json' })
        .then((response=>{
            this.setState({
                comments:response.data.comments,
            })
        }))
        .catch((error)=>{
            this.setState({
                error:error
        });
    })
  }

  render() {
    if (this.state.request === null) {
      return <h2>LOading..</h2>;
    } else {
      return (
        <DefaultLayout>
          <div className="columns is-multiline py-4 px-5">
            <div className="column is-6 ml-5">
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <figure>
                        <img
                          src={this.state.request.bookId.imageLinks.thumbnail}
                          alt={this.state.request.bookId.title}
                        />
                      </figure>
                    </div>
                    <div className="media-right">
                      <h2 className="mb-2">
                        {this.state.request.bookId.title}
                      </h2>
                      {this.state.request.bookId.authors.map((author) => (
                        <h3>{author}</h3>
                      ))}
                    </div>
                  </div>
                  <div className="content">
                    <h4>Borrower details:</h4>
                    <p>
                      <span className="icon is-small is-left mr-2">
                        <FontAwesomeIcon icon={(fas, faUser)} />
                      </span>
                      {this.state.request.requestedFrom.firstname}{" "}
                      {this.state.request.requestedFrom.lastname}
                    </p>
                    <p>
                      <span className="icon is-small is-left mr-2">
                        <FontAwesomeIcon icon={(fas, faEnvelope)} />
                      </span>
                      {this.state.request.requestedFrom.email}
                    </p>
                    <p>
                      <span className="icon is-small is-left mr-2">
                        <FontAwesomeIcon icon={(fas, faMapMarkerAlt)} />
                      </span>
                      {this.state.request.requestedFrom.postalCode}
                    </p>
                    <p>
                      <span className="icon is-small is-left mr-2">
                        <FontAwesomeIcon icon={(fas, faCalendar)} />
                      </span>
                      {getFormattedDate(this.state.request.fromDate)} to
                      {getFormattedDate(this.state.request.toDate)}
                    </p>
                    <p><span className="tag is-info mr-2">status</span>{this.state.request.status}</p>

                  </div>
                </div>
                

              </div>
              
            </div>
            <div className="column is-4 py-4 px-2">
                <div className="py-5">
                    {this.state.comments.length > 0 ? 
                      this.state.comments.map((comment)=>(
                        <p><span className="tag is-info mb-2 mr-2">{comment.username}</span>{comment.message}</p>
                    ))
                    : <h2>No comments</h2>
                    }
                </div>
                <div class="field">
                    <div class="control">
                        <textarea name="message" className="textarea is-primary" onChange={this.handleInputChange}></textarea>
                    </div>
                </div> 
                <button className="button is-primary" onClick={this.handleUpdate}>Update comments</button>
                
            </div>
          </div>
        </DefaultLayout>
      );
    }
  }
}

export default RequestDetail;
