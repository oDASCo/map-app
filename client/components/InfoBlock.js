import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
class InfoBlock extends React.Component {

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
           </div>
        )
    }
}
export default InfoBlock;