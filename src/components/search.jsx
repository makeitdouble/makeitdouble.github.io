import React from 'react';
const { Component } = React;

class Search extends Component {
    constructor(){
        super();
        this.state = {
            hide: true,
            films: [],
            query: null
        };
        this.search = this.search.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
    };
    
    componentDidMount() {
        
    };

    hideDialog(){
        this.setState({hide: true});
    };

    search(e){
        if (e.target.value.length > 2){
            this.setState({hide: false});
            fetch('https://api.themoviedb.org/3/search/movie?api_key=0a069e40003a06848a4adbee16ef69ce&language=en-US&query='+ e.target.value +'&page=1&include_adult=false')
                .then( (response) => {
                    return response.json() })
                .then( (json) => {
                    this.setState({films: json.results});
                });
        }else{
            this.setState({hide: true});
        }
    };
    
   render() {


       var films = this.state.films.map( (film) => {
           return (
               <div className="searchMovie" key={film.id} >
                   <a href={'/public/#/movie-info/' + film.id} onClick={this.hideDialog}>{film.original_title}</a>
               </div>
           );
       });

       return(
           <div>
               <input type="text" onChange={this.search}  onFocus={this.search}/>
               <div className={this.state.hide ? 'dialog' : 'dialog show'} onBlur={this.hideDialog}>{films}</div>
           </div>
       );
    };

};

module.exports = Search;
