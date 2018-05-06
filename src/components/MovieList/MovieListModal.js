import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Badge,
    Button,
} from 'reactstrap';
import Rater from 'react-rater';
import moment from 'moment';
import YouTube from 'react-youtube';
import axios from 'axios';


class MovieListModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videoId: '',
        };

    }

    componentDidMount() {
        if(!this.props.movie) return;
        this.fetchVideoId(this.props.movie.id);
    }

    async fetchVideoId(movieId) {
        let req = await axios.get(`http://localhost:3000/videoid/${movieId}`);
        this.setState({ videoId: req.data });
    }

    render() {
        const { poster, movie, isOpen, toggle } = this.props;
        const { videoId } = this.state;

        const opts = {
            height: '250vh',
            width: '100%',
            playerVars: {
                autoplay: 1
            },
        };

        return (
            <Modal isOpen={isOpen} toggle={toggle} backdrop={true}>
                <ModalHeader toggle={toggle}>{movie.title}</ModalHeader>
                <ModalBody className="modal-promo">
                    <img width="382" src={poster} alt={movie.title} />
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
                    <div className="modal-overview">
                        <div><strong>Trailer:</strong></div>
                        <div className="modal-youtube">
                            <YouTube 
                                videoId={videoId}
                                opts={opts}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default MovieListModal;