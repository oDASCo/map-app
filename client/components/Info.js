import Delete from './Delete';
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";


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

export default Info;