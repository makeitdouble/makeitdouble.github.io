import React from 'react';
const { Component } = React;

/*  */
function intersperse(arr, sep) {
    if (arr.length === 0) {
        return [];
    }

    return arr.slice(1).reduce(function(xs, x) {
        return xs.concat([sep, x]);
    }, [arr[0]]);
}
/* */

class Genres extends Component {

    constructor(){
        super();
        this.clr = this.clr.bind(this);
        this.state = {
            genres: []
        };
    };

    clr(){
        localStorage.clear();
        console.log('cleared');
    }

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=0a069e40003a06848a4adbee16ef69ce&language=en-US')
            .then( (response) => {
                return response.json() })
            .then( (json) => {
                this.setState({genres: json.genres});
            });
    };

    render() {
        var movieGenres = this.props.genreg;

        var genresFiltered = this.state.genres.map((genre) => {
            for ( var i = 0; i < movieGenres.length; i++){
                if (genre.id == movieGenres[i]){
                    return (
                        <a onClick={this.clr} key={genre.id}>{genre.name}</a>
                    );
                }
            }
        });

        genresFiltered = genresFiltered.filter(function(n){ return n != undefined });
        genresFiltered = intersperse(genresFiltered, ", ");

        return(
            React.createElement('div', {className: 'genrs'}, genresFiltered)
        );
    };

};

module.exports = Genres;
