import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import * as actions from '../actions/actions';
import MovieListItem from './MovieListItem';

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            selectedMovie: 0
        };
    }

    componentDidMount() {
        this.props.fetchMovieList();
    }

    render() {
        let { movies } = this.props;
        movies = movies.sort((a, b) => {
            if(a.vote_average > b.vote_average) return -1;
            if(a.vote_average < b.vote_average) return 1;
            return 0;
        });

        if(movies.length === 0) {
            return (
                <div className="react-loading">
                    <ReactLoading type="bubbles" color="#555555" height={75} width={75} />
                </div>
            );
        }

        return(
            <div className="card-container">
                {movies.map((movie) => {
                    return (
                        <MovieListItem movie={movie} />
                    );
                })}
            </div>
        );
    }
}

function mapStateToProps({ movies: { movies } }) {
    return { movies };
}

export default connect(mapStateToProps, actions)(MovieList);