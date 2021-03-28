import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarIcon from '@material-ui/icons/Star';

import { getFilm, getRecomended } from '../../api/api';

import './FilmPage.scss';

const Film = () => {
    const [film, setfilm] = useState([]),
        [recommendedMovies, setRecommendedMovies] = useState([]);

    let history = useHistory();
    let { id } = useParams();

    const getData = async () => {
        getFilm(id).then((results) => {
            setfilm(results);
        });

        getRecomended(id).then((results) => {
            setRecommendedMovies(results.slice(0, 3));
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const imageClick = (id) => {
        history.push(`/movie/${id}`);
        window.location.reload(); // TODO
    };

    return (
        film.genres !== undefined && (
            <div className="movie">
                <div className="movie__header">
                    <div className="movie__title-container">
                        <span className="movie__title">{film.title}</span>
                        <span className="movie__subtitle">
                            Original title: {film.original_title}
                        </span>
                    </div>
                    <div className="movie__rating-container">
                        <span className="movie__rating-text">RATING</span>
                        <span className="movie__rating-average-container">
                            <StarIcon className="movie__icon-star" />
                            <span className="movie__rating-average">
                                {film.vote_average}
                            </span>
                            /10
                        </span>
                        <span className="movie__rating-count">
                            ({film.vote_count})
                        </span>
                    </div>
                </div>
                <div className="movie__content-container">
                    <aside className="movie__aside">
                        <img
                            className="movie__img"
                            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                            alt={film.title}
                        />
                        <div className="movie__genre-container">
                            {film.genres.map((item) => {
                                return (
                                    <span
                                        className="movie__genre"
                                        key={item.id}>
                                        {item.name}
                                    </span>
                                );
                            })}
                        </div>
                    </aside>
                    <article className="movie__main">
                        <FavoriteBorderIcon className="movie__heart-icon" />
                        <p>{film.overview}</p>
                        {film.homepage && (
                            <a
                                href={film.homepage}
                                className="movie__website-link">
                                <p>| Movie website ></p>
                            </a>
                        )}
                    </article>
                </div>
                <div className="movie__footer">
                    <span className="movie__recom-header">RECOMMENDATIONS</span>
                    {recommendedMovies !== undefined && (
                        <div className="movie__recom">
                            {recommendedMovies.map((item) => {
                                return (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                                        alt={item.title}
                                        key={item.id}
                                        className="movie__recom-img"
                                        onClick={() => imageClick(item.id)}
                                    />
                                );
                            })}
                        </div>
                    )}

                    <Button
                        variant="contained"
                        color="secondary"
                        className="movie__return-button"
                        onClick={() => history.push(`/`)}>
                        TO START PAGE
                    </Button>
                </div>
            </div>
        )
    );
};

export default Film;
