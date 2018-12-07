import React, { Component } from 'react';
import MovieList from './components/MovieList';
import Header from './components/Header';
import './App.css';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <div >
          <Header /> 
          <Button onClick={()=>this.props.validate(this.props.moviesReducer.idx +1)}> Button</Button>
        </div>
        <div>
          <MovieList />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    validate: function(value){
      dispatch({
        type: "CHANGE_INDEX", 
        payload: value
      })
    }
  }
}

const mapStateToProps = (state)=>{
  console.log(state);
  return state;
} 
export default connect(mapStateToProps, mapDispatchToProps) (App) ;
