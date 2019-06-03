import React from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./Movies.css";
import Heart from "./Heart";

const Favorites = props => {
  return (
    <InfiniteScroll
      dataLength={props.movies.length}
      next={props.setData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
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
                  <Heart
                    onClick={e => props.saveMovie(e, movie)}
                    checkfav={props.checkHeart}
                    movie={movie}
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
    </InfiniteScroll>
  );
};

export default Favorites;
