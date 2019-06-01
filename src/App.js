import React from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import "./App.css";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";

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
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=0d747b42c205fad6e960bdfef2b60881&language=en-US&query=${movieName}&page=1`
        )
        .then(response => {
          this.setState({
            movies: response.data.results,
            page: 2,
            isLoading: false
          });
        });
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
    console.log(saveMovie);

    if (this.state.favorites.find(i => i === saveMovie) === undefined) {
      await this.setState(state => ({
        favorites: [...this.state.favorites, saveMovie]
      }))
      const favoritesFilms = JSON.stringify(this.state.favorites);
      localStorage.setItem("favoritesFilms", favoritesFilms);
    };


  };

  render() {
    return (
      <div className="App">
        <Navbar search={this.inputData} />
        <div className="container">
          <InfiniteScroll
            dataLength={this.state.movies.length}
            next={this.loadData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            <Movies
              movies={this.state.movies}
              saveMovie={this.addToFavorites}
            />
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default App;
