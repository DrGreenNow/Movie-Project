import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import Heart from '../../components/heart/Heart';
import { imageLoading } from '../../common/utils';
import BlankImage from '../../static/media/no-image-available.jpg';

const MovieItem = (movie) => {
    const [loading, setLoading] = useState(true),
        [itemHasImg, setItemHasImg] = useState(false);

    let history = useHistory();

    const imgUrl = `https://image.tmdb.org/t/p/w500${movie.movie.poster_path}`;

    useEffect(() => {
        imageLoading(
            imgUrl,
            () => {
                setLoading(false);
                setItemHasImg(true);
            },
            () => setLoading(false)
        );
    }, []);

    return !loading ? (
        <div key={movie.movie.id} className="movies">
            <div className="movies__box">
                <img
                    className="movies__img"
                    src={
                        itemHasImg
                            ? `https://image.tmdb.org/t/p/w500${movie.movie.poster_path}`
                            : BlankImage
                    }
                    alt={movie.movie.title}
                />
                <div className="movies__text-container">
                    <p className="movies__title">{movie.movie.title}</p>
                    <div className="movies__vote-container">
                        <span className="movies__subtitle">
                            Vote average:
                            <span>{movie.movie.vote_average}</span>
                        </span>
                        <Heart
                            favorite={movie.movie.favorite}
                            id={movie.movie.id}
                        />
                    </div>
                </div>

                <Button
                    variant="contained"
                    color="secondary"
                    className="movie__button"
                    onClick={() => history.push(`/movie/${movie.movie.id}`)}>
                    View details
                </Button>
            </div>
        </div>
    ) : (
        <CircularProgress />
    );
};

export default MovieItem;
