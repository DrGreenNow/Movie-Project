import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Image from '../../static/media/404.png';

import './ErrorPage.scss';

const ErrorPage = () => {
    return (
        <div className="error-wrapper">
            <img src={Image} alt="error" />
            <h3 className="error__title">"Page not found"</h3>
            <p className="error__text">404</p>
            <Link to={'/'} className="error__link">
                <Button
                    variant="contained"
                    color="secondary"
                    customClasses="ll-btn__link">
                    'Return to homepage'
                </Button>
            </Link>
        </div>
    );
};

export default ErrorPage;
