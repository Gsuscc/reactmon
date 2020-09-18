import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PokemonContext = createContext();

export const PokemonProvider = (props) => {
  const [navbarLinks, setNavbarLinks] = useState([
    { id: 1, link: "/pokemons", buttonName: "Pokecodex" },
    { id: 2, link: "/types", buttonName: "Types" },
  ]);

  const [isLoading, setIsloading] = useState(true);

  const [pokemonsLinks, setPokemonsLinks] = useState([]);

  const [pokemonsInfo, setPokemonsInfo] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        response.data.results.forEach((pokemon) => {
          axios.get(pokemon.url).then((response) => {
            let pokemon = response.data;
            setPokemonsInfo((pokemonsInfo) => [...pokemonsInfo, pokemon]);
            setIsloading(false);
          });
        });
        return response;
      })
      .then((response) => {
        const pokemonsLinks = response.data.results;
        setPokemonsLinks(pokemonsLinks);
      });
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        navbar: [navbarLinks, setNavbarLinks],
        pokemonsInfo: [pokemonsInfo, setPokemonsInfo],
        pokemonsLinks: [pokemonsLinks, setPokemonsLinks],
      }}
    >
      {props.children}
    </PokemonContext.Provider>
  );
};
