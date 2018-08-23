import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import MyMap from './Map';
import InfoBlock from './InfoBlock';
import AddPlace from './AddPlace';
export default class App extends React.Component {

    render() {
        return (
            <div>

                <div style={{width: '100%'}}>
                    <MyMap />
                </div>
                <div><AddPlace /></div>

            </div>
        );
    }
}