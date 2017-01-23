import React from 'react';
require ('./movie-info.css');

import Genres from './genres.jsx';
const { Component } = React;
import Fav from './fav.jsx';

class MovieInfo extends Component {
    constructor(){
        super();
        this.state = {
            filmInfo: [],
            genrs:[]
        };
    };

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/' + this.props.params.id + '?api_key=0a069e40003a06848a4adbee16ef69ce&language=en-US')
            .then( (response) => {
                return response.json() })
            .then( (json) => {
                this.setState({filmInfo: json, genrs: json.genres});
            });
    };

   render() {
       var genres = this.state.genrs.map( (genre) => {
           return genre.id});

       return(
           <div>
               <div className="minfo">
               <h1>{this.state.filmInfo.original_title}</h1>
               <div className="poster">
                   <Fav mid={this.props.params.id} />
                   <img src={'https://image.tmdb.org/t/p/w500/' + this.state.filmInfo.poster_path} alt=""/></div>
               <table className="info">
                   <tbody>
                       <tr>
                           <td className="first">date</td>
                           <td>{this.state.filmInfo.release_date}</td>
                       </tr>
                       <tr>
                           <td className="first">genres</td>
                           <td><Genres className="genrs" genreg={genres} /></td>
                       </tr>
                       <tr>
                           <td className="first">money</td>
                           <td>${this.state.filmInfo.budget}</td>
                       </tr>
                   </tbody>
               </table>
               </div>
               <div className="overview">{this.state.filmInfo.overview}</div>
           </div>
       );
    };

};

module.exports = MovieInfo;
