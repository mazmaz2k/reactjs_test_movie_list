import React,{Component } from 'react';

// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Modal } from 'react-bootstrap';



export class SModal extends Component {
    
    constructor(props) {
        super(props);
        // console.log("ssssss", props.movie);
        this.state = {
            movieTitle: props.movie.movieTitle,
            director: props.movie.director,
            runtime: props.movie.runtime,
            genre: props.movie.genre,
            year: props.year,
            valTitle: false

        };
    }

    setValues(movieTitle,director,runtime, genre, year){
        

    }



        render() {
            console.log(this.props);
            return (
                <Modal show={this.props.isOpen} onHide={this.props.toggle}>
                    <Modal.Header closeButton ><b>{this.props.movie.movieTitle}</b></Modal.Header>
                    <Modal.Body>
                        {/* <p>Title: {this.props.movie.movieTitle}</p> */}
                        <p>Year: {this.props.movie.year}</p>
                        <p>Runtime: {this.props.movie.runtime} min</p>
                        <p>Genre: {this.props.movie.genre}</p>
                        <p>Director: {this.props.movie.director}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="primary" onClick={this.props.sub_toggle}>Edit</Button>{' '}
                        <Button color="secondary" onClick={() => this.props.deleteItem(this.props.idx)}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            )
        }
    }