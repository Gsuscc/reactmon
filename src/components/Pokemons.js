import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "../index.css";

export default class Pokemons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pokemonsLinks: [],
      pokemonsInfo: [],
    };
  }

  getPokemons() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        response.data.results.forEach((pokemon) => {
          this.getPokemonInfo(pokemon.url);
        });
        return response;
      })
      .then((response) => {
        console.log("getting Links");
        const pokemonsLinks = response.data.results;
        this.setState({ pokemonsLinks });
      });
  }

  componentDidMount() {
    this.getPokemons();
  }

  getSpriteByName(name) {
    for (let pokemon of this.state.pokemonsInfo) {
      console.log(pokemon);
      if (pokemon.name === name) return pokemon.sprites.front_default;
    }
  }

  getPokemonInfo(url) {
    axios.get(url).then((response) => {
      console.log("getting Pokes:");
      let pokemon = response.data;
      this.setState({ pokemonsInfo: [...this.state.pokemonsInfo, pokemon] });
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { isLoading, pokemonsLinks, pokemonsInfo } = this.state;

    if (isLoading) {
      return <div className="Pokemons">Loading...</div>;
    }

    return (
      <div className="container">
        {console.log(this.state)}
        {pokemonsLinks.map((pokemon) => (
          <div className="Pokemons">
            <p className="name">{pokemon.name}</p>
            <img
              className="pokeImg"
              src={this.getSpriteByName(pokemon.name)}
              alt="img"
            ></img>
            <Router>
              <Link to={pokemon.url}>
                <button>Details</button>
              </Link>
            </Router>
          </div>
        ))}
      </div>
    );
  }
}
