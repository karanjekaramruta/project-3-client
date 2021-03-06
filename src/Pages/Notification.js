import React, { Component } from "react";
import axios from "axios";
import DefaultLayout from "../Layout/Default";
import StatusBox from "../Components/Common/StatusBox";
import Heading from "../Components/Common/Heading";
import SentRequests from "../Components/Notification/SentRequests";
import ReceivedRequests from "../Components/Notification/ReceivedRequests";

class Notification extends Component {
    
  state = {
    receivedRequests: [],
    sentRequests: [],
    error: null,
  };

  componentDidMount() {
    let receivedRequests = axios.get(
      process.env.REACT_APP_BASE_URL + "request/received",
      { withCredentials: true }
    );
    let sentRequests = axios.get(
      process.env.REACT_APP_BASE_URL + "request/sent",
      { withCredentials: true }
    );

    axios
      .all([receivedRequests, sentRequests])
      .then(
        axios.spread((receievdRequests, sentRequests) => {
          debugger;
          this.setState({
            receivedRequests: receievdRequests.data.requests,
            sentRequests: sentRequests.data.requests,
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
              <Heading heading="Notifications" />
              <hr />
              <div className="columns is-multiline">
                <StatusBox
                  status="Requests Receieved"
                  qty={this.state.receivedRequests.length}
                  nameOfClass={"owned"}
                />
                <StatusBox
                  status="Requests sent"
                  qty={this.state.sentRequests.length}
                  nameOfClass={"rented"}
                />
              </div>
              <div className="columns is-multiline">
                {this.state.receivedRequests.length > 0 ? (
                  <ReceivedRequests
                    receivedRequestsList={this.state.receivedRequests}
                  />
                ) : (
                  <div className="column is-6"><h2 className="subtitle px-5 py-2">No requests received</h2></div>
                )}
                {this.state.sentRequests.length > 0 ? (
                  <SentRequests sentRequestsList={this.state.sentRequests} />
                ) : (
                  <div className="column is-6"><h2 className="subtitle px-5 py-2">No requests sent</h2></div>
                )}
              </div>
            </main>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

export default Notification;
