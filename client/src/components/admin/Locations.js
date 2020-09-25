import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";

class Locations extends Component {
  state = {
    locations: [
      { id: uuid(), title: "location1", description: "Simple decription for locations" },
      { id: uuid(), title: "location2", description: "Simple decription for locations" },
    ],
  };

  render() {
    const { locations } = this.state;
    return (
      <div className="container">
        <button
          onClick={() => {
            const title = prompt("Enter location");
            if (title) {
              this.setState((state) => ({
                locations: [...state.locations, { id: uuid(), title }],
              }));
            }
          }}
          style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem",
          }}
          type="submit"
          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        >
          Add to DB
        </button>

        <TransitionGroup className="location-list">
          {locations.map(({ id, title}) => (
            <CSSTransition key={id} timeout={500} classNames="fade">
              <div className="container">
                <div class="row">
                  <div class="col s12 m6">
                    <div class="card">
                      <div class="card-image">
                        <img src="https://images.unsplash.com/photo-1600950603226-e9443673e604?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80" />
                        <span class="card-title" style={{color: "black", fontSize: "50px", fontStyle:"bold"}}>{title}</span>
                        <a class="btn-floating halfway-fab waves-effect waves-light red">
                          <i class="material-icons">add</i>
                        </a>
                      </div>
                      <div class="card-content">
                        <p>
                        Description will  come up here
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

export default Locations;

// <div style={{ marginTop: 20 }} className="container">
//   <h3>Create New Location</h3>
//   <form onSubmit={this.onSubmit}>
//     <div className="form-group">
//       <label>Titre: </label>
//       <input
//         type="text"
//         className="form-control"
//         value={this.state.location_title}
//       />
//     </div>
//     <div className="form-group">
//       <label>Decription: </label>
//       <input
//         type="text"
//         className="form-control"
//         value={this.state.location_description}
//       />
//     </div>
//     <div className="form-group">
//       <label>Type de Location: </label>
//       <input
//         type="text"
//         className="form-control"
//         value={this.state.location_type}
//       />
//     </div>
//     <div className="form-group">
//       <label>Adresse de location: </label>
//       <input
//         type="text"
//         className="form-control"
//         value={this.state.location_adresse}
//       />
//     </div>
//     <div className="form-group">
//       <label>Capacité de location: </label>
//       <input
//         type="text"
//         className="form-control"
//         value={this.state.location_capacity}
//       />
//     </div>
//     <div className="form-group">
//       <label>Prix de location: </label>
//       <input
//         type="text"
//         className="form-control"
//         value={this.state.location_price}
//       />
//     </div>
//     <div className="form-group">
//       <label>Nom de Responsable: </label>
//       <input
//         type="text"
//         className="form-control"
//         value={this.state.location_responsible}
//       />
//     </div>
//     <div className="form-group">
//       <label>Telephone de responsable: </label>
//       <input
//         type="tel"
//         className="form-control"
//         value={this.state.location_responsible_phone}
//       />
//     </div>
//     <div className="file-path-wrapper">
//       <label>Images de location: </label>
//       <input
//         type="file"
//         className="file-path"
//         value={this.state.location_img}
//       />
//     </div><br/>
//   </form>
// </div>
