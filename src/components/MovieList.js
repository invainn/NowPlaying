import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import * as actions from '../actions/actions';
import {
    Panel,
} from 'react-bootstrap';

class MovieList extends Component {
    renderMovieCard(movie) {
        return (
            <Panel key={movie.id}>
                <Panel.Heading>{movie.title}</Panel.Heading>
                <Panel.Body>
                    {movie.overview}
                </Panel.Body>
            </Panel>
        );
    }

    componentDidMount() {
        this.props.fetchMovieList();
    }

    render() {
        const { movies } = this.props;
        console.log(movies);

        if(movies.length === 0) {
            return (
                <div className="react-loading">
                    <ReactLoading type="bubbles" color="#555555" height={75} width={75} />
                </div>
            );
        }

        return(
            <div>
                {movies.map((movie) => {
                    return this.renderMovieCard(movie);
                })}
            </div>
        );
    }
}

function mapStateToProps({ movies: { movies } }) {
    return { movies };
}

export default connect(mapStateToProps, actions)(MovieList);