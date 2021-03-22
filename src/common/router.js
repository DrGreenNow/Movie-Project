import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Helmet } from "react-helmet";
import { Film, Favorites, Movies, Contacts, ErrorPage } from '../pages';
import Navbar from '../components/navbar/Navbar';

const LLRouter = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact>
                    <Movies />
                </Route>
                <Route path="/movie/:id" component={Film} />
                <Route path="/contacts" exact>
                    <Contacts />
                </Route>
                <Route path="/favorites" exact>
                    <Favorites />
                </Route>
                <Route path="/favorites" exact>
                    <ErrorPage />
                </Route>
            </Switch>
        </Router>
    );
};

export default LLRouter;
