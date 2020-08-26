import React, { Component } from "react";


class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
                <p className="flow-text grey-text text-darken-1">
                  You are logged into a full-stack{" "}
                  <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
                </p>
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
