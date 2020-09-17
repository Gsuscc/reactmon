import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Pokemons from "./components/Pokemons";
import Type from "./components/Type";
import DetailPage from "./components/DetailPage";
import axios from "axios";

const App = (props) => {
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

  const Home = (props) => {
    return (
      <div>
        {props.navbarLinks.map((link) => {
          return (
            <li className="btn">
              <Link to={link.link}>{link.buttonName}</Link>
            </li>
            // <button className="btn" onClick={this.displayPokemons}>
            //   {link.buttonName}
            // </button>
          );
        })}
      </div>
    );
  };

  let content = (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Home navbarLinks={navbarLinks} />
            </Route>
            <Route path="/pokemons">
              <Pokemons
                pokemonsLinks={pokemonsLinks}
                pokemonsInfo={pokemonsInfo}
              />
            </Route>
            <Route path="/types">
              <Type />
            </Route>
            <Route
              path="/pokemon"
              render={(props) => <DetailPage {...props} data={pokemonsInfo} />}
            ></Route>
          </Switch>
        </div>
      </Router>
      {/* {pokemons} */}
    </div>
  );
  return content;
};

export default App;
