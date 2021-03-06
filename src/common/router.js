import React from 'react';
import { BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom';
// import { Helmet } from "react-helmet";
import {
    FilmPage,
    FavoritesPage,
    MoviesPage,
    ContactsPage,
    ErrorPage,
} from '../pages';
import Navbar from '../components/navbar/Navbar';

const LLRouter = () => {
    return (
        // <Router basename={process.env.PUBLIC_URL}>
        // temporary use HashRouter to use at github pages
        <HashRouter>
            <Navbar />
            <Switch>
                <Route path="/" exact>
                    <MoviesPage />
                </Route>
                <Route path="/movie/:id" component={FilmPage} />
                <Route path="/contacts" exact>
                    <ContactsPage />
                </Route>
                <Route path="/favorites" exact>
                    <FavoritesPage />
                </Route>
                <Route>
                    <ErrorPage />
                </Route>
            </Switch>
        {/* </Router> */}
        </HashRouter>
    );
};

export default LLRouter;
