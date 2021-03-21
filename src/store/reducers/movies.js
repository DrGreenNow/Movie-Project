import { ADD_FILMS } from '../actionTypes';
import { TOGGLE_FAVORITES } from '../actionTypes';
import { ADD_FAVORITES } from '../actionTypes';
import { ADD_SEARCH } from '../actionTypes';
import { CLEAR_FILMS } from '../actionTypes';
import { CHANGE_LIST_TYPE } from '../actionTypes';

import { getListFilms, getFavoriteList } from '../../api/api';

const initialState = {
    movies: [],
    favorites: [],
    searchWord: '',
    listType: 'fav', // can be fav/search
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FILMS:
            console.log(action);
            return { ...state, movies: [...state.movies, ...action.films] };

        case CLEAR_FILMS:
            return { ...state, movies: [] };

        case ADD_SEARCH:
            return { ...state, searchWord: action.content };

        case TOGGLE_FAVORITES:
            let fav = [...state.favorites];
            let mov = [...state.movies];

            let movIndex = mov.findIndex((n) => n.id === action.content);
            mov[movIndex].favorite = !mov[movIndex].favorite;

            if (!mov[movIndex].favorite) {
                const favIndex = fav.findIndex((n) => n.id === action.content);
                fav.splice(favIndex, 1);
            } else {
                fav ? fav.push(mov[movIndex]) : (fav = [mov[movIndex]]);
            }

            localStorage.setItem('favoritesFilms', JSON.stringify(fav));

            return {
                ...state,
                favorites: [...fav],
                movies: [...mov],
            };

        case ADD_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites, action.content],
            };

        case CHANGE_LIST_TYPE:
            return {
                ...state,
                listType: action.content,
            };

        default:
            return state;
    }
};

export const actions = {
    addFilms: (films) => ({ type: 'ADD_FILMS', films }),
    addFavorites: (favorites) => ({ type: 'ADD_FAVORITES', favorites }),
};

export const getFilms = (searchWord, page) => {
    return (dispatch) => {
        getListFilms(searchWord, page).then((results) => {
            dispatch(actions.addFilms(results));
        });
    };
};

export const getFavoriteFilms = (page) => {
    return (dispatch) => {
        getFavoriteList(page).then((results) => {
            const filmsFromStorage = JSON.parse(
                localStorage.getItem('favoritesFilms')
            );

            filmsFromStorage &&
                results.map((film) => {
                    const isFavorite = filmsFromStorage.find((favFilm) => {
                        return favFilm.id === film.id;
                    });

                    isFavorite
                        ? (film.favorite = true)
                        : (film.favorite = false);
                    return true;
                });
            dispatch(actions.addFilms(results));
            dispatch(actions.addFavorites());
        });
    };
};

export default reducer;
