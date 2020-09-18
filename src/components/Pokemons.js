import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { PokemonContext } from "../PokemonContext";
import { MyPokemons } from "./MyPokemons";

const Pokemons = (props) => {
  const {
    pokemons,
    links,
    addPokemonToStore,
    getSpriteByName,
    getIdByName,
  } = useContext(PokemonContext);
  const [pokemonsInfo, setPokemonsInfo] = pokemons;
  const [pokemonsLinks, setPokemonsLinks] = links;

  const catchPokemon = (pokemon) => {
    addPokemonToStore(pokemon);
  };

  return (
    <div className="container">
      <Link to={`/myPokemons`}>
        <button>My Pokemons</button>
      </Link>
      <Link to={"/"}>
        <button>Back</button>
      </Link>
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
          <button onClick={catchPokemon.bind(this, pokemon)}>Catch!</button>
        </div>
      ))}
    </div>
  );
};

export default Pokemons;
