import React, { useContext } from "react";
import { PokemonContext } from "../PokemonContext";
import { Button } from "../App";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { navbar, pokeInfo, pokeLinks } = useContext(PokemonContext);
  const [navbarLinks, setNavbarLinks] = navbar;
  return (
    <div className="navbar">
      {navbarLinks.map((link) => {
        return (
          <Link to={link.link}>
            <Button className="btn">{link.buttonName}</Button>
          </Link>
        );
      })}
    </div>
  );
};

export default Navbar;
