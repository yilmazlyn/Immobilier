import React, { Component } from "react";
import "./Header.css";
import Search from "./Search";
class Header extends Component {
  render() {
    return (
    <div className="responsive-img">
        <div className="search-area">
            <Search />
        </div>

    </div>
    );
  }
}

export default Header;
