import React, { Component } from 'react';
import { BASE_URL } from '../consts';
import Rater from 'react-rater';
import moment from 'moment'
import {
    Card,
    CardTitle,
    CardImg,
    CardBody,
    CardText,
    Badge,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
} from 'reactstrap';

class MovieListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
        }
    }

    toggle(id) {
        this.setState({
            modal: !this.state.modal,
        });
    }

    renderModal(movie, poster) {

        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)} backdrop={true}>
                <ModalHeader toggle={this.toggle.bind(this)}>{movie.title}</ModalHeader>
                <ModalBody className="modal-promo">
                    <img src={poster} alt={movie.title} />
                </ModalBody>
                <ModalBody>
                    <Badge color="info" className="modal-badge">{(movie.vote_average/2).toFixed(1)}</Badge> 
                    <Rater total={5} rating={(movie.vote_average/2).toFixed(1)} interactive={false} />
                    <div className="modal-overview">
                        Release Date: {moment(new Date(movie.release_date)).format('MMMM Do, YYYY')}
                    </div>
                    <div className="modal-overview">
                        <div><strong>Description:</strong></div>
                        {movie.overview}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }

    render() {
        const { movie } = this.props;
        const poster = `${BASE_URL}/w185${movie.poster_path}`;

        return (
            <div>
                <Card className="card" key={movie.id}>
                    <CardImg top width="185" src={poster} alt={movie.title}/>
                    <CardBody className="card-title">
                        <CardTitle className="card-text">{movie.title}</CardTitle>
                        <CardText className="card-rating">
                            <Badge color="info">{(movie.vote_average/2).toFixed(1)}</Badge> 
                            <Rater total={5} rating={(movie.vote_average/2).toFixed(1)} interactive={false} />
                            <Button onClick={this.toggle.bind(this)} color="primary" className="card-button">More Info</Button>
                        </CardText>
                    </CardBody>
                </Card>
                {this.renderModal(movie, poster)}
            </div>
        );
    }
}

export default MovieListItem;