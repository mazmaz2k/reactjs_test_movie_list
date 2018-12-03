import React, { Component } from 'react';
import MovieList from './components/MovieList';
import Header from './components/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div >
          <Header /> 

        </div>
        <div>
          <MovieList />
        </div>
      </div>
    );
  }
}

export default App;
