import React from 'react';
import { Collapse, Button, CardBody, Card,Form, FormGroup, Label, Input  } from 'reactstrap';


export class AddMovie extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { 
            collapse: false,
            diractor: '',
            runtime: '',
            genre: '',
            movieTitle: '',
            year: '',
            valTitle :false
  
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDirectorChange = this.handleDirectorChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleRuntimeChange = this.handleRuntimeChange.bind(this);


    }

    validate(movieTitle, diractor,runtime, genre, year){
        return({
            movieTitle: movieTitle.length === 0,
            year: year.length ===0,
            runtime: runtime.length ===0,
            genre: genre.length ===0,
            diractor: diractor.length===0
            }
        );
    }
    toggle() {
        this.setState({ collapse: !this.state.collapse });

    }
    handleTitleChange(e) {
        this.setState({movieTitle: e.target.value});
    }
    handleDirectorChange(e) {
        // console.log(e);
        this.setState({diractor: e.target.value});
    }

    handleYearChange(e) {
        // console.log(e);
        this.setState({year: e.target.value});
    }
    handleGenreChange(e) {
        // console.log(e);
        this.setState({genre: e.target.value});
    }

    handleRuntimeChange(e) {
        // console.log(e);
        this.setState({runtime: e.target.value});
    }

    // handleDateChange(e) {
    //     if(e.target.value===''){
    //         return false;
    //     }
    //     this.setState({year: e.target.value});
    // }
    canBeSubmitted() {
        const errors = this.validate(this.state.movieTitle,this.state.diractor,this.state.runtime,this.state.genre,this.state.year);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
      }

    handleSubmit(event){

        // console.log(e)
        console.log(this.state.diractor);
        console.log(this.state.movieTitle);
        console.log(this.state.runtime);
        console.log(this.state.genre);
        console.log(this.state.year);
        if(this.state.diractor!=='' && this.state.movieTitle!=='' && this.state.year!=='' && this.state.genre.length!='' &&this.state.runtime!=''){
            const min = 1;
            const max = 100000;
            const rand =Math.floor(min + Math.random() * (max - min)) ;
            // this.props.movieList.push({id: this.props.movieList.length, movieTitle:this.state.movieTitle,year:this.state.year,diractor:this.state.diractor});
            this.props.addNewBook({id: rand, movieTitle:this.state.movieTitle, year:this.state.year,runtime: this.state.runtime, genre: this.state.genre,diractor:this.state.diractor  });
            this.toggle();
            // this.props.movieList()
            // event.preventDefault();
            // console.log(this.props.movieList);
            // event.onSubmit()
            // return;
        }
        event.preventDefault();
        this.setState({
            year:'', 
            movieTitle:'',
            runtime:'',
            genre: '',
            diractor: ''
            }
        )
        // console.log(this.props.movieList);

    }
    render() {
        const errors= this.validate(this.state.movieTitle, this.state.diractor,this.state.year,this.state.genre, this.state.year);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        return (
            <div>
                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Add new Movie</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <Form  onSubmit={this.handleSubmit}>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="movieTitle" className="mr-sm-2">Enter Movie Name</Label>
                                    <Input type="text" name="movieTitle" id="movieTitle"  value={this.state.movieTitle} onChange={this.handleTitleChange}  placeholder="Enter Movie Name" className={errors.movieTitle ? "error" : ""}/>
                                </FormGroup>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label  className="mr-sm-2">Enter diractor Name</Label>
                                    <Input  type="text" name="diractor" id="diractor" placeholder="Enter diractor Name" value={this.state.diractor} onChange={this.handleDirectorChange} className={errors.diractor ? "error" : ""} />
                                </FormGroup>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label  className="mr-sm-2">Enter  Year</Label>
                                    <Input valid type="number" max="5000" min="0" name="year" id="year" placeholder="Enter year placeholder" value={this.state.year} onChange={this.handleYearChange}  className={errors.year ? "error" : ""}/>
                                </FormGroup>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label  className="mr-sm-2">Enter  runtime</Label>
                                    <Input valid type="number"  min="0"  name="runtime" id="runtime" placeholder="Enter runtime placeholder" value={this.state.runtime} onChange={this.handleRuntimeChange}  className={errors.runtime ? "error" : ""}/>
                                </FormGroup>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label  className="mr-sm-2">Enter  genre</Label>
                                    <Input valid type="text"   name="genre" id="genre" placeholder="Enter genre placeholder" value={this.state.genre} onChange={this.handleGenreChange}  className={errors.genre ? "error" : ""}/>
                                </FormGroup>
                                <hr/>
                                <Button  type="submit" value="Submit" disabled={isDisabled}>Submit</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }

}