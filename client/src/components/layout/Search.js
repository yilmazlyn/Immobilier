import React, { Component } from "react";


class Search extends Component {
  state = {
    query: "",
  };

  handleInputChange = () => {
    this.setState({
      query: this.search.value,
    });
  };

  render() {
    return (
      <form className="container">
        <input
          className="searchbar"
          type="text"
          label="Rechercher par ici"
          placeholder="Entrer un type d'evenement"
          ref={(input) => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <p>{this.state.query}</p>
      </form>
    );
  }
}

export default Search;
