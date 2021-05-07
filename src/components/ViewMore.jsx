import React, { Component } from 'react';
import Flowers from './Flowers';
import axios from 'axios';
//import './ViewMore.css'

class ViewMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sightings: []
        }
    }
    
    componentDidUpdate(){
        axios.get('/api/flowers/' + this.props.selectedFlower).then((req,res) => {
            this.setState({sightings: req.data})
            //console.log(this.state.sightings)
        })
    }


    render() {

        const s= this.state.sightings
        const sightingsList = s
        .filter((sighting) => {
            return sighting.NAME === this.props.selectedFlower
        })
        .map(sighting => {
            return(
                <tr>
                    <td>{sighting.SIGHTED}</td>
                    <td>{sighting.LOCATION}</td>
                    <td>{sighting.PERSON}</td>
                </tr>
            )
        })
        return (
            <div className='popup'>
                <div className='popup\_inner'>
                    <h1>{this.props.selectedFlower}</h1>
                    <table class='table table-striped table-hover'>
                        <thead>
                            <th>Date Sighted</th>
                            <th>Location</th>
                            <th>Person</th>
                        </thead>
                        {sightingsList}
                    </table>
                    <button onClick={() => this.props.closePopup}>close</button>
                </div>
            </div>   
        )   
    }

} 

export default ViewMore;