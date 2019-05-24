import React from "react";
import axios from "axios";

import "./App.css";
import Films from "./components/Films";

class App extends React.Component {
  state = {
    films: [],
    genres: []
  };

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=0d747b42c205fad6e960bdfef2b60881&language=en-US&page=1"
      )
      .then(response => {
        this.setState({ films: response.data.results });
        console.log(this.state.films);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Films</h1>
        </header>
        <Films films={this.state.films} />
      </div>
    );
  }
}

export default App;
