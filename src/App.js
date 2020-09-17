import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Pokemons from "./components/Pokemons";
import Type from "./components/Type";
import DetailPage from "./components/DetailPage";
import axios from "axios";

class App extends Component {
  state = {
    navbarLinks: [
      { id: 1, link: "/pokemons", buttonName: "Pokecodex" },
      { id: 2, link: "/types", buttonName: "Types" },
    ],
    isLoading: true,
    pokemonsLinks: [],
    pokemonsInfo: [],
  };

  getPokemons() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        response.data.results.forEach((pokemon) => {
          this.getPokemonInfo(pokemon.url);
        });
        return response;
      })
      .then((response) => {
        const pokemonsLinks = response.data.results;
        this.setState({ pokemonsLinks });
      });
  }

  getPokemonInfo(url) {
    axios.get(url).then((response) => {
      let pokemon = response.data;
      this.setState({ pokemonsInfo: [...this.state.pokemonsInfo, pokemon] });
      this.setState({ isLoading: false });
    });
  }

  componentDidMount() {
    this.getPokemons();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path="/">
                <this.Home {...this.state} />
              </Route>
              <Route path="/pokemons">
                <Pokemons data={this.state} />
              </Route>
              <Route path="/types">
                <Type />
              </Route>
              <Route
                path="/pokemon"
                render={(props) => <DetailPage {...props} data={this.state} />}
              ></Route>
            </Switch>
          </div>
        </Router>
        {/* {pokemons} */}
      </div>
    );
  }

  Home(props) {
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
  }
}

export default App;
