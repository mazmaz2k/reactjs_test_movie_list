import React,{Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export class SModal extends Component {
    
    constructor(props) {
        super(props);
        console.log("ssssss", props.movie);
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
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}><b>{this.props.movie.movieTitle}</b></ModalHeader>
                    <ModalBody>
                        {/* <p>Title: {this.props.movie.movieTitle}</p> */}
                        <p>Year: {this.props.movie.year}</p>
                        <p>Runtime: {this.props.movie.runtime} min</p>
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