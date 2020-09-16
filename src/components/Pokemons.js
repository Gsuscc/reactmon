import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Pokemons extends Component {
  constructor(props) {
    super();
    this.state = {
      pokemons: [],
      img: [],
    };
  }

  getPokemons() {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
      const pokemons = response.data.results;
      this.setState({ pokemons });
    });
  }
  getPokemonImages() {
    this.state.pokemons.forEach((pokemon) => this.getPokemonInfo(pokemon.url));
  }

  componentDidMount() {
    this.getPokemons();
    this.getPokemonImages();
  }

  getPokemonInfo(url) {
    axios.get(url).then((response) => {
      let name = response.data.name;
      let imgUrl = response.data.sprites.fornt_default;
      let imgToAdd = { name: imgUrl };
      this.setState({ img: [...this.state.img, imgToAdd] });
    });
  }

  render() {
    return (
      <div>
        {this.state.pokemons.map((pokemon) => (
          <div className="card">
            <p className="name">{pokemon.name}</p>
            <img src={this.state.img[pokemon.name]} alt="img"></img>
            <Router>
              <li>
                <Link to={pokemon.url}></Link>
              </li>
            </Router>
          </div>
        ))}
      </div>
    );
  }
}

export default Pokemons;
