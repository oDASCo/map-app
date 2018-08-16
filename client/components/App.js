import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import MyMapComponent from './Map';
import InfoBlock from './InfoBlock';
export default class App extends React.Component {

    render() {
        return (
            <div>
                <div>
                    <InfoBlock/>
                </div>
                <div style={{width: '100%', height: '400px'}}>
                    <MyMapComponent isMarkerShown />
                </div>
            </div>
        );
    }
}