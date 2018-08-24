import Delete from './Delete';
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";


// import customMarker from '../../src/images/map_marker.png';
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
        defaultZoom={3}
        defaultCenter={{ lat: 53.9, lng: 27.56667 }}
    >

        {props.markers.map((marker) =>
            <Marker
                key={marker.place_id}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={()=>{ props.showInfo(marker.place_id); props.setMarkerInfo(marker);} }
                onMouseEnter={()=>{ props.showInfo(marker.place_id); props.setMarkerInfo(marker);} }
            >

            </Marker>
        )}


    </GoogleMap>
);

class Info extends React.Component{
    constructor(props) {
        super(props);
        // this.hideMarker = this.hideMarker.bind(this);
    }
    // hideMarker() {
    //     console.log(this.props.markerInfo);
    // }
    render() {
        return (
            <div>
                <div className="infoBlock">
                <div className="infoBlockText">
                    <p className="placeName">Place: {this.props.markerInfo.place_name}</p>
                    <p>lat: {this.props.markerInfo.lat}    lng: {this.props.markerInfo.lng}</p>
                </div>
                <div className="infoBlockBtn">
                     {/*<button className="hideBtn" onClick={this.hideMarker}>Hide this place</button>*/}
                    <Delete id={this.props.markerInfo.place_id} place={this.props.markerInfo} />
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

    setMarkerInfo(info){
        this.setState({markerInfo: info});
    }

    render() {
        return (
            <div>
                <Info markerInfo={this.state.markerInfo} />
                <MapWithAMarker markers={this.state.markers} setMarkerInfo={this.setMarkerInfo} />
            </div>
        )
    }
}

export default MyMap;