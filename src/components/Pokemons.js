import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Pokemons extends Component {
  state = {
    pokemons: [],
  };

  getPokemons() {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
      const pokemons = response.data.results;
      this.setState({ pokemons });
    });
  }

  componentDidMount() {
    this.getPokemons();
  }

  render() {
    return (
      <div>
        {this.state.pokemons.map((pokemon) => (
          <Router>
            <li>
              <Link to={pokemon.url}>{pokemon.name}</Link>
            </li>
          </Router>
        ))}
      </div>
    );
  }
}

export default Pokemons;
