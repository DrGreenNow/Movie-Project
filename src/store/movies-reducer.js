import { getSearchList, getPopularList } from '../api/api';

const initialState = {
    movies: [],
    favorites: [],
    searchWord: '',
    listType: 'fav', // can be fav/search
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_FILMS':
            return { ...state, movies: [...state.movies, ...action.films] };

        case 'CLEAR_FILMS':
            return { ...state, movies: [] };

        case 'ADD_SEARCH_INPUT_DATA':
            return { ...state, searchWord: action.data };

        case 'TOGGLE_FAVORITES':
            let fav = [...state.favorites];
            let mov = [...state.movies];

            let movIndex = mov.findIndex((n) => n.id === action.id);
            mov[movIndex].favorite = !mov[movIndex].favorite;

            if (!mov[movIndex].favorite) {
                const favIndex = fav.findIndex((n) => n.id === action.id);
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

        case 'ADD_FAVORITES':
            return {
                ...state,
                favorites: [...state.favorites, action.content],
            };

        case 'CHANGE_LIST_TYPE':
            return {
                ...state,
                listType: action.typeOfList,
            };

        default:
            return state;
    }
};

export const actions = {
    addFilms: (films) => ({ type: 'ADD_FILMS', films }),
    addFavorites: (favorites) => ({ type: 'ADD_FAVORITES', favorites }),
    clearFilms: (empty) => ({ type: 'CLEAR_FILMS', empty }),
    changeListType: (typeOfList) => ({ type: 'CHANGE_LIST_TYPE', typeOfList }),
    addSearchInputData: (data) => ({ type: 'ADD_SEARCH_INPUT_DATA', data }),
    toggleFavorites: (id) => ({ type: 'TOGGLE_FAVORITES', id }),
};

export const toggleFavorites = (id) => {
    return (dispatch) => {
        dispatch(actions.toggleFavorites(id));
    };
};

export const addSearchInputData = (searchData) => {
    return (dispatch) => {
        dispatch(actions.addSearchInputData(searchData));
    };
};

export const clearFilms = () => {
    return (dispatch) => {
        dispatch(actions.clearFilms([]));
    };
};

export const changeListType = (listType) => {
    return (dispatch) => {
        dispatch(actions.changeListType(listType));
    };
};

export const getSearchFilms = (searchWord, page) => {
    return async (dispatch) => {
        let response = await getSearchList(searchWord, page);

        dispatch(actions.addFilms(response));
    };
};

export const getPopularFilms = (page) => {
    return async (dispatch) => {
        let response = await getPopularList(page);
        const filmsFromStorage = JSON.parse(
            localStorage.getItem('favoritesFilms')
        );

        filmsFromStorage &&
            response.map((film) => {
                const isFavorite = filmsFromStorage.find((favFilm) => {
                    return favFilm.id === film.id;
                });

                isFavorite ? (film.favorite = true) : (film.favorite = false);
                return true;
            });
        dispatch(actions.addFilms(response));
        // dispatch(actions.addFavorites());
    };
};

export default reducer;
