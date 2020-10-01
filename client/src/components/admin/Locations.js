import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Locations.css";
import { connect } from "react-redux";
import { getLocations, deleteLocation } from "../../actions/locationActions";
import PropTypes from "prop-types";
import AddLocation from "./AddLocation";
import M from "materialize-css";

class Locations extends Component {
  componentDidMount() {
    M.Tabs.init(this.Tabs);
    this.props.getLocations();
  }

  onDeleteClick = (id) => {
    this.props.deleteLocation(id);
  };

  render() {
    const { locations } = this.props.location;
    console.log(locations);

    return (
      <div className="grid center-align">
        <div class="row">
          <div class="col s12">
            <ul
              class="tabs"
              ref={(Tabs) => {
                this.Tabs = Tabs;
              }}
              id="tabs-swipe"
              className="tabs"
            >
              <li class="tab col s3">
                <a href="#test1" class="active">Lister les Locations et Supprimer</a>
              </li>
              <li class="tab col s3">
                <a href="#test2">
                  Ajouter des Locations
                </a>
              </li>
              <li class="tab col s3">
                <a href="#test3">MAJ les Locations</a>
              </li>
            </ul>
          </div>
          <div id="test1" class="col s12">
            <TransitionGroup className="location-list">
              {locations.map(
                ({ _id, title, description, adresse, price, capacity }) => (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                    <div className="container">
                      <div class="row">
                        <div class="col s12 m6"
                        style={{
                          marginTop: "2rem"
                        }}>
                          <div class="card">
                            <div class="card-image">
                              <img
                                src="https://images.unsplash.com/photo-1600950603226-e9443673e604?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"
                                alt="unsplash"
                              />
                            </div>
                            <div class="card-content">
                              <h4>{title}</h4>
                              <p>{description}</p>
                              <p><strong>Location: </strong>{adresse}</p>
                              <p><strong>Prix: </strong>{price + "€"}</p>
                              <p><strong>Capacité: </strong>{capacity + "/personne"}</p>

                              <br />
                              <button
                                class="btn waves-effect waves-light delete-btn"
                                type="button"
                                name="delete"
                                onClick={this.onDeleteClick.bind(this, _id)}
                              >
                                Delete
                                <i class="material-icons right delete_forever">
                                  delete
                                </i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CSSTransition>
                )
              )}
            </TransitionGroup>
          </div>

          <div id="test2" class="col s12">
            <AddLocation />
          </div>

          <div id="test3" class="col s12">
            Test 3
          </div>

        </div>
      </div>
    );
  }
}

Locations.propTypes = {
  getLocations: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  location: state.location,
});

export default connect(mapStateToProps, { getLocations, deleteLocation })(
  Locations
);

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
