import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";

class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  getPokemonToShow() {
    let id = parseInt(this.props.location.pathname.split("/").slice(-1)[0]);
    for (let pokemon of this.props.data.pokemonsInfo) {
      if (pokemon.id === id) return pokemon;
    }
  }

  getPokemonTypes(pokemon) {
    let pokemonTypes = "";
    for (let type of pokemon.types) {
      pokemonTypes += type.type.name + " ";
    }
    return pokemonTypes;
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    let pokemon = this.getPokemonToShow();
    return (
      <div className="detail">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Types</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{pokemon.name}</td>
              <td>{pokemon.height}</td>
              <td>{pokemon.weight}</td>
              <td>{this.getPokemonTypes(pokemon)}</td>
            </tr>
          </tbody>
        </table>
        <Link to={"/"}>
          <button onClick={this.goBack}>Back</button>
        </Link>
      </div>
    );
  }
}

export default DetailPage;
