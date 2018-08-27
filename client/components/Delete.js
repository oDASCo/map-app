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
        this.setState({
            id: this.props.place.id
        })
    }

    onClick(e){
        const id = this.props.place.id;
        this.delete(id);
        this.props.onDelete(id);
    }

    delete(e){
        axios.post('/delete', {id : e})
            .then(function(response) {
                console.log(response);
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