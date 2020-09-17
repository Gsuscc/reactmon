import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const DetailPage = (props) => {
  console.log(props);
  const getPokemonToShow = () => {
    let id = parseInt(props.location.pathname.split("/").slice(-1)[0]);
    for (let pokemon of props.data) {
      if (pokemon.id === id) return pokemon;
    }
  };

  let pokemon = getPokemonToShow();

  const getPokemonTypes = (pokemon) => {
    let pokemonTypes = "";
    for (let type of pokemon.types) {
      pokemonTypes += type.type.name + " ";
    }
    return pokemonTypes;
  };

  const getPokemonAbilities = (pokemon) => {
    let pokemonAbilities = "";
    for (let index = 0; index < pokemon.abilities.length; index++) {
      pokemonAbilities +=
        pokemon.abilities.length - 1 > index
          ? pokemon.abilities[index].ability.name + ", "
          : pokemon.abilities[index].ability.name;
    }
    return pokemonAbilities;
  };

  const goBack = () => {
    props.history.goBack();
  };

  return (
    <div className="detail">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Types</th>
            <th>Abilities</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{pokemon.name}</td>
            <td>{pokemon.height}</td>
            <td>{pokemon.weight}</td>
            <td>{getPokemonTypes(pokemon)}</td>
            <td>{getPokemonAbilities(pokemon)}</td>
          </tr>
        </tbody>
      </table>
      <Link to={"/"}>
        <button onClick={goBack}>Back</button>
      </Link>
    </div>
  );
};

export default DetailPage;
