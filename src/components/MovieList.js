import React from 'react';
// import axios from 'axios';
import { AddMovie } from './AddMovie';
import { Movie } from './Movie';
import { EditMovie } from './EditMovie';
import { SModal } from './SModal';
import { GetMovies } from '../movieApi';



class MovieList extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      modal: false,
      sub_modal: false,
      idx: 0,
    }

    this.toggle = this.toggle.bind(this);
    this.sub_toggle = this.sub_toggle.bind(this);
    this.deleteFromList = this.deleteFromList.bind(this);
    this.addNewMovie = this.addNewMovie.bind(this);
    this.editMovie = this.editMovie.bind(this);
    this.checkIfExist = this.checkIfExist.bind(this);
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
    let movieList = this.state.movies;
    for(var i = 0; i < movieList.length; i++) {
        if(movieList[i].title === title) {
            return true;
        }
    }
    return false;
}


  addNewMovie(movie) {
    const movieList = this.state.movies;
    let titleFiltered = this.titleFilter(movie.movieTitle);    // filter the title

    movie.movieTitle = titleFiltered;
    movieList.push(movie);
    this.setState({ movies: movieList });
  }

  editMovie(movie) {

    // console.log("movie: ",movie)
    let titleFiltered = this.titleFilter(movie.movieTitle);    // filter the title

    movie.movieTitle = titleFiltered;
    const movieList = this.state.movies;
    movieList[this.state.idx]=movie;
    // console.log("Before: ",movieList)
    this.setState({movies: movieList});
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

    return (
      <div className='gator container'>

        <ul >
          <div>
            {<AddMovie movieList={this.state.movies} addNewMovie={this.addNewMovie} />}
            {movieListBlock}
            {this.state.modal && <SModal isOpen={this.state.modal} checkIfExist={this.checkIfExist} sub_toggle={this.sub_toggle} toggle={this.toggle} movie={this.state.movies[this.state.idx]} deleteItem={this.deleteFromList} idx={this.state.idx} />}
            {!this.state.modal && this.state.sub_modal && <EditMovie isOpen={this.state.sub_modal} titleFilter={this.titleFilter} checkIfExist={this.checkIfExist} toggle={this.sub_toggle} editMovie={this.editMovie} movie={this.state.movies[this.state.idx]} />}

          </div>
        </ul>
      </div>


    )
  }


}
export default MovieList; 
