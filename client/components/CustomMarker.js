import React from 'react';
import {Marker} from 'react-google-maps';

const CustomMarker = (props) => {
    const {place_id} = props;

    const onMarkerClick = (evt) => {
        console.log(place_id);
    };

    return (
        <Marker
            onClick={onMarkerClick}
            key={marker.place_id}
            position={{ lat: marker.lat, lng: marker.lng }}
        />
    );
};

export default CustomMarker;