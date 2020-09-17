import React, { Component } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import "../index.css";
import DetailPage from "./DetailPage";

export default class Pokemons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pokemonsLinks: [],
      pokemonsInfo: [],
    };
  }

  getSpriteByName(name) {
    for (let pokemon of this.props.data.pokemonsInfo) {
      if (pokemon.name === name) return pokemon.sprites.front_default;
    }
  }

  getIdByName(name) {
    for (let pokemon of this.props.data.pokemonsInfo) {
      if (pokemon.name === name) return pokemon.id;
    }
  }

  render() {
    const { isLoading, pokemonsLinks, pokemonsInfo } = this.props.data;

    if (isLoading) {
      return <div className="Pokemons">Loading...</div>;
    }

    return (
      <div className="container">
        {pokemonsLinks.map((pokemon) => (
          <div className="Pokemons">
            <p className="name">{pokemon.name}</p>
            <div>
              <img
                className="pokeImg"
                src={this.getSpriteByName(pokemon.name)}
                alt="img"
              ></img>
            </div>
            <Link to={`/pokemon/${this.getIdByName(pokemon.name)}`}>
              <button>Details</button>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
