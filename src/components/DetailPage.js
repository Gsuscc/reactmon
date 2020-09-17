import React, { Component } from "react";

class DetailPage extends Component {
  getPokemonToShow() {
    let id = parseInt(this.props.location.pathname.split("/").slice(-1)[0]);
    for (let pokemon of this.props.data.pokemonsInfo) {
      if (pokemon.id === id) return pokemon;
    }
  }

  getPokemonTypes(pokemon) {
    let pokemonTypes = "";
    for (let type of pokemon.types) {
      pokemonTypes += type.name + " ";
    }
    return pokemonTypes;
  }

  render() {
    let pokemon = this.getPokemonToShow();
    return (
      <div className="detail">
        <table>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Types</th>
          </tr>
          <tr>
            <td>{pokemon.name}</td>
            <td>{pokemon.height}</td>
            <td>{pokemon.weight}</td>
            <td>{this.getPokemonTypes(pokemon)}</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default DetailPage;
