import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
// import {fasHeart } from "@fortawesome/free-solid-svg-icons";

import "./Favorites.css";

const Favorites = props => {

  return (
    <div className="row">
      {props.movies.map(movie => {
        return (
          <div
            key={movie.id}
            className="col-md-4"
            style={{ marginBottom: "2rem" }}
          >
            <div className="movies_box">
              <img
                className="movies_img"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movies_text">
                <div className="movies_title_wrapper">
                  <h5 className="movies_title">{movie.title}</h5>
                </div>
                <FontAwesomeIcon
                  className="heartIcon"
                  icon={faHeart}
                  color="red"
                  onClick={e => props.saveMovie(e, movie)}
                />
                <p className="movies_subtitle">
                  Vote average: <span>{movie.vote_average}</span>
                </p>
              </div>
              <button className="movies_buttons">
                <Link
                  to={{
                    pathname: `/movie/${movie.id}`,
                    state: { movie: movie.title }
                  }}
                >
                  View details
                </Link>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
