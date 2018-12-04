import React from 'react';
import { Button } from 'reactstrap';


export class Movie extends React.Component {

    render() {
        // console.log("fffffffffffffffssssssssss");
        return (
            <div  >
                <Button color="danger" onClick={() => this.props.toggle(this.props.idx)} style={{ top: '20px', right: '20px', width: '500px', marginBottom: "10px" }}>{this.props.movie.movieTitle}</Button>
            </div>
        )
    }

}