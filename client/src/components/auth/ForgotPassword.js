import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      showError: false,
      messageFromServer: "",
    };
  }
  onSubmitHandler = (e) => {
    e.preventDefault();
   this.props.history.push('/login')
  }
  
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = (e) => {
    e.preventDefault();
    if (this.state.email === "") {
      this.setState({
        showError: false,
        messageFromServer: "",
      });
    } else {
      axios
        .post("/api/users/forgotpassword", {
          email: this.state.email,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data === "email not in mongodb") {
            this.setState({
              showError: true,
              messageFromServer: "",
            });
          } else if (response.data === "recovery email sent") {
            this.setState({
              showError: false,
              messageFromServer: "recovery email sent",
            });
          }
        })
        .catch((error) => {
          console.log(error.data);
        });
    }
  };

  render() {
    const { email, messageFromServer, showNullError, showError } = this.state;
    return (
      <div className="container">
        <div style={{ marginTop: "0rem" }} className="row">
          <div className="col s8 offset-s2">
          <h4>
                <b>Envoyer le mail de modification de mot de passe</b><br/> par ici
              </h4>
              <p className="grey-text text-darken-1">
                Vous n'avez pas de compte <Link to="/register">S'inscrire</Link>
              </p>
          <form  noValidate onSubmit={this.sendEmail, this.onSubmitHandler}>
            <div className="input-field col s12">
              <input
                value={email}
                id="email"
                type="email"
                onChange={this.handleChange("email")}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Envoyer
              </button>
            </div>
          </form>
          {showNullError && (
            <div>
              <p className="red-text">Le champs email doit être rempli</p>
            </div>
          )}
          {showError && (
            <div>
              <p className="red-text">
                Email adresse n'a pas été reconnu, Essayez de nouveau ou
                s'inscrire depuis la page <a href="/register">Register</a>
              </p>
            </div>
          )}
          {messageFromServer ===
            "Email de changement de mot de passe a été envoyé" && (
            <div>
              <h3 className="green-text">
                Mail de modification de mot de passe a été envoyé
              </h3>
            </div>
          )}
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
