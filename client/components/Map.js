import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

// import customMarker from '../../src/images/map_marker.png';
const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarker = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCdRumhbNFLG1ETUBWEHNwWt8FSmNwB9fE&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: 53.9, lng: 27.56667 }}
    >
            {props.markers.map(marker => (
                <Marker
                    key={marker.place_id}
                    position={{ lat: marker.lat, lng: marker.lng }}
                />
            ))}

    </GoogleMap>
);

class MyMap extends React.PureComponent {

    constructor() {
        super();
        this.state = {markers: []};
        this.getData = this.getData.bind(this);
    }
    componentWillMount() {
        this.getData(this);
    }
    getData(ev){
        axios.get('/getAll')
            .then(function(response) {
                ev.setState({markers: response.data});
            });
    }
    render() {
        return (
            <div>
                <MapWithAMarker markers={this.state.markers} />
            </div>
        )
    }
}

export default MyMap;