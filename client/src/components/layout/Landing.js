import React, { Component } from "react";
import eventImage from "../../images/events.jpg";

class Landing extends Component {
  render() {
    return (
      
      <div className="grid">
        <section style={{
          height: "200px"
        }}></section>
        <div class="row">
          <div class="col s3">
            <div class="card">
              <div class="card-image">
                <img src={eventImage} alt="event" />
                <span class="card-title">Card Title</span>
              </div>
              <div class="card-content">
                <p>
                  I am a very simple card. I am good at containing small bits of
                  information. I am convenient because I require little markup
                  to use effectively.
                </p>
              </div>
              <div class="card-action">
                <a href="/">This is a link</a>
              </div>
            </div>
          </div>
          <div class="col s3">
            <div class="card">
              <div class="card-image">
                <img src={eventImage} alt="event" />
                <span class="card-title">Card Title</span>
              </div>
              <div class="card-content">
                <p>
                  I am a very simple card. I am good at containing small bits of
                  information. I am convenient because I require little markup
                  to use effectively.
                </p>
              </div>
              <div class="card-action">
                <a href="/">This is a link</a>
              </div>
            </div>
          </div>
          <div class="col s3">
            <div class="card">
              <div class="card-image">
                <img src={eventImage} alt="event" />
                <span class="card-title">Card Title</span>
              </div>
              <div class="card-content">
                <p>
                  I am a very simple card. I am good at containing small bits of
                  information. I am convenient because I require little markup
                  to use effectively.
                </p>
              </div>
              <div class="card-action">
                <a href="/">This is a link</a>
              </div>
            </div>
          </div>
          <div class="col s3">
            <div class="card">
              <div class="card-image">
                <img src={eventImage} alt="event" />
                <span class="card-title">Card Title</span>
              </div>
              <div class="card-content">
                <p>
                  I am a very simple card. I am good at containing small bits of
                  information. I am convenient because I require little markup
                  to use effectively.
                </p>
              </div>
              <div class="card-action">
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
