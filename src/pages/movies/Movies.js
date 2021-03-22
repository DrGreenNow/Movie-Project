import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';

import { changeListType } from '../../store/actions/actions';
import Heart from '../../components/heart/Heart';
import { getFilms, getFavoriteFilms, clearFilms } from '../../store/reducers/movies';

import './Movies.scss';

const Movies = ({
    films,
    changeListType,
    searchWord,
    listType,
    clearFilms,
    getFilms,
    getFavoriteFilms,
}) => {
    const [page, setPage] = useState(1);

    let history = useHistory();

    useEffect(() => {
        clearFilms();
        loadLookingFilms();
        loadFavoriteFilms();
    }, []);

    useEffect(() => {
        if (searchWord) {
            setPage(1);
            changeListType('search');
            loadLookingFilms();
        }
    }, [searchWord]);

    const useStyles = makeStyles((theme) => ({
        root: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    }));

    function ScrollTop({ children, window }) {
        const classes = useStyles();
        const trigger = useScrollTrigger({
            target: window ? window() : undefined,
            disableHysteresis: true,
            threshold: 100,
        });

        const handleClick = (event) => {
            const anchor = (
                event.target.ownerDocument || document
            ).querySelector('#back-to-top-anchor');

            if (anchor) {
                anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };

        return (
            <Zoom in={trigger}>
                <div
                    onClick={handleClick}
                    role="presentation"
                    className={classes.root}>
                    {children}
                </div>
            </Zoom>
        );
    }

    const loadLookingFilms = () => {
        getFilms(searchWord, page);
        setPage(page + 1);
    };

    const loadFavoriteFilms = () => {
        getFavoriteFilms(page);
        setPage(page + 1);
    };

    return (
        <>
            <Toolbar id="back-to-top-anchor" />
            <InfiniteScroll
                dataLength={films.length}
                next={listType === 'fav' ? loadFavoriteFilms : loadLookingFilms}
                hasMore={true}
                loader={<h4>Loading...</h4>}>
                <div className="movies__row">
                    {films.map((movie) => {
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
                                                <span>
                                                    {movie.vote_average}
                                                </span>
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
            <ScrollTop>
                <Fab
                    color="secondary"
                    size="small"
                    aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        films: state.movies.movies,
        searchWord: state.movies.searchWord,
        listType: state.movies.listType,
    };
};

export default connect(mapStateToProps, {
    changeListType,
    clearFilms,
    getFilms,
    getFavoriteFilms,
})(Movies);
