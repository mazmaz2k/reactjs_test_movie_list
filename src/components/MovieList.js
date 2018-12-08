import React from 'react';
// import axios from 'axios';
import { AddMovie } from './AddMovie';
import { Movie } from './Movie';
import { EditMovie } from './EditMovie';
import { SModal } from './SModal';
import { GetMovies } from '../movieApi';
import { Button } from 'react-bootstrap';
import {connect} from 'react-redux';



class MovieList extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      modal: false,
      sub_modal: false,
      idx: 0,
      show_new_movie_modal: false,    // new movie modal indicator

    }

    this.handleHide = this.handleHide.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.toggle = this.toggle.bind(this);
    this.sub_toggle = this.sub_toggle.bind(this);
    this.deleteFromList = this.deleteFromList.bind(this);
    this.addNewMovie = this.addNewMovie.bind(this);
    this.editMovie = this.editMovie.bind(this);
    this.checkIfExist = this.checkIfExist.bind(this);
    this.showAddNewMovieModal = this.showAddNewMovieModal.bind(this);
  }

  toggle(i) {
    this.setState({
      modal: !this.state.modal,
      idx: i,
    });
  }

  sub_toggle(movieTitle, titleerName, year, runtime, gnere, director) {
    this.setState({
      modal: !this.state.modal,
      sub_modal: !this.state.sub_modal,

    });
  }

  // show new movie modal
  showAddNewMovieModal() {
    this.setState({
      ...this.state,
      show_new_movie_modal: true
    });
  }
  // filter the title of the movie and return good format
  titleFilter(title) {
    let newTitle = title.split(" ");        // make an array of words
    newTitle = newTitle.map(word => {       // for each word
      word = word.replace(/\W/g, '');     // remove all non letters
      word = word.toLowerCase();          // set all letter to be lower case.
      return word.charAt(0).toUpperCase() + word.slice(1);        // set the first letter to be upper case.
    });
    newTitle = newTitle.join(" ");          // create a string from array
    return newTitle;
  }


  deleteFromList(idx) {
    let { movies } = this.state;
    // console.log("1:----",movies)
    movies.splice(idx, 1);
    // console.log("2:----",movies)
    this.setState({ movies });
    this.toggle();
  }

    // new movie creation
  handleSubmit(movieTitle, diractor, year, runtime, gnere) {
    console.log("000000000000");
    let movies = this.state.movies;
        movies.push({
          "movieTitle": movieTitle,
          "diractor": diractor,
          "year": year,
          "runtime":runtime,
          "gnere": gnere});
      this.setState({
          movies: movies,
          show_new_movie_modal: false
      });
  }

  componentDidMount() {
    // axios.get('./data/movies.json')
    //   .then(res => {
    //     // movies = res.data;

    //     this.setState({ movies: res.data });
    //   })

    //     // console.log(movies.getState).catch(function (error) {
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    GetMovies().then(res => {
      let movies = Object.keys(res.data).map(key => {    // for each movie object
        let movieTitle = this.titleFilter(res.data[key].movieTitle);    // get the filtered title
        res.data[key].movieTitle = movieTitle;                  // set the filtered title
        return res.data[key];                         // return the movie with formated title
      });
      this.setState({
        movies: movies
      })
    }).catch(function (error) {
      console.log(error);
    });


  }

  checkIfExist(title) {
    console.log("sddsaaaaaakkkkkkk",this.state.movies);
    let movieList = this.state.movies;
    for (var i = 0; i < movieList.length; i++) {
      if (movieList[i].movieTitle === title) {
        return i;
      }
    }
    return -1;
  }

  // hide the modal of new movie
  handleHide() {
    this.setState({
      ...this.state,
      show_new_movie_modal: false
    });
  }

  // show new movie modal
  addNewMovie() {
      this.setState({
          ...this.state,
          show_new_movie_modal: true
      });
  }
  editMovie(movie) {

    // console.log("movie: ",movie)
    let titleFiltered = this.titleFilter(movie.movieTitle);    // filter the title

    movie.movieTitle = titleFiltered;
    const movieList = this.state.movies;
    movieList[this.state.idx] = movie;
    // console.log("Before: ",movieList)
    this.setState({ movies: movieList });
    // console.log("After: ",this.state.movies)
  }



  render() {


    // console.log("movieTitles Set:  ->",movieTitles);

    // console.log('All movies ', this.state.movies);

    const movies = this.state.movies;

    // console.log(this.state.checkedItems);
    // var idx =0;
    let movieListBlock = '';
    if (movies.length > 0) {
      movieListBlock = this.state.movies.map((movies, i) => {
        return (
          <Movie key={i} idx={i} toggle={this.toggle} movie={this.state.movies[i]} />
          //   <div key={i} >
          //       <Button color="danger" onClick={()=> this.toggle(i)} style={{ top: '20px', right: '20px', width: '500px', marginBottom: "10px" }}>{movies.movieTitle}</Button>
          //   </div>
        )
      });
    }
    // console.log("dddddddfffffffffff");

    return (
      
      <div className='gator container'>

        <ul >
          <div>
            <div id={"add_new_movie"} >
            <Button onClick={()=>this.props.val(this.state.movies)}> Button movies</Button>
              <br/>
              <Button bsStyle="primary" style={{ width: 20 + '%', fontSize: 16 }} onClick={this.addNewMovie}>Add New movie</Button>
            </div>

            <div>
              {
                this.state.show_new_movie_modal &&
                <AddMovie titleFilter={this.titleFilter} checkIfExist={this.checkIfExist} show={this.state.show_new_movie_modal} handleHide={this.handleHide} handleSubmit={this.handleSubmit} />
              }

            </div>
            {movieListBlock}
            {this.state.modal && <SModal isOpen={this.state.modal} titleFilter={this.titleFilter} sub_toggle={this.sub_toggle} toggle={this.toggle} movie={this.state.movies[this.state.idx]} deleteItem={this.deleteFromList} idx={this.state.idx} />}
            {!this.state.modal && this.state.sub_modal && <EditMovie isOpen={this.state.sub_modal} titleFilter={this.titleFilter} checkIfExist={this.checkIfExist} toggle={this.sub_toggle} editMovie={this.editMovie} index={this.state.idx} movie={this.state.movies[this.state.idx]} />}

          </div>
        </ul>
      </div>


    )
  }


}



const mapDispatchToProps = (dispatch)=>{
  return {
    validate: function(value){
      dispatch({
        type: "CHANGE_INDEX", 
        payload: value})
    },
    val : function(value){
      dispatch({
        type: "CHANGE_MOVIE_LIST", 
        payload: value})
    }

  }
}

const mapStateToProps = (state)=>{
  console.log("state 2", state);
  return state;
} 

export default  connect(mapStateToProps, mapDispatchToProps) (MovieList); 
