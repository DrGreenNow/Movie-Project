import React from "react";
import axios from "axios";

import { Switch, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Film from "./components/Film";
import Favorites from "./components/Favorites";
import Movies from "./components/Movies";

class App extends React.Component {
  state = {
    movies: [],
    isLoading: true,
    page: 1,
    dataSearch: "",
    favorites: []
  };

  componentDidMount = () => {
    this.loadData();
  };

  inputData = e => {
    e.preventDefault();
    const movieName = e.target.elements.SearchForMovie.value;
    this.setState({ movies: [], page: 1 });

    if (movieName === "") {
      this.setState({ dataSearch: "" }, () => {
        this.loadData();
      });
      return;
    }

    this.setState({ dataSearch: movieName }, () => {
      this.commonGetRequest("search/movie", `query=${movieName}`);
      this.setState({ page: 2 });
    });
  };

  commonGetRequest = (list, query) => {
    axios
      .get(
        `https://api.themoviedb.org/3/${list}?api_key=0d747b42c205fad6e960bdfef2b60881&language=en-US&${query}&page=${
          this.state.page
        }`
      )
      .then(response => {
        this.setState(state => ({
          movies: [...state.movies, ...response.data.results],
          isLoading: false
        }));
      });
  };

  loadData = () => {
    this.state.dataSearch !== ""
      ? this.commonGetRequest("search/movie", `query=${this.state.dataSearch}`)
      : this.commonGetRequest("movie/popular", "");
    const filmsFromStorage = JSON.parse(localStorage.getItem("favoritesFilms"));
    this.setState(prevState => ({
      page: prevState.page + 1
    }));
    if (filmsFromStorage !== null) {
      this.setState({ favorites: filmsFromStorage });
    }
  };

  addToFavorites = async (e, saveMovie) => {
    if (this.state.favorites.find(i => i.id === saveMovie.id) === undefined) {
      await this.setState(state => ({
        favorites: [...this.state.favorites, saveMovie]
      }));
    } else {
      let filteredArr = this.state.favorites.filter(
        item => item.id !== saveMovie.id
      );
      await this.setState({ favorites: filteredArr });
    }
    const favoritesFilms = JSON.stringify(this.state.favorites);
    localStorage.setItem("favoritesFilms", favoritesFilms);
  };

  render() {
    return (
      <div className="App">
        <Navbar search={this.inputData} />
        <div className="container">
          <Switch>
            <Route
              path="/"
              render={props => (
                <Movies
                  {...props}
                  movies={this.state.movies}
                  saveMovie={this.addToFavorites}
                  setData={this.loadData}
                  checkHeart={this.state.favorites}
                />
              )}
              exact
            />
            <Route path="/movie/:id" component={Film} />
            <Route
              path="/favorites"
              render={props => (
                <Favorites
                  {...props}
                  movies={this.state.favorites}
                  saveMovie={this.addToFavorites}
                  setData={this.loadData}
                  checkHeart={this.state.favorites}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
