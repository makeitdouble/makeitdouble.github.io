import React from 'react';
require ('./movie-info.css');
import Movie from './movie.jsx';
import Genres from './genres.jsx';
const { Component } = React;
import Fav from './fav.jsx';

class MovieInfo extends Component {
    constructor(){
        super();
        this.state = {
            id: null,
            filmInfo: [],
            genrs:[],
            similar: [],
            reccomend: []
        };
        this.upd = this.upd.bind(this);
    };

    componentWillMount(){
        this.setState({id: this.props.params.id});
    }
    componentDidMount() {
        
        this.setState({id:this.props.params.id});
        fetch('https://api.themoviedb.org/3/movie/' + this.state.id + '?api_key=0a069e40003a06848a4adbee16ef69ce&language=en-US')
            .then( (response) => {
                return response.json() })
            .then( (json) => {
                this.setState({filmInfo: json, genrs: json.genres});
            });

        fetch('https://api.themoviedb.org/3/movie/'+ this.state.id +'/recommendations?api_key=0a069e40003a06848a4adbee16ef69ce&language=en-US&page=1')
            .then( (response) => {
                return response.json() })
            .then( (json) => {
                this.setState({reccomend: json.results.splice(0,5)});
            });

        fetch('https://api.themoviedb.org/3/movie/'+ this.state.id +'/similar?api_key=0a069e40003a06848a4adbee16ef69ce&language=en-US&page=1')
            .then( (response) => {
                return response.json() })
            .then( (json) => {
                this.setState({similar: json.results.splice(0,5)});
            });
    };

    upd(){
    }

   render() {
       var genres = this.state.genrs.map( (genre) => {
           return genre.id});
       var reccomend = this.state.reccomend.map( (film) => {
           var movieStyle = {
               backgroundImage: 'url(https://image.tmdb.org/t/p/w185/' + film.poster_path + ')'
           };
           return (
               <div className="movie" key={film.id}  style={movieStyle}>
                   <Movie title={film.title} lnk={film.id} genres={film.genre_ids}/>
               </div>
           );
       });
       var similar = this.state.similar.map( (film) => {
           var movieStyle = {
               backgroundImage: 'url(https://image.tmdb.org/t/p/w185/' + film.poster_path + ')'
           };
           return (
               <div className="movie" key={film.id}  style={movieStyle} onClick={this.upd}>
                   <Movie title={film.title} lnk={film.id} genres={film.genre_ids} />
               </div>
           );
       });

       return(
           <div>
               <div className="minfo">
                   <h1>{this.state.filmInfo.original_title}</h1>
                   <div className="poster">
                       <Fav mid={this.props.params.id} />
                       <img src={'https://image.tmdb.org/t/p/w500/' + this.state.filmInfo.poster_path} alt=""/>
                   </div>
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
               <div className="recommend">
                   <h1>Recommendation</h1>
                   {reccomend}
               </div>
               <div className="similar">
                   <h1>Similar</h1>
                   {similar}
               </div>
           </div>
       );
    };

};

module.exports = MovieInfo;
