import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { PokemonContext } from "../PokemonContext";

const Pokemons = (props) => {
  const { navbar, pokeInfo, pokeLinks } = useContext(PokemonContext);
  console.log(navbar);
  console.log(pokeInfo);
  console.log(pokeLinks);
  const [pokemonsInfo, setPokemonsInfo] = pokeInfo;
  const [pokemonsLinks, setPokemonsLinks] = pokeLinks;

  const getSpriteByName = (name) => {
    for (let pokemon of pokemonsInfo) {
      if (pokemon.name === name) return pokemon.sprites.front_default;
    }
  };

  const getIdByName = (name) => {
    for (let pokemon of pokemonsInfo) {
      if (pokemon.name === name) return pokemon.id;
    }
  };

  return (
    <div className="container">
      {pokemonsLinks.map((pokemon) => (
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
