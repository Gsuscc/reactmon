import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Pokemons from "./components/Pokemons";
import Type from "./components/Type";
import DetailPage from "./components/DetailPage";
import axios from "axios";
import "./index.css";
import styled from "styled-components";

const H1 = styled.h1`
  font-family: monospace;
  font-size: 1.5rem;
  border: solid black 1px;
  border-radius: 21px;
  text-align: center;
  background-color: orange;
  box-shadow: 21px;
`;

const Button = styled.button`
  background-color: orangered;
  text-decoration: none;
  line-height: 30px;
  border-radius: 10px;
  margin: 5px 5px;
  align-self: center;
  &:hover {
    background-color: green;
    color: white;
  }
`;

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
      <div className="navbar">
        {props.navbarLinks.map((link) => {
          return (
            <Link to={link.link}>
              <Button className="btn">{link.buttonName}</Button>
            </Link>
          );
        })}
      </div>
    );
  };

  let content = (
    <div className="App">
      <H1>Pokemon Library</H1>
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
