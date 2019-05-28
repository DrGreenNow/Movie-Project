import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

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
    let resRecomendTrim = resRecomend.results.slice(0, 3);
    this.setState({ recommendedMovies: resRecomendTrim });
  };

  render() {
    const film = this.state.activeFilm;
    const reccomend = this.state.recommendedMovies;

    return (
      <div className="container">
        {film.genres !== undefined && (
          <div className="active-movie">
            <header className="active-movie-header">
              <h3 className="active-movie-title">{film.title}</h3>
            </header>
            <aside className="aside">
              <img
                className="active-movie-img"
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                alt={film.title}
              />
            </aside>
            <article className="main">
              <h6 className="active-movie-publisher">
                {film.original_title} <span>(original title)</span>{" "}
                <FontAwesomeIcon className="heartIcon" icon={faHeart} />
              </h6>
              <p>{film.overview}</p>
              <p>
                Genres:{" "}
                {film.genres.map(item => {
                  return <span key={item.id}>{item.name}, </span>;
                })}
              </p>
              <p className="active-movie-website">
                Website:{" "}
                <span>
                  <a href={film.homepage}>{film.homepage}</a>
                </span>
              </p>
            </article>
            <footer className="active-movie-footer">
              <h5>RECOMMENDATIONS</h5>
              <div>
                {reccomend !== undefined && (
                  <div className="recomWrapper">
                    {reccomend.map(item => {
                      return (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${
                            item.poster_path
                          }`}
                          alt={item.title}
                          key={item.id}
                          className = "recomImg"
                        />
                      );
                    })}
                  </div>
                )}
              </div>
              <button className="active-movie-button">
                <Link to="/">TO START PAGE</Link>
              </button>
            </footer>
          </div>
        )}
      </div>
    );
  }
}

export default Film;
