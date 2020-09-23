import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";


class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      password: "",
      passwordconf: "",
      update: false,
      isLoading: true,
      error: false,
    };
  }

  async componentDidMount() {
    console.log(this.props.match.params.rtoken);
    await axios
      .get("/api/users/resetpassword", {
         
          resetPasswordToken: this.props.match.params.rtoken,
        
      })
      .then((response) => {
        console.log(response);
        if (response.data.message === "password reset link a-ok") {
          this.setState({
            name: response.data.name,
            update: false,
            isLoading: false,
            error: false,
          });
        } else {
          this.setState({
            update: false,
            isLoading: false,
            error: true,
          });
        }
      })
      .catch((error) => {
        console.log(error.data);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = (e) => {
    e.preventDefault();
    axios
      .put("/api/users/updatePasswordViaEmail", {
        name: this.state.name,
        password: this.state.password,
        resetPasswordToken: this.props.match.params.rtoken
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "password updated") {
          this.setState({
            updated: true,
            error: false,
          });
        }
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  render() {
    const { password, error, isLoading, updated } = this.state;
    if (error) {
      return (
        <div className="container">
          <div style={{ marginTop: "0rem" }} className="row">
            <div className="col s8 offset-s2">
              <h5>
                <b>Probleme de reinitialisation de mot de passe</b>
                <br /> Veuillez de vous rediriger sur la page oublie de mot de passe pour renvoyer le lien
              </h5>
              <p className="grey-text text-darken-1">
                Mot de passe oublié <Link to="/forgotpassword">J'ai oublié mon mot de passe</Link>
              </p>
            </div>
          </div>
        </div>
      );
    } else if (isLoading) {
      return (
        
        <div className="container">
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Chargement de vos informations</b> sont en cours
              </h4>
              </div>
        </div>
      )
     
    } else {
      return (
        <div className="container">
          <div style={{ marginTop: "0rem" }} className="row">
          <div className="col s8 offset-s2">
          <h4>
                <b>Modifier votre mot de passe</b> par ici
              </h4>
              <p className="grey-text text-darken-1">
                Vous n'avez pas de compte ? <Link to="/register">S'inscrire </Link>
              </p>

              <p className="grey-text text-darken-1">
                Vous n'avez plus besoin de modifier votre mot de passe ? <Link to="/login">Se connecter</Link>
              </p>
          <form noValidate onSubmit={this.updatePassword}>
              <div className="input-field col s12">
              <input
                  onChange={this.handleChange("password")}
                  value={password}
                  id="password"
                  type="password"
                />
                <label htmlFor="password">Mot de passe</label>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Go ! 
                </button>
              </div>
                                  
              </div>
          </form>

          {updated && (
            <div className="container">
              <p className="grey-text text-darken-1">
                Votre mot de passe a été modifié <Link to="/login">Se connecter nouveau</Link>
              </p>
              <br/>
              <p className="grey-text text-darken-1">
                Vous pouvez sauter direcetement sur la page d'acceuil <Link to="/">Aller à la page d'acceuil</Link>
              </p>
            </div>
          )}
          </div>
          </div>
        </div>
      )
    }
  }
}

ResetPassword.propTypes = {
name: PropTypes.string,
email: PropTypes.string,
password: PropTypes.string
};

const mapStateToProps = state => ({
  password: state.password,
  errors: state.errors
});

export default connect(
  mapStateToProps,

)(withRouter(ResetPassword));
