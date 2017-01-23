import React from 'react';
import Movie from './movie.jsx';
const { Component } = React;

class Films extends Component {

    constructor(){
        super();
        this.page = this.page.bind(this);
        this.state = {
            films: [],
            page: 1
        };
    };

    page(e){
        if (e.target.innerHTML == 'previous' && this.state.page-1 > 0){
            this.setState({page:--this.state.page});
        }else if (e.target.innerHTML == 'Next' && this.state.page+1 < 500){
            this.setState({page:++this.state.page});
        }
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=0a069e40003a06848a4adbee16ef69ce&language=en-US&page='+this.state.page)
            .then( (response) => {
                return response.json() })
            .then( (json) => {
                this.setState({films: json.results});
            });
    }
    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=0a069e40003a06848a4adbee16ef69ce&language=en-US&page='+this.state.page)
            .then( (response) => {
                return response.json() })
            .then( (json) => {
                this.setState({films: json.results});
            });
    };

    render() {
       /* var pages = this.page(this.state.pages);*/
        var films = this.state.films.map( (film) => {
            var movieStyle = {
                backgroundImage: 'url(https://image.tmdb.org/t/p/w185/' + film.poster_path + ')'
            };
            return (
                <div className="movie" key={film.id}  style={movieStyle}>
                    <Movie title={film.title} lnk={film.id} genres={film.genre_ids}/>
                </div>
            );
        });
        return(
            <div>
                <div>{films}</div>
                <div onClick={this.page} className="btn prev">previous</div><div onClick={this.page} className="btn next">Next</div>
            </div>
        );
    };
};

module.exports = Films;