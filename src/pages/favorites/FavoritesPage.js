import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';

import Heart from '../../components/heart/Heart';

import '../movies/MoviesPage.scss';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    let history = useHistory();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const filmsFromStorage = JSON.parse(
            localStorage.getItem('favoritesFilms')
        );
        if (filmsFromStorage !== null) {
            setFavorites(filmsFromStorage);
        }
    };

    return (
        <InfiniteScroll
            dataLength={favorites.length}
            next={loadData}
            hasMore={true}>
            <div className="movies__row">
                {favorites.map((movie) => {
                    return (
                        <div key={movie.id} className="movies">
                            <div className="movies__box">
                                <img
                                    className="movies__img"
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <div className="movies__text-container">
                                    <p className="movies__title">
                                        {movie.title}
                                    </p>
                                    <div className="movies__vote-container">
                                        <span className="movies__subtitle">
                                            Vote average:
                                            <span>{movie.vote_average}</span>
                                        </span>
                                        <Heart
                                            favorite={movie.favorite}
                                            id={movie.id}
                                        />
                                    </div>
                                </div>

                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className="movie__button"
                                    onClick={() =>
                                        history.push(`/movie/${movie.id}`)
                                    }>
                                    View details
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </InfiniteScroll>
    );
};

export default Favorites;
