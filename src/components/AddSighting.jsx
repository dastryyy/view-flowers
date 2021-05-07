import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'

class AddSighting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newName: null,
            newPerson: null,
            newLocation: null,
            newDateSighted: null,
            redirectTo: null          
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(event){
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]:value})
    }

    handleSubmit(event){
        event.preventDefault();
        const {
            newName,
            newPerson,
            newLocation,
            newDateSighted
        } = this.state;
        let data = {
            name: newName,
            person: newPerson,
            location: newLocation,
            sighted: newDateSighted
        }
        axios.post('/api/newsighting', data).then((req,res) => {
            if(req.status === 200) {
                alert('Sighting successfully added!')
                this.setState({
                    redirectTo: '/flowers'
                })
            }
        });
    
    }

    render() {
        if(this.state.redirectTo) {
            return <Redirect to={{pathname: this.state.redirectTo}}/>
        } else {
            return(                
                <form className="text-center" id="addSighting" onSubmit={this.handleSubmit}>
                    <h2>Add a new sighting here: </h2>
                    <div className="form-group">
                        <label>
                            Flower Name:
                            <input required id="name" name="newName" type="text" onChange={this.handleChange}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Person:
                            <input required id="person" name="newPerson" type="text" onChange={this.handleChange}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Location:
                            <input required id="location" name="newLocation" type="text" onChange={this.handleChange}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Date Sighted:
                            <input required id="sighted" name="newDateSighted" type="text" onChange={this.handleChange}/>
                        </label>
                    </div>
                    <button className="btn btn-primary">submit</button>
                </form>
            )
        }
    }
}

export default AddSighting;
