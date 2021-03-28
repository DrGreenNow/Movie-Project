import React from 'react';
import { connect } from 'react-redux';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { toggleFavorites } from '../../store/movies-reducer';

import './Heart.scss';

const Heart = ({ favorite, toggleFavorites, id }) => {
    return favorite ? (
        <FavoriteIcon
            className="movie__heart-icon-filled"
            onClick={() => toggleFavorites(id)}
        />
    ) : (
        <FavoriteBorderIcon
            className="movie__heart-icon"
            onClick={() => toggleFavorites(id)}
        />
    );
};

export default connect(null, { toggleFavorites })(Heart);
