import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
var querystring = require('querystring');
class AddPlace extends React.Component {
    constructor() {
        super();
        this.state = {
            place_id: '',
            place_name: '',
            lat: '',
            lng: '',
            messageFromServer: '',
            modalIsOpen: false
        }
        // this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewPlace = this.insertNewPlace.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }
    closeModal() {
        this.setState({
            modalIsOpen: false,
            place_id: '',
            place_name: '',
            lat: '',
            lng: '',
            messageFromServer: ''
        });
    }
    onClick(e) {
        this.insertNewPlace(this);
    }
    insertNewPlace(e) {
        axios.post('/insert',
            querystring.stringify({
                id: e.state.place_id,
                name: e.state.place_name,
                lat: e.state.lat,
                lng: e.state.lng
            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function(response) {
            e.setState({
                messageFromServer: response.data
            });
        });
    }
    handleTextChange(e) {
        if (e.target.name == "place_id") {
            this.setState({
                place_id: e.target.value
            });
        }
        if (e.target.name == "place_name") {
            this.setState({
                place_name: e.target.value
            });
        }
        if (e.target.name == "lat") {
            this.setState({
                lat: e.target.value
            });
        }
        if (e.target.name == "lng") {
            this.setState({
                lng: e.target.value
            });
        }
    }
    render() {
        if(this.state.messageFromServer == ''){
            return (
                <div>
                    <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Place"
                        className="Modal">
                        <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                            <Button bsStyle="danger" bsSize="small" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
                        </Link><br/>
                        <fieldset>
                            <label htmlFor="place_id">ID:</label><input type="text" id="place_id" name="place_id" value={this.state.place_id} onChange={this.handleTextChange}></input>
                            <label htmlFor="place_name">Place Name:</label><input type="text" id="place_name" name="place_name" value={this.state.place_name} onChange={this.handleTextChange}></input>
                            <label htmlFor="lat">lat:</label><input type="text" id="lat" name="lat"
                                                                          value={this.state.lat}
                                                                          onChange={this.handleTextChange}></input>

                            <label htmlFor="lng">long:</label><input type="text" id="lng" name="lng"
                                                                          value={this.state.lng}
                                                                          onChange={this.handleTextChange}></input>

                        </fieldset>
                        <div className='button-center'>
                            <br/>
                            <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Add New Place</Button>
                        </div>
                    </Modal>
                </div>
            )
        }
        else{
            return (
                <div>
                    <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Place"
                        className="Modal">
                        <div className='button-center'>
                            <h3>{this.state.messageFromServer}</h3>
                            <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                                <Button bsStyle="success" bsSize="small" onClick={this.closeModal}>Close the Dialog</Button>
                            </Link>
                        </div>
                    </Modal>
                </div>
            )
        }
    }
}
export default AddPlace;