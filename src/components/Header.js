import React from "react";
import { connect } from 'react-redux';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

export class Header extends React.Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#brand">Home</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    
                    <Nav pullRight>
                        <NavItem eventKey={2} onClick={()=>this.props.val(this.props.moviesReducer.movies)}>
                        Show Movies Reducer</NavItem>
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

//show that the movie reducer is working and that it's showing the entire state of the application
const mapDispatchToProps = (dispatch) => {
    return {
        validate: function (value) {
            dispatch({
                type: "CHANGE_INDEX",
                payload: value
            })
        },
        val: function (value) {
            dispatch({
                type: "CHANGE_MOVIE_LIST",
                payload: value
            })
        }

    }
}

const mapStateToProps = (state) => {
    console.log("state 3", state);
    return state;
}


export default connect(mapStateToProps, mapDispatchToProps)(Header); 