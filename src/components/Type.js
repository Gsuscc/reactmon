import React, { useContext } from "react";
import { PokemonContext } from "../PokemonContext";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "../index.css";

const Type = (props) => {
  const { types, linksForTypes } = useContext(PokemonContext);
  const [typeInfos, setTypeInfos] = types;
  const [typeLinks, setTypeLinks] = linksForTypes;

  // if (isLoading) {
  //   return <div className="Types">Loading...</div>;
  // }

  return (
    <div className="container">
      {typeLinks.map((type) => (
        <div className="Pokemons">
          <p className="name">{type.name}</p>
          {/* <div>
              <img
                className="pokeImg"
                src={this.getSpriteByName(pokemon.name)}
                alt="img"
              ></img>
            </div> */}
          <Router>
            <Link to={type.url}>
              <button>Details</button>
            </Link>
          </Router>
        </div>
      ))}
      <Link to={"/"}>
        <button>Back</button>
      </Link>
    </div>
  );
};

export default Type;
