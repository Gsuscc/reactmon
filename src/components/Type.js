import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "../index.css";

export default class Type extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      typeLinks: [],
      typeInfos: [],
    };
  }

  getType() {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((response) => {
        response.data.results.forEach((type) => {
          this.getTypeInfo(type.url);
        });
        return response;
      })
      .then((response) => {
        console.log("getting Links");
        const typeLinks = response.data.results;
        this.setState({ typeLinks });
      });
  }

  componentDidMount() {
    this.getType();
  }

  //   getSpriteByName(name) {
  //     for (let pokemon of this.state.typeInfos) {
  //       console.log(pokemon);
  //       if (pokemon.name === name) return pokemon.sprites.front_default;
  //     }
  //   }

  getTypeInfo(url) {
    axios.get(url).then((response) => {
      let type = response.data;
      this.setState({ typeInfos: [...this.state.typeInfos, type] });
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { isLoading, typeLinks } = this.state;

    if (isLoading) {
      return <div className="Types">Loading...</div>;
    }

    return (
      <div className="container">
        {console.log(this.state)}
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
      </div>
    );
  }
}
