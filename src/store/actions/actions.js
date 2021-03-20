import { ADD_FILMS } from '../actionTypes';
import { ADD_FAVORITES } from '../actionTypes';
import { TOGGLE_FAVORITES } from '../actionTypes';
import { ADD_SEARCH } from '../actionTypes';
import { CLEAR_FILMS } from '../actionTypes';
import { CHANGE_LIST_TYPE } from '../actionTypes';

export const addFilms = (content) => ({
    type: ADD_FILMS,
    content,
});

export const addFavorites = (content) => ({
    type: ADD_FAVORITES,
    content,
});

export const toggleFavorites = content => ({
    type: TOGGLE_FAVORITES,
    content,
});

export const addSearch = content => ({
    type: ADD_SEARCH,
    content,
});

export const clearFilms = content => ({
    type: CLEAR_FILMS,
    content,
});

export const changeListType = content => ({
    type: CHANGE_LIST_TYPE,
    content,
});
