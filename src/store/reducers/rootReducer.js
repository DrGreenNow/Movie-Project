import { combineReducers } from 'redux';
import favorites from './favorites';
import movies from './movies';

export default combineReducers({ 
    favorites, 
    movies });
