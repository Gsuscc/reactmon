import React, { createContext, useState } from "react";

export const PokemonContext = createContext();

export const PokemonProvider = (props) => {
  const [navbarLinks, setNavbarLinks] = useState([
    { id: 1, link: "/pokemons", buttonName: "Pokecodex" },
    { id: 2, link: "/types", buttonName: "Types" },
  ]);
  return (
    <PokemonContext.Provider value={[navbarLinks, setNavbarLinks]}>
      {props.children}
    </PokemonContext.Provider>
  );
};
