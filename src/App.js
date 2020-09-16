import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Pokemons from "./components/Pokemons";

class App extends Component {
  state = {
    navbarLinks: [
      { id: 1, link: "/pokemons", buttonName: "Pokecodex" },
      { id: 2, link: "/types", buttonName: "Types" },
    ],
    displayPokemons: false,
  };

  displayPokemons = () => {
    this.setState({
      displayPokemons: !this.state.displayPokemons,
    });
  };

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
                <Pokemons />
              </Route>
              {/* <Route path="/dashboard">
            <Dashboard />
          </Route> */}
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
