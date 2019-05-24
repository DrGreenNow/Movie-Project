import React from "react";
import { Link } from "react-router-dom";

import "./Film.css";

class Film extends React.Component {
  state = {
    activeFilm: [],
    recommendedMovies: []
  };

  componentDidMount = async () => {
    const id = this.props.match.params.id;
    const req = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=0d747b42c205fad6e960bdfef2b60881&language=en-US`
    );
    const res = await req.json();
    this.setState({ activeFilm: res });
    const recomend = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=0d747b42c205fad6e960bdfef2b60881&language=en-US&page=1`
    );
    const resRecomend = await recomend.json();
    this.setState({ recommendedMovies: resRecomend });
    console.log(this.state.recommendedMovies);
  };

  render() {
    const film = this.state.activeFilm;

    return (
      <div className="container">
        {film.genres !== undefined && (
          <div className="active-recipe">
            <h3 className="active-recipe__title">{film.title}</h3>
            <h4 className="active-recipe__publisher">
              <span>{film.original_title}</span>(original title)
            </h4>
            <div className="wrapperWidth">
              <img
                className="active-recipe__img"
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                alt={film.title}
              />
            </div>
            <div className="wrapperWidth">
              <p>{film.overview}</p>
              <p>Genres:</p>
              <ul>
                {film.genres.map(item => {
                  return <li key={item.id}>{item.name}</li>;
                })}
              </ul>
            </div>
            <p className="active-recipe__website">
              Website:{" "}
              <span>
                <a href={film.homepage}>{film.homepage}</a>
              </span>
            </p>
            <button className="active-recipe__button">
              <Link to="/">Go Home</Link>
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Film;
