import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export class SModal extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            director: this.props.movie.director,
            movieTitle: this.props.movie.movieTitle,
            runtime: this.props.movie.runtime,
            genre: this.props.movie.genre,
            year: this.props.year,
            valTitle: false

        };
    }

    setValues(movieTitle,director,runtime, genre, year){
        

    }



        render() {
            console.log(this.props);
            return (
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}><b>{this.props.movie.movieTitle}</b></ModalHeader>
                    <ModalBody>
                        <p>Title: {this.props.movie.movieTitle}</p>
                        <p>Year: {this.props.props.year}</p>
                        <p>Runtime: {this.props.movie.runtime}</p>
                        <p>Genre: {this.props.movie.genre}</p>
                        <p>Director: {this.props.movie.director}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.sub_toggle}>Edit</Button>{' '}
                        <Button color="secondary" onClick={() => this.props.deleteItem(this.props.idx)}>Delete</Button>
                    </ModalFooter>
                </Modal>
            )
        }
    }