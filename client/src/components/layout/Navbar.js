import React, { Component } from "react";
import Logo from "../../images/logo192.png";
import "./Navbar.css";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  componentDidMount() {
    let sidenav = document.querySelector("#mobile-nav");
    M.Sidenav.init(sidenav, {});
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className="grid">
        <nav
          className="Navbar"
          style={{
            padding: "0px 0px",

            position: "fixed",
          }}
        >
          <div className="nav-wrapper">
            <a href="/" class="brand-logo">
              HD2A{" "}
              <img
                alt="logo"
                src={Logo}
                style={{
                  height: "30px",
                  width: "40px",
                  paddingRight: "10px",
                  position: "absolute",
                  top: "17px",
                  right: "80px",
                }}
              />
            </a>

            <a
              href="/"
              onClick="return false"
              className="sidenav-trigger"
              data-target="mobile-nav"
            >
              <i className="material-icons">menu</i>
            </a>

            <ul className="right hide-on-med-and-down ">
              <li>
                <a href="/">Acceuil</a>
              </li>
              {!user.id ? (
                <li>
                  <a href="/register">S'inscrire</a>
                </li>
              ) : null}
              {!user.id ? (
                <li>
                  <a href="/login">Se connecter</a>
                </li>
              ) : null}

              <li>
                <a href="/about">Qui sommes-nous? </a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              {user.id ? (
                <li>
                  <a href="/login" onClick={this.onLogoutClick}>
                    Déconnecter
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </nav>
        <br />
        <br />

        <ul className="sidenav" id="mobile-nav">
          <li>
            <a href="/">Acceuil</a>
          </li>
          <li>
            <a href="/register">S'inscrire</a>
          </li>
          <li>
            <a href="/login">Se connecter</a>
          </li>
          <li>
            <a href="/login">Déconnecter</a>
          </li>
          <li>
            <a href="/about">Qui sommes-nous? </a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
