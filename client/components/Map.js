import React from "react";
import ReactDOM from "react-dom";

import customMarker from '../../src/images/map_marker.png';
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
                    key={marker.photo_id}
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                    // icon={{
                    //     url: customMarker
                    // }}
                />
            ))}

    </GoogleMap>
);

class DemoApp extends React.PureComponent {
    componentWillMount() {
        this.setState({ markers: [] })
    }

    componentDidMount() {
        const url = [
            // Length issue
            `https://gist.githubusercontent.com`,
            `/oDASCo/8ff64187569af0680464bea3285d8cd1/raw/ec5c2a8f6ae65281a0866b47a678c83ab2328de9/data.json`
        ].join("")

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({ markers: data.photos });
            });
    }

    render() {
        return (
            <MapWithAMarker markers={this.state.markers} />
        )
    }
}
export default DemoApp;