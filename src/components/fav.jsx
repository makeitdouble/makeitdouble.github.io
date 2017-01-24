import React from 'react';

class Fav extends React.Component {
    constructor(props) {
        super(props);
        this.writeToLocal = this.writeToLocal.bind(this);
        this.state = {
            condition:false
        };
     }

    componentWillMount(){
        var localFilms = [];
        var storage = localStorage.getItem("films");
        if (storage != null ){

            if (storage.includes(',')){
                localFilms = storage.split(',').map(Number);
            }else{

                if (storage == this.props.mid) {
                    this.setState( { condition : true } );
                    return;
                }
            }

            for (var i = 0; i < localFilms.length; i++) {

                if (localFilms[i] == this.props.mid) {
                    this.setState( { condition : true } );
                    return;
                }
            }
        }
    }

    writeToLocal() {

        this.setState( { condition : !this.state.condition } );
        var localFilms = [];
        var storage = localStorage.getItem("films");

        if (storage != null ){

            if (storage.includes(',')){

                localFilms = storage.split(',').map(Number);

            }else{

                if (storage == this.props.mid) {

                    localStorage.clear();
                    return;
                }

                localFilms.push(storage);
                localFilms.push(this.props.mid);
                localStorage.setItem('films', localFilms);
                return;
            }

            for (var i = 0; i < localFilms.length; i++) {

                if (localFilms[i] == this.props.mid) {
                    localFilms.splice(i, 1);
                    localStorage.setItem('films', localFilms);
                    return;
                }
            }

            localFilms.push(this.props.mid);
            localStorage.setItem('films', localFilms);
            return;
        }
        localStorage.setItem('films', this.props.mid);
    }

    render() {
        return (
            <a className={this.state.condition ? "active fav" :"fav"} onClick={this.writeToLocal} >
                <i className="material-icons">star_rate</i>
            </a>
        );
    }
}

module.exports = Fav;