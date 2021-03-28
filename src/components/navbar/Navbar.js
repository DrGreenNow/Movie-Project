import React, { useState } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { InputBase, IconButton, Drawer, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import MovieOutlinedIcon from '@material-ui/icons/MovieOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';
import { connect } from 'react-redux';

import { clearFilms, addSearchInputData } from '../../store/movies-reducer';

import './Navbar.scss';

const Navbar = ({ addSearchInputData, clearFilms }) => {
    const [data, setData] = useState(''),
        [open, setOpen] = useState(false);

    let history = useHistory();

    const search = () => {
        addSearchInputData(data);
        setData('');
        clearFilms();
        history.push(`/`);
    };

    const menu = [
        {
            name: 'Films',
            to: '/',
            icon: <MovieOutlinedIcon />,
        },
        {
            name: 'Favorites',
            to: '/favorites',
            icon: <FavoriteBorderOutlinedIcon />,
        },
        {
            name: 'Contacts',
            to: '/contacts',
            icon: <ContactMailOutlinedIcon />,
        },
    ];

    const toggleDrawer = (open) => (event) => {
        setOpen(open);
    };

    const list = menu.map((item, i) => (
        <Link
            key={i}
            onClick={toggleDrawer(false)}
            to={item.to}
            onKeyDown={toggleDrawer(false)}
            className="header__drawer-item">
            {item.name}
            {item.icon}
        </Link>
    ));

    return (
        <nav className="header">
            <div className="header__wrapper">
                <div className="header__menu-container">
                    <IconButton
                        onClick={toggleDrawer(true)}
                        color="inherit"
                        aria-label="open drawer"
                        edge="start">
                        <MenuIcon className="header__menu-icon" />
                    </IconButton>
                    <NavLink to="/" className="header__title" href="#">
                        Movies DB
                    </NavLink>
                </div>
                <div className="header__search-container">
                    <Paper
                        component="form"
                        className="header__form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            search();
                        }}>
                        <InputBase
                            className="header__search-input"
                            placeholder="Search Films"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={(e) => setData(e.target.value)}
                            value={data}
                        />
                        <IconButton
                            className="header__search-button"
                            onClick={() => search()}
                            aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <div className="header__favorites-container">
                        <NavLink
                            to="/favorites"
                            className="header__favorites"
                            href="#">
                            Favorites
                        </NavLink>
                    </div>
                </div>
                <Drawer
                    anchor={'left'}
                    open={open}
                    onClose={toggleDrawer(false)}
                    className="header__drawer">
                    <span className="header__drawer-heading">Movies</span>
                    {list}
                </Drawer>
            </div>
        </nav>
    );
};

export default connect(null, {
    addSearchInputData,
    clearFilms,
})(Navbar);
