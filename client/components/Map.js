import Delete from './Delete';
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

var customMarker = require('../../src/images/map_marker.png');
var customMarkerDefault = require('../../src/images/map_marker_dark.png');
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers, withStateHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarker = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCdRumhbNFLG1ETUBWEHNwWt8FSmNwB9fE&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        center: { lat: 25.03, lng: 121.6 },
    }),
    withStateHandlers(() => ({
        isOpen: false,
        showInfo: '0'
    }), {
        onToggleOpen: ({ isOpen }) => () => ({
            isOpen: !isOpen,
        }),
        showInfo: ({ showInfo, isOpen }) => (a) => ({
            isOpen: !isOpen,
            showInfoIndex: a
        })
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 53.9, lng: 27.56667 }}
    >
        {props.markers.map((marker) =>
            <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={()=>{ props.showInfo(marker.id); props.setMarkerInfo(marker);} }
                onMouseDown={()=>{ props.showInfo(marker.id); props.setMarkerInfo(marker);} }
                icon={{
                    url: customMarker
                }}
            >
            </Marker>
        )}
        <Marker
            key={33444}
            position={{ lat: 53.9, lng: 27.56667 }}
            icon={{
                url: customMarkerDefault
            }}
            zIndex={10000}
        >

        </Marker>
    </GoogleMap>
);

class Info extends React.Component{
    render() {
        return (
            <div>
                <div className="infoBlock">
                <div className="infoBlockText">
                    <p className="placeName">Place: {this.props.markerInfo.name}</p>
                    <p>lat: {this.props.markerInfo.lat}  lng: {this.props.markerInfo.lng} </p>
                </div>
                <div className="infoBlockBtn">
                    <Delete id={this.props.markerInfo.id} place={this.props.markerInfo} onDelete={this.props.onDelete}/>
                </div>
                </div>
            </div>
        )
    }
}

class MyMap extends React.PureComponent {

    constructor() {
        super();
        this.state = {markers: [], markerInfo: {}};
        this.getData = this.getData.bind(this);
        this.setMarkerInfo = this.setMarkerInfo.bind(this);
        this.addNewPlaces = this.addNewPlaces.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
    }

    componentDidMount() {
        this.getData(this);
    }

    addNewPlaces() {
        fetch('/city')
            .then(res => res.json())
            .then(data => {
                this.setState({ markers: data });
            });
    }

    getData(ev){
        axios.get('/getAll')
            .then(function(response) {
                ev.setState({markers: response.data});
            });
    }

    setMarkerInfo(info){
        this.setState({ markerInfo: info });
    }

    removeMarker(id) {
        const updatedMarkers = this.state.markers.filter(m => m.id !== id);
        this.setState( { markers: updatedMarkers });
    }

    render() {
        return (
            <div>
                <Info markerInfo={this.state.markerInfo} onDelete={this.removeMarker} />
                <MapWithAMarker markers={this.state.markers} setMarkerInfo={this.setMarkerInfo} />
                <button
                    className='addMarkersBtn'
                    onClick={this.addNewPlaces}
                >
                    Add Places
                </button>
            </div>
        )
    }
}

export default MyMap;