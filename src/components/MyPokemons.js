import React, { useContext } from "react";
import { PokemonContext } from "../PokemonContext";
import { Link } from "react-router-dom";

export const MyPokemons = () => {
  const { store, getSpriteByName, getIdByName } = useContext(PokemonContext);
  console.log(getSpriteByName);
  const [pokemonStorage, setPokemonStorage] = store;

  return (
    <div className="container">
      {pokemonStorage.map((pokemon) => {
        return (
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
        );
      })}
      <Link to={`/pokemons`}>
        <button>Back</button>
      </Link>
    </div>
  );
};
