import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export class EditMovie extends React.Component {
    constructor(props, context) {
        super(props, context);
        console.log(props.movie);
        this.state = {
            movieTitle: this.props.movie.movieTitle,
            director: this.props.movie.director,
            year: this.props.movie.year,
            runtime: this.props.movie.runtime,
            genre: this.props.movie.genre,
            valTitle: false

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDirctorChange = this.handleDirctorChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleRuntimeChange = this.handleRuntimeChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);

    }
    validate(movieTitle, director, year, runtime, genre) {
        return ({
            director: director.length === 0,
            movieTitle: movieTitle.length === 0,
            year: year.length === 0,
            runtime: runtime.length === 0,
            genre: genre.length === 0,
        }
        );
    }

    handleTitleChange(e) {
        this.setState({ movieTitle: e.target.value });
    }
    handleDirctorChange(e) {
        this.setState({ director: e.target.value });
    }

    handleYearChange(e) {
        // if(e.target.value===''){
        //     return false;
        // }
        this.setState({ year: e.target.value });
    }
    handleRuntimeChange(e) {
        // if(e.target.value===''){
        //     return false;
        // }
        this.setState({ runtime: e.target.value });
    }
    handleGenreChange(e){
        this.setState({ genre: e.target.value});
    }
    canBeSubmitted() {
        const errors = this.validate(this.state.movieTitle, this.state.director,  this.state.year,this.state.runtime, this.state.genre);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;

    }

    handleSubmit(event) {
        const a_movie = { id: this.props.movie.id, director: this.state.director, year: this.state.year, movieTitle: this.state.movieTitle, runtime: this.state.runtime, genre:this.state.genre };
        this.props.editMovie(a_movie);
        this.props.toggle();
        event.preventDefault();

    }

    render() {
        const errors = this.validate(this.state.movieTitle, this.state.director, this.state.year, this.state.runtime, this.state.genre);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>
                    <Label className="mr-sm-2">Movie Title</Label>
                    <Input type="text" name="movieTitle" id="movieTitle" value={this.state.movieTitle} onChange={this.handleTitleChange} className={errors.movieTitle ? "error" : ""} />
                </ModalHeader>
                <ModalBody>
                    <Form >
                        <FormGroup>
                            <Label className="mr-sm-2">director Name</Label>
                            <Input type="text" name="director" id="director" value={this.state.director} onChange={this.handleDirctorChange} className={errors.director ? "error" : ""} />
                        </FormGroup>
                        <FormGroup>
                            <Label className="mr-sm-2">Genre</Label>
                            <Input type="text" name="genre" id="genre" value={this.state.genre} onChange={this.handleGenreChange} className={errors.genre ? "error" : ""} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label className="mr-sm-2">Enter published year</Label>
                            <Input type="number" min="0" max="5000" name="year" id="year" defaultValue={this.state.year} onChange={this.year} className={errors.year ? "error" : ""} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label className="mr-sm-2">Enter runtime</Label>
                            <Input type="number" min="0" name="runtime" id="runtime" defaultValue={this.state.runtime} onChange={this.runtime} className={errors.runtime ? "error" : ""} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" value="Submit" color="primary" onClick={this.handleSubmit} disabled={isDisabled}>submit</Button>{' '}
                </ModalFooter>
            </Modal>
        )
    }
}