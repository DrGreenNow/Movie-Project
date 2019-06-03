import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = props => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light App-header">
    <Link to="/" className="navbar-brand App-title" href="#">
      Movies
    </Link>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link
          to="/favorites"
          className="nav-item nav-link favorites active"
          href="#"
        >
          Favorites <span className="sr-only">(current)</span>
        </Link>
      </div>
    </div>
    <form className="form-inline" onSubmit={props.search}>
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        name="SearchForMovie"
      />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  </nav>
);

export default Navbar;
