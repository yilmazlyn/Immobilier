import React, { Component } from "react";
import eventImage from "../../images/events.jpg";

class Landing extends Component {

  
  render() {
    return (
      
      <div className="grid">
        <section style={{
          height: "200px"
        }}></section>
        <div className="row">
          <div className="col s3">
            <div className="card">
              <div className="card-image">
                <img src={eventImage} alt="event" />
                <span className="card-title">Card Title</span>
              </div>
              <div className="card-content">
                <p>
                  I am a very simple card. I am good at containing small bits of
                  information. I am convenient because I require little markup
                  to use effectively.
                </p>
              </div>
              <div className="card-action">
                <a href="/">This is a link</a>
              </div>
            </div>
          </div>
          <div className="col s3">
            <div className="card">
              <div className="card-image">
                <img src={eventImage} alt="event" />
                <span className="card-title">Card Title</span>
              </div>
              <div className="card-content">
                <p>
                  I am a very simple card. I am good at containing small bits of
                  information. I am convenient because I require little markup
                  to use effectively.
                </p>
              </div>
              <div className="card-action">
                <a href="/">This is a link</a>
              </div>
            </div>
          </div>
          <div className="col s3">
            <div className="card">
              <div className="card-image">
                <img src={eventImage} alt="event" />
                <span className="card-title">Card Title</span>
              </div>
              <div className="card-content">
                <p>
                  I am a very simple card. I am good at containing small bits of
                  information. I am convenient because I require little markup
                  to use effectively.
                </p>
              </div>
              <div className="card-action">
                <a href="/">This is a link</a>
              </div>
            </div>
          </div>
          <div className="col s3">
            <div className="card">
              <div className="card-image">
                <img src={eventImage} alt="event" />
                <span className="card-title">Card Title</span>
              </div>
              <div className="card-content">
                <p>
                  I am a very simple card. I am good at containing small bits of
                  information. I am convenient because I require little markup
                  to use effectively.
                </p>
              </div>
              <div className="card-action">
                <a href="/">This is a link</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
