import React, { Component } from 'react';
import { BASE_URL } from '../../consts';
import Rater from 'react-rater';
import MovieListModal from './MovieListModal';
import {
    Card,
    CardTitle,
    CardImg,
    CardBody,
    CardText,
    Badge,
    Button,
} from 'reactstrap';

class MovieListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
        }
    }

    async toggle(movie) {
        this.setState({
            modal: !this.state.modal,
        });
    }

    render() {
        const { movie } = this.props;
        const votes = parseInt((movie.vote_average/2).toFixed(1), 10);
        const poster = `${BASE_URL}/w500${movie.poster_path}`;

        return (
            <div>
                <Card className="card" key={movie.id}>
                    <CardImg top width="185" src={poster} alt={movie.title}/>
                    <CardBody className="card-title">
                        <CardTitle className="card-text">{movie.title}</CardTitle>
                        <CardText className="card-rating">
                            <Badge color="info">{votes}</Badge> 
                            <Rater total={5} rating={votes} interactive={false} />
                            <Button onClick={this.toggle.bind(this)} color="primary" className="card-button">More Info</Button>
                        </CardText>
                    </CardBody>
                </Card>
                <MovieListModal 
                    toggle={this.toggle.bind(this, movie)} 
                    movie={movie} 
                    isOpen={this.state.modal}
                    poster={poster} 
                />
            </div>
        );
    }
}

export default MovieListItem;