import React from "react";
import { Link } from "react-router-dom";

import "./Films.css";

class Films extends React.Component {
  render() {
    // console.log(this.props.films);
    return (
      <div className="container">
        <div className="row">
          {this.props.films.map(film => {
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
                    <Link
                      to={{
                        pathname: `/film/${film.id}`,
                        state: { film: film.title }
                      }}
                    >
                      View film
                    </Link>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Films;
