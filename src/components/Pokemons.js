import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Pokemons = (props) => {
  const getSpriteByName = (name) => {
    for (let pokemon of props.pokemonsInfo) {
      if (pokemon.name === name) return pokemon.sprites.front_default;
    }
  };

  const getIdByName = (name) => {
    for (let pokemon of props.pokemonsInfo) {
      if (pokemon.name === name) return pokemon.id;
    }
  };

  console.log();
  // const { pokemonsLinks } = props;

  return (
    <div className="container">
      {props.pokemonsLinks.map((pokemon) => (
        <div className="Pokemons">
          <p className="name">{pokemon.name}</p>
          <div>
            <img
              className="pokeImg"
              src={getSpriteByName(pokemon.name)}
              alt="img"
            ></img>
          </div>
          <Link to={`/pokemon/${getIdByName(pokemon.name)}`}>
            <button>Details</button>
          </Link>
        </div>
      ))}
      <Link to={"/"}>
        <button>Back</button>
      </Link>
    </div>
  );
};

export default Pokemons;
