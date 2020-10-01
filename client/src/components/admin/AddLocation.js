import React, { Component } from "react";
import { connect } from "react-redux";
import { addLocation } from "../../actions/locationActions";




class AddLocation extends Component {
  state = {
    modal: false,
    title: "",
    description: "",
    adresse: "",
    price: "",
    capacity: "",
    image: "",
    date: Date.now(),
  };

  

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newLocation = {
      title: this.state.title,
      description: this.state.description,
      adresse: this.state.adresse,
      price: this.state.price, 
      capacity: this.state.capacity,
      image: this.state.image

    }

    //Add location via addLocation action
    this.props.addLocation(newLocation)

  }

  render() {
    return (
      <div className="container">
      <div class="row" style={{ marginTop: "3rem" }}>
        <form class="col s12" onSubmit={this.onSubmit}>
          <div class="row">
            <div class="input-field col s12">
              <input
                placeholder="Ex: Chateau pour evenements"
                name="title"
                id="title"
                type="text"
                class="validate"
                onChange={this.onChange}
              />
              <label for="title">Location Title</label>
            </div>
            <div class="input-field col s12">
              <textarea
                placeholder="Decription de cette location"
                name="description"
                class="materialize-textarea"
                onChange={this.onChange}
              />
              <label for="last_name">Descriptions</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                placeholder="Ex: La Wantzenau/Strasbourg"
                name="adresse"
                id=""
                type="text"
                class="validate"
                onChange={this.onChange}
              />
              <label for="disabled">Adresse</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                placeholder="Ex: 100€"
                name="price"
                id=""
                type="number"
                class="validate"
                onChange={this.onChange}
              />
              <label for="price">Prix</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                placeholder="Capacité d'acceuil"
                name="capacity"
                id="email"
                type="number"
                class="validate"
                onChange={this.onChange}
              />
              <label for="email">Capacité</label>
            </div>
          </div>

          <div class="row">
            <div class="file-field input-field">
              <div
                class="btn"
                style={{
                  marginLeft: "0.5rem",
                }}
              >
                <span>Ajouter</span>
                <input name="image" type="file" multiple />
              </div>
              <div class="file-path-wrapper">
                <input
                  class="file-path validate"
                  type="text"
                  placeholder="Upload one or more files"
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>

          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
              marginBottom: "2rem",
            }} block
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Add to db
          </button>
        </form>
      </div>
      </div>
    );
  }
}

const mapStatetoProps = state =>({
  location: state.location
})


export default connect(mapStatetoProps, {addLocation})(AddLocation);
