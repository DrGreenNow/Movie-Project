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
    searchMovies: [],
    searchPage: 1
  };

  componentDidMount = () => {
    this.loadData();
  };

  fillTheSearch = (e) => {
    e.preventDefault();
    const movieName = e.target.elements.SearchForMovie.value;
    this.setState({ dataSearch: movieName, searchPage: 1 });
    axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=0d747b42c205fad6e960bdfef2b60881&language=en-US&query=${movieName}&page=1&`
    )
    .then(response => {
      this.setState(state => ({
        searchMovies: response.data.results,
        searchPage: state.searchPage + 1,
        isLoading: false
      }));
    });
  };

  original = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=0d747b42c205fad6e960bdfef2b60881&language=en-US&page=${
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

  search = () => {
    let movieName = this.state.dataSearch;
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=0d747b42c205fad6e960bdfef2b60881&language=en-US&query=${movieName}&page=${
          this.state.searchPage
        }&include_adult=false`
      )
      .then(response => {
        this.setState(state => ({
          searchMovies: [...state.searchMovies, ...response.data.results],
          isLoading: false
        }));
      });
  };

  loadData = () => {
    this.state.dataSearch !== "" ? this.search() : this.original();
    this.setState((prevState) => ({ page: prevState.page + 1 }));
    this.setState((prevState) => ({ searchPage: prevState.searchPage + 1 }));
  };

  render() {
    return (
      <div className="App">
        <Navbar search={this.fillTheSearch} />
        <div className="container">
          <InfiniteScroll
            dataLength={this.state.dataSearch !== "" ? this.state.searchMovies.length :this.state.movies.length}
            next={this.loadData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            <Movies movies={this.state.dataSearch !== "" ? this.state.searchMovies : this.state.movies} />
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default App;
