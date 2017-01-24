import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router';
require ('../css/style.css');

import Films from './components/movie-list.jsx';
import Search from './components/search.jsx';
import FavFilms from './components/fav-movie-list.jsx';
import MovieInfo from './components/movie-info.jsx';

ReactDOM.render(
    <Router history={hashHistory} >
        <Route path="/" component={Films} />
        <Route path="/movie-info/:id" component={MovieInfo} />
        <Route path="/fav" component={FavFilms} />
    </Router>,
    document.getElementById('test')
);
ReactDOM.render(
    <Search />,
    document.getElementById('search')
);
