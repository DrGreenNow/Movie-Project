import { combineReducers } from 'redux';
import favorites from './favorites';
import movies from './movies-reducer';

export default combineReducers({ 
    favorites, 
    movies });
