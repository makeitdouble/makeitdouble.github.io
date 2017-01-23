import React from 'react';
require ('./movie.css');
const { Component } = React;
import {Link} from 'react-router';

import Genres from './genres.jsx';
import Fav from './fav.jsx';

class Movie extends Component {

    constructor(props) {
        super(props);
        this.details = this.details.bind(this);
    }

    details(e) {
        if (e.target == e.currentTarget){
            window.location = '/public/#/movie-info/'+ this.props.lnk;
        }
    }

   render() {
        return(
            <div className="wrapper" onClick={this.details}>
                    <div className="title">{this.props.title}</div>
                    <Fav mid={this.props.lnk} />
                    <Genres className="genres" genreg={this.props.genres}/>
            </div>
        );
    };
}

module.exports = Movie;








