import React from 'react';
import Movie from './movie.jsx';
const { Component } = React;


class FavFilms extends Component {

    constructor(){
        super();
        this.state = {
            fav: [],
            genrs: []
        };
    };

    componentDidMount() {
        var ss = [];
        var test = localStorage.getItem("films");
        console.log(test);
        if (test != null){
            ss = test.split(',').map(Number);
            ss.map((f)=>{
                fetch('https://api.themoviedb.org/3/movie/' + f + '?api_key=0a069e40003a06848a4adbee16ef69ce&language=en-US')
                    .then( (response) => {
                        return response.json() })
                    .then( (json) => {
                        this.setState({fav: this.state.fav.concat([json])});
                    });
            })
        }
    };


    render() {


        if (this.state.fav){
            var films = this.state.fav.map( (film) => {

                var genres = film.genres.map( (genre) => {
                    return genre.id});

                var movieStyle = {
                    backgroundImage: 'url(https://image.tmdb.org/t/p/w185/' + film.poster_path + ')'
                };

                return (
                    <div className="movie" style={movieStyle}>
                        <Movie title={film.title} lnk={film.id } genres={genres}/>
                    </div>
                );
            });
        };

        return(
            React.createElement('div', null, ...films)
        );
    };
};

module.exports = FavFilms;