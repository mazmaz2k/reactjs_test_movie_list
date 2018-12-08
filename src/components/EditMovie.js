import React from 'react';
// import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Button, Modal,  Form, FormGroup, Label } from 'react-bootstrap';


export class EditMovie extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.movie);
        this.state = {
            movieTitle: props.movie.movieTitle,
            director: props.movie.director,
            year: props.movie.year,
            runtime: props.movie.runtime,
            genre: props.movie.genre,
            valTitle: false,
            movie_title_error: false,
            existError: false

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDirctorChange = this.handleDirctorChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleRuntimeChange = this.handleRuntimeChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);

    }
    validate(movieTitle, director, year, runtime, genre) {
        if(year>=5001||year<1900 ){
            return ({
                director: director.length === 0,
                movieTitle: movieTitle.length === 0,
                year: 1,
                runtime: runtime.length === 1,
                genre: genre.length === 0,
            }
            );
        }
        if(runtime<1 || runtime>2000){
            return ({
                director: director.length === 0,
                movieTitle: movieTitle.length === 0,
                year: year.length ===0,
                runtime: 1,
                genre: genre.length === 0,
            }
            );
        }
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

        this.setState({ year: e.target.value });
    }
    handleRuntimeChange(e) {
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
        let title = this.props.titleFilter(this.state.movieTitle);      // get the filtered title
        if(this.props.checkIfExist(title) !== -1 && this.props.checkIfExist(title) !== this.props.index) {                            // check if the title already exist in array
            this.setState({
                ...this.state,
                existError: true
            });
            return;
        } 
        this.props.editMovie(a_movie);
        this.props.toggle();
        event.preventDefault();

    }


    render() {
        const errors = this.validate(this.state.movieTitle, this.state.director, this.state.year, this.state.runtime, this.state.genre);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        return (
            <Modal show={this.props.isOpen} onHide={this.props.toggle}>
                <Modal.Header closeButton>
                    <Modal.Title className="mr-sm-2">Movie Title </Modal.Title>
                    <input type="text" name="movieTitle" id="movieTitle" value={this.state.movieTitle} onChange={this.handleTitleChange} className={errors.movieTitle ? "error" : ""} />
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <FormGroup>
                            <Label className="mr-sm-2">Director Name </Label>
                            <input type="text" name="director" id="director" value={this.state.director} onChange={this.handleDirctorChange} className={errors.director ? "error" : ""} />
                        </FormGroup>
                        <FormGroup>
                            <Label className="mr-sm-2">Genre </Label>
                            <input type="text" name="genre" id="genre" value={this.state.genre} onChange={this.handleGenreChange} className={errors.genre ? "error" : ""} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label className="mr-sm-2">Enter published year </Label>
                            <input type="number" min="1900" max="5000" name="year" id="year" defaultValue={this.state.year} onChange={this.handleYearChange} className={errors.year ? "error" : ""} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label className="mr-sm-2">Enter runtime in minutes </Label>
                            <input type="number" min="0" max="2000" name="runtime" id="runtime" defaultValue={this.state.runtime} onChange={this.handleRuntimeChange} className={errors.runtime ? "error" : ""} />
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                {this.state.existError && <div style={{float: "left"}} className="error"> The movie with that title already exist </div>}

                    <Button type="submit" value="Submit" color="primary" onClick={this.handleSubmit} disabled={isDisabled}>submit</Button>{' '}
                </Modal.Footer>
            </Modal>
        )
    }
}