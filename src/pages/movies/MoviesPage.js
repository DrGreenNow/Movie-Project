import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {
    Fab,
    Toolbar,
    Zoom,
    useScrollTrigger,
    makeStyles,
} from '@material-ui/core';

import {
    getSearchFilms,
    getPopularFilms,
    clearFilms,
    changeListType,
} from '../../store/movies-reducer';
import MovieItem from './MovieItem';

// import {
//     getFilms,
//     getSearchWord,
//     getListType,
// } from '../../store/movie-selectors';

import './MoviesPage.scss';

const MoviesPage = ({
    films,
    changeListType,
    searchWord,
    listType,
    clearFilms,
    getSearchFilms,
    getPopularFilms,
}) => {
    const [page, setPage] = useState(1);

    useEffect(() => {
        clearFilms();
        // loadSearch();
        loadPopular();
    }, []);

    useEffect(() => {
        if (searchWord) {
            setPage(1);
            changeListType('search');
            loadSearch();
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

    const loadSearch = () => {
        getSearchFilms(searchWord, page);
        setPage(page + 1);
    };

    const loadPopular = () => {
        getPopularFilms(page);
        setPage(page + 1);
    };

    return (
        <>
            <Toolbar id="back-to-top-anchor" />
            <InfiniteScroll
                dataLength={films.length}
                next={listType === 'fav' ? loadPopular : loadSearch}
                hasMore={true}
                loader={<h4>Loading...</h4>}>
                <div className="movies__row">
                    {films.map((movie) => {
                        return <MovieItem movie={movie} />;
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

// const mapStateToProps = (state) => {
//     return {
//         films: getFilms(state),
//         searchWord: getSearchWord(state),
//         listType: getListType(state),
//     };
// };

export default connect(mapStateToProps, {
    changeListType,
    clearFilms,
    getSearchFilms,
    getPopularFilms,
})(MoviesPage);
