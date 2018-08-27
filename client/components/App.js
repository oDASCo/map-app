import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Delete from './Delete';
import MyMap from './Map';
// import AddPlace from './AddPlace';
export default class App extends React.Component {

    render() {
        return (
            <div>

                <div style={{width: '100%'}}>
                    <MyMap />
                </div>


            </div>
        );
    }
}