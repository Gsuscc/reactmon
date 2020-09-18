import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PokemonContext = createContext();

export const PokemonProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [typeLinks, setTypeLinks] = useState([]);
  const [typeInfos, setTypeInfos] = useState([]);
  const [navbarLinks, setNavbarLinks] = useState([
    { id: 1, link: "/pokemons", buttonName: "Pokecodex" },
    { id: 2, link: "/types", buttonName: "Types" },
  ]);

  const [pokemonsLinks, setPokemonsLinks] = useState([]);

  const [pokemonsInfo, setPokemonsInfo] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((response) => {
        response.data.results.forEach((type) => {
          axios.get(type.url).then((response) => {
            let type = response.data;
            setTypeInfos((typeInfos) => [...typeInfos, type]);
            // setIsLoading(false);
          });
        });
        return response;
      })
      .then((response) => {
        const typeLinks = response.data.results;
        setTypeLinks(typeLinks);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        response.data.results.forEach((pokemon) => {
          axios.get(pokemon.url).then((response) => {
            let pokemon = response.data;
            setPokemonsInfo((pokemonsInfo) => [...pokemonsInfo, pokemon]);
            // setIsloading(false);
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
        pokemons: [pokemonsInfo, setPokemonsInfo],
        links: [pokemonsLinks, setPokemonsLinks],
        types: [typeInfos, setTypeInfos],
        linksForTypes: [typeLinks, setTypeLinks],
      }}
    >
      {props.children}
    </PokemonContext.Provider>
  );
};
