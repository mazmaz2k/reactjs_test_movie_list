import React from "react";
import {connect} from 'react-redux';

export class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <ul className="nav navbar-nav">
                            <li><a href="">Home</a></li>
                            <li><a  onClick={()=>this.props.val(this.props.moviesReducer.movies)} >Button Movies Reducer</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
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
    console.log("state 3", state);
    return state;
  } 
  

export default connect(mapStateToProps, mapDispatchToProps) (Header); 