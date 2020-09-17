import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "../index.css";

const Type = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [typeLinks, setTypeLinks] = useState([]);
  const [typeInfos, setTypeInfos] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((response) => {
        response.data.results.forEach((type) => {
          axios.get(type.url).then((response) => {
            let type = response.data;
            setTypeInfos((typeInfos) => [...typeInfos, type]);
            setIsLoading(false);
          });
        });
        return response;
      })
      .then((response) => {
        const typeLinks = response.data.results;
        setTypeLinks(typeLinks);
      });
  }, []);

  // const getTypeInfo = (url) => {
  //   axios.get(url).then((response) => {
  //     let type = response.data;
  //     setTypeInfos({ typeInfos: [...typeInfos, type] });
  //     setIsLoading({ isLoading: false });
  //   });
  // };

  if (isLoading) {
    console.log(typeInfos);
    console.log(typeLinks);
    return <div className="Types">Loading...</div>;
  }

  console.log(typeInfos);
  console.log(typeLinks);

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
