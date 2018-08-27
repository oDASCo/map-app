import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
var querystring = require('querystring');
class AddMarkers extends React.Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
        this.insertNewPlace = this.insertNewPlace.bind(this);
    }
    componentWillMount() {
        this.setState({ markers: [] })
    }
    componentDidMount() {
        const url = [
            `https://gist.githubusercontent.com/oDASCo/b37079effa12c8c523b15f9cfa0c185f/raw`,
            `/8809f17a911a00c87d89100f6b54a4d1a98c66ca/goggle_places_minsk`
        ].join("")

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({ markers: data.results });

            });
    }
    onClick() {

        this.insertNewPlace(this.state.markers);
    }
    insertNewPlace(e) {
        {e.map((marker) =>
            axios.post('/insert',
                querystring.stringify({
                    id: marker.id,
                    name: marker.name,
                    lat: marker.geometry.location.lat,
                    lng: marker.geometry.location.lng
                })
            )
        )}
    }

    render() {
        return(
<button className='addMarkersBtn' onClick={this.onClick}>Add Places</button>
        )
    }
}
export default AddMarkers;