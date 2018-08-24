import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Delete extends React.Component {
    constructor(){
        super();
        this.state={id:''};
        this.onClick = this.onClick.bind(this);
        this.delete = this.delete.bind(this);
    }
    componentDidMount() {
        console.log(this)
        this.setState({
            id: this.props.place.place_id
        })
    }
    onClick(e){
        console.log(this.props.place);
        this.delete(this.props.place);
    }
    delete(e){
        axios.get('/delete')
            .then(function(response) {

            });
    }
    render(){
        return (
            <Button className="hideBtn" onClick={this.onClick}>
                <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                    Hide this place
                </Link>
            </Button>
        )
    }
}
export default Delete;