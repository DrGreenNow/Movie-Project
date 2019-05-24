import React from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import "./App.css";
// import Films from "./components/Films";

class App extends React.Component {
  state = {
    films: [],
    isLoading: true,
    page: 1
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=0d747b42c205fad6e960bdfef2b60881&language=en-US&page=${this.state.page}`
      )
      .then(response => {
        this.setState(state => ({
          films: [...state.films, ...response.data.results],
          page: state.page + 1,
          isLoading: false
        }));
        console.log(this.state.page);
        console.log(this.state.films.length);
      });
  }
 
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Films</h1>
        </header>
        {/* <Films films={this.state.films} /> */}
        <div>
        <InfiniteScroll
          dataLength={this.state.films.length}
          next={this.loadData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.films.map(film => {
            return (
              <div
                key={film.id}
                className="col-md-4"
                style={{ marginBottom: "2rem" }}
              >
                <div className="recipes__box">
                  <img
                    className="films__img"
                    src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                    alt={film.title}
                  />
                  <div className="recipe__text">
                    <h5 className="recipes__title">
                      {film.title.length < 17
                        ? `${film.title}`
                        : `${film.title.substring(0, 17)}...`}
                    </h5>
                    <p className="recipes__subtitle">
                      Vote average: <span>{film.vote_average}</span>
                    </p>
                  </div>
                  <button className="recipe_buttons">
                  </button>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>

        </div>
      </div>
    );
  }
}

export default App;
