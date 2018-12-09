import React from 'react';
import { Button, Modal } from 'react-bootstrap';


export class AddMovieModal extends React.Component {

        // constructor
        constructor(props) {

            super(props);
            this.state = {
                movieTitle: "",
                diractor: "",
                year: 1900,
                runtime: 0,
                genre: "",
                // error indicators
                movieTitle_error: true,
                diractor_error: true,
                year_error: true,
                runtime_error:true,
                genre_error: true,
                existError: false
            };
    
            // functions bind
            this.modalSubmit = this.modalSubmit.bind(this);
        }
    
        // name input on change called
        handleTitleName(title) {
            let error = false;
            if(title === "" ||this.props.checkIfExist(title) !== -1) {   // check if valid
                error = true;
            }
            this.setState({
                ...this.state,
                movieTitle: title,
                movieTitle_error: error
            });
        }
    
        // runtime input on change called
        handleRuntimeTitle(runtime) {
            let error = false;
            if(runtime === "" || runtime<=0 ||runtime>2000) {      // check if valid
                error = true;
            }
            this.setState({
                ...this.state,
                runtime: runtime,
                runtime_error: error
            });
        }

    
        // diractor input on change called
        handleDiractorName(diractor) {
            let error = false;
            if(diractor === "") {      // check if valid
                error = true;
            }
            this.setState({
                ...this.state,
                diractor: diractor,
                diractor_error: error
            });
        }

        // year input on change called
        handleYearTitle(year) {
            let error = false;
            if(year === "" || year<1900  || year >5000) {      // check if valid
                error = true;
            }
            this.setState({
                    ...this.state,
                    year: year,
                    year_error: error
            });
        }
                // genre input on change called
        handleGenreTitle(genre) {
            let error = false;
            if(genre === "" ) {      // check if valid
                error = true;
            }
            this.setState({
                ...this.state,
                genre: genre,
                genre_error: error
             });
        }
    
        // return false if there is no errors for submit button to become enabled
        isAllValid() {
            return this.state.movieTitle_error || this.state.diractor_error || this.state.year_error || this.state.runtime_error || this.state.genre_error;
        }
    
        // clicked add button
        modalSubmit() {
            let title = this.props.titleFilter(this.state.movieTitle);  // get the filtered title
            if(this.props.checkIfExist(title) !== -1) {                        // check if the title already exist in array
                this.setState({
                    ...this.state,
                    existError: true,
                });
                return;
            }
            // title not exists so we can add this movie to a list
            this.props.handleSubmit(title, this.state.diractor, this.state.year, this.state.runtime, this.state.genre);
            this.setState({
                movieTitle: "",
                diractor: "",
                year: 1900,
                runtime:0,
                genre:"",
                movieTitle_error: true,
                diractor_error: true,
                year_error: true,
                runtime_error: true,
                genre_error: true

            });
        }
    
        render() {
            return (<Modal
                show={this.props.show}
                onHide={this.props.handleHide}
                container={this}
                aria-labelledby="contained-modal-title" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        Add New movie
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{marginBottom: 30, marginLeft: 30}}>
                <div>
                    <input type={"text"} 
                        placeholder={"Movie title"} 
                        onFocus={e => this.handleTitleName(e.target.value)}
                        value={this.state.movieTitle}
                        onChange={e => this.handleTitleName(e.target.value)}/>
                    {
                        this.state.movieTitle_error && <div className="error"> Movie title must be valid </div>
                    }
                    <br />

                    <input type={"text"} 
                        placeholder={"Movie diractor"} 
                        onFocus={e => this.handleDiractorName(e.target.value)}
                        value={this.state.diractor}
                        onChange={e => this.handleDiractorName(e.target.value)}/>
                    {
                        this.state.diractor_error && <div className="error"> Movie diractor must be valid </div>
                    }
                    <br />

                    <input type={"number"} 
                        placeholder={"Movie year"} 
                        onFocus={e => this.handleYearTitle(e.target.value)}
                        value={this.state.year}
                        onChange={e => this.handleYearTitle(e.target.value)}/>
                    {
                        this.state.year_error && <div className="error"> Movie year must be valid between 1900 to 5000 </div>
                    }
                    <br />

                    <input type={"number"} 
                        placeholder={"Movie runtime"} 
                        onFocus={e => this.handleRuntimeTitle(e.target.value)}
                        value={this.state.runtime}
                        onChange={e => this.handleRuntimeTitle(e.target.value)}/>
                    {
                        this.state.runtime_error && <div className="error"> Movie runtime must be valid  between 1 to 2000</div>
                    }
                    <br />

                    <input type={"text"} 
                        placeholder={"Movie genre"} 
                        onFocus={e => this.handleGenreTitle(e.target.value)}
                        value={this.state.genre}
                        onChange={e => this.handleGenreTitle(e.target.value)}/>
                    {
                        this.state.genre_error && <div className="error"> Movie genre must be valid </div>
                    }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {this.state.existError && <div style={{float: "left"}} className="error"> The movie with that title already exist </div>}
                    <Button bsStyle="primary" disabled={this.isAllValid()} onClick={this.modalSubmit}>Add</Button>
                    <Button bsStyle="danger" onClick={this.props.handleHide}>Close</Button>
                </Modal.Footer>
            </Modal>);
        }
}