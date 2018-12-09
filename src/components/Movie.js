import React from 'react';
import { Button } from 'react-bootstrap';

//Show a button with the mivie title in it.
export class Movie extends React.Component {

    render() {
        return (
            <div  >
                <Button bsStyle="danger" onClick={() => this.props.toggle(this.props.idx)} style={{ top: '20px', right: '20px', width: '550px', marginBottom: "10px" }}>{this.props.movie.movieTitle}</Button>
            </div>
        )
    }

}