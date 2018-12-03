import React from 'react';
import axios from 'axios';
import { AddMovie } from './AddMovie';
import { Movie } from './Movie';
import { EditMovie } from './EditMovie';
import { SModal } from './SModal';


class MovieList extends React.Component{

    constructor(){
        super();
        this.state= {
            movies: [],
            modal : false,
            sub_modal:false,
            idx: 0,
        }

        this.toggle = this.toggle.bind(this);
        this.sub_toggle = this.sub_toggle.bind(this);
        this.deleteFromList = this.deleteFromList.bind(this);
        this.addNewMovie = this.addNewMovie.bind(this);
        this.editMovie = this.editMovie.bind(this);
       
    }

    toggle(i) {
        this.setState({
          modal: !this.state.model,
          idx: i,
        });
    }

    sub_toggle(movieTitle,titleerName,year, runtime, gnere, director){
        this.setState({
          modal: !this.state.modal,
          sub_modal: !this.state.sub_modal,
          
        });
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
        // let movies = []
        axios.get('./data/movies.json')
          .then(res => {
            // movies = res.data;
            this.setState({ movies: res.data });
          })
    
            // console.log(movies.getState).catch(function (error) {
          .catch(function (error) {
            console.log(error);
          });
      }
      addNewMovie(movie) {
        const movieList = this.state.movies;
        movieList.push(movie);
        this.setState({movies: movieList});
      }
    
      editMovie(movie){
        console.log("movie: ",movie)
        const movieList = this.state.movies;
        movieList[this.state.idx]=movie;
        console.log("Before: ",movieList)
        this.setState({movies: movieList});
        console.log("After: ",this.state.movies)
    
      }


      
      render() {
        // console.log('All movies ', this.state.movies);
        const movies = this.state.movies;
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
                {<AddMovie movieList={this.state.movies} addNewMovie={this.addNewMovie}/>}
                {movieListBlock}
                {this.state.modal && <SModal isOpen={this.state.modal} sub_toggle={this.sub_toggle} toggle={this.toggle} movie={this.state.movies[this.state.idx]} deleteItem={this.deleteFromList} idx={this.state.idx} />}
                {!this.state.modal && this.state.sub_modal && <EditMovie isOpen={this.state.sub_modal} toggle={this.sub_toggle} editMovie={this.editMovie} movie={this.state.movies[this.state.idx]}  />}
    
              </div>
            </ul>
          </div>
    
    
        )
      }
    

    }
    export default MovieList; 
