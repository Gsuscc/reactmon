import React, { Component } from "react";
import App from "../App";

class Navbar extends Component {
  render() {
    return this.props.navbar.navbarLinks.map((link) => (
      <button className="btn" onClick={App.displayPokenons}>
        {link.buttonName}
      </button>
    ));
  }
}

export default Navbar;
