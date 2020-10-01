import React, { Component } from "react";
import { getLocations } from "../../actions/locationActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Landing.css";

class Landing extends Component {
  componentDidMount() {
    this.props.getLocations();
  }

  render() {
    const { locations } = this.props.location;
    console.log(locations);
    return (
      <div className="container">
        <section
          style={{
            height: "100px",
            marginTop: "2rem",
          }}
        >
          <h3>Nos Locations Disponible</h3>
        </section>

        {locations.map(
          ({ _id, title, description, adresse, price, capacity }) => (
            <div className="row" key={_id}>
              <div
                className="col s12 m6"
                style={{
                  marginTop: "2rem",
                }}
              >
                <div className="card">
                  <div className="card-image">
                    <img
                      src="https://images.unsplash.com/photo-1600950603226-e9443673e604?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"
                      alt="unsplash"
                    />
                  </div>
                  <div className="card-content">
                    <h4>{title}</h4>
                    <p>{description}</p>
                    <p>
                      <strong>Location: </strong>
                      {adresse}
                    </p>
                    <p>
                      <strong>Prix: </strong>
                      {price + "€"}
                    </p>
                    <p>
                      <strong>Capacité: </strong>
                      {capacity + "/personnes"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}

Landing.propTypes = {
  getLocations: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  location: state.location,
});

export default connect(mapStateToProps, { getLocations })(Landing);
