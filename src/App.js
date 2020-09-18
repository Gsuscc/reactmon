import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pokemons from "./components/Pokemons";
import Type from "./components/Type";
import DetailPage from "./components/DetailPage";
import "./index.css";
import styled from "styled-components";
import { PokemonProvider } from "./PokemonContext";
import Navbar from "./components/Navbar";

const H1 = styled.h1`
  font-family: monospace;
  font-size: 1.5rem;
  border: solid black 1px;
  border-radius: 21px;
  text-align: center;
  background-color: orange;
  box-shadow: 21px;
`;

export const Button = styled.button`
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
  let content = (
    <PokemonProvider>
      <div className="App">
        <H1>Pokemon Library</H1>
        <Router>
          <div>
            <Switch>
              <Route exact path="/">
                <Navbar />
              </Route>
              <Route path="/pokemons">
                <Pokemons />
              </Route>
              <Route path="/types">
                <Type />
              </Route>
              <Route
                path="/pokemon"
                render={(props) => <DetailPage {...props} />}
              ></Route>
            </Switch>
          </div>
        </Router>
      </div>
    </PokemonProvider>
  );
  return content;
};

export default App;
