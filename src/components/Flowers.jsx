import React, { Component } from 'react';
import FlowersList from './FlowersList';
import Search from './Search';
import ViewMore from './ViewMore';
import './Flowers.css'
import axios from 'axios';

class Flowers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filterText: '',
            selectedFlower: '',
            flowerSightings: [],
            showPopup: false
        }
    }
    componentDidMount(){
        axios.get('/api/flowers').then((req,res) => {
            this.setState({data:req.data})
            //console.log(this.state.data);
        })
    }

    filterUpdate(value) {
        this.setState({
            filterText: value
        })
    }

    selectedUpdate(flower) {
        this.setState({
            selectedFlower: flower
        })
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        })
    }

    render() {
        console.log(this.state.showPopup)
        return(
            <div>
                <h2 className = 'text-center'>List of flowers</h2>
                <Search 
                    filterText={this.state.filterText}
                    filterUpdate={this.filterUpdate.bind(this)}
                />                  
                <div className="column1">                    
                    <table class='table table-striped table-hover'>
                        <thead>
                            <th>Common Name</th>
                            <th>Genus</th>
                            <th>Species</th>
                        </thead>
                        <FlowersList 
                            data={this.state.data} 
                            filterText={this.state.filterText}
                            flowerSightings={this.state.flowerSightings}
                            selectedUpdate={this.selectedUpdate.bind(this)}
                            togglePopup={this.togglePopup.bind(this)}                          
                        />
                    </table>                    
                </div>
                <ViewMore
                    selectedFlower={this.state.selectedFlower}
                    closePopup={this.togglePopup.bind(this)}
                 /> 
            </div>
        )
    }
}

export default Flowers;