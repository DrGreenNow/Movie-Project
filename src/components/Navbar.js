import React from "react";
import "./Navbar.css";

const Navbar = (props) => (
  <div className="App-header">
    <div className="container header-wrapper">
      <h1 className="App-title">Movies</h1>
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
    </div>
  </div>
);

export default Navbar;
