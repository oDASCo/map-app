import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Delete from './Delete';
import MyMap from './Map';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div className={'mapContainer'}>
                    <MyMap />
                </div>
            </div>
        );
    }
}