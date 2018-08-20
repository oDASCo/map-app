import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class InfoBlock extends React.Component {
    constructor() {
        super();
        this.state = {data: []};
        this.getData = this.getData.bind(this);
    }
    componentDidMount() {
        this.getData(this);
    }
    getData(ev){
        axios.get('/getAll')
            .then(function(response) {
                ev.setState({data: response.data});
            });
    }
    render(){
        return (
           <div className="infoBlock">
           <div className="infoBlockText">
               <p className="placeName">Example</p>
               <p>Example</p>
           </div>
           <div className="infoBlockBtn">
               <button className="hideBtn">Hide this place</button>
           </div>
               <table>
               <tbody>
               {
                   this.state.data.map(function(exp){
                       return  <tr><td className='counterCell'></td><td className='button-col'>{exp.place_id}</td><td className='button-col'>{exp.place_name}</td><td className='button-col'>{exp.lat}</td><td className='button-col'>{exp.lng}</td><td className='button-col'></td></tr>
                   })
               }
               </tbody>
               </table>
           </div>
        )
    }
}
export default InfoBlock;