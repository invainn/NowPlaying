import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { fetchMovieList } from '../../actions/actions';
import MovieListItem from './MovieListItem';

class MovieList extends Component {
    componentDidMount() {
        this.props.fetchMovieList();
    }

    render() {
        let { movies } = this.props;

        if(!movies || movies.length === 0) {
            return (
                <div className="react-loading">
                    <ReactLoading type="bubbles" color="#FFFFFF" height={75} width={75} />
                </div>
            );
        }

        movies = movies.sort((a, b) => {
            if(a.vote_average > b.vote_average) return -1;
            if(a.vote_average < b.vote_average) return 1;
            return 0;
        });

        return(
            <div className="card-container">
                {movies.map((movie) => {
                    return (
                        <MovieListItem key={movie.id} movie={movie} />
                    );
                })}
            </div>
        );
    }
}

function mapStateToProps({ movies: { movies } }) {
    return { movies };
}

export default connect(mapStateToProps, { fetchMovieList })(MovieList);