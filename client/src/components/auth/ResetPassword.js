import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const loading = {
  margin: "1em",
  fontSizze: "24px",
};

const title = {
  pageTitle: "Page de reinitialisation de mot de passe",
};

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
    console.log(this.props.match.params.token);
    await axios
      .get("/api/users/resetpassword", {
        params: {
          resetPasswordToken: this.props.match.token,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.message === "password reset link a-ok") {
          this.setState({
            name: response.data.username,
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

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = (e) => {
    e.preventDefault();
    axios
      .put("api/users/updatePasswordViaEmail", {
        name: this.state.name,
        password: this.state.password,
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
        <div>

        </div>
      )
     
    }
  }
}

export default ResetPassword;
