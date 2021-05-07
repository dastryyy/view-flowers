import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class EditFlower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentComname: null,
            newGenus: null,
            newSpecies: null,
            newComname: null,
            redirectTo: null
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {
            currentComname,
            newGenus,
            newSpecies,
            newComname
        } = this.state
        let data = {
            genus: newGenus,
            species: newSpecies,
            comname: newComname
        }
        axios.patch('/api/flowers/' + currentComname, data).then((req, res) => {
            if(req.status === 200) {
                alert('Flower successfully updated!')
                this.setState({
                    redirectTo: '/flowers'
                })
            }
        })
    }

    render() {
        if(this.state.redirectTo) {
            return <Redirect to={{pathname: this.state.redirectTo}}/>
        } else {
            return (
                <form className="text-center" id="editFlower" onSubmit={this.handleSubmit}>
                    <h2>Edit a flower here:</h2>
                    <div className="form-group">
                        <label>
                            Enter the name of the flower you wish to edit:
                            <input name="currentComname" type="text" onChange={this.handleChange}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Enter new genus here:
                            <input required id="genus" name="newGenus" type="text" onChange={this.handleChange}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Enter new species here:
                            <input required id="species" name="newSpecies" type="text" onChange={this.handleChange}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Enter new name here:
                            <input required id="comname" name="newComname" type="text" onChange={this.handleChange}/>
                        </label>
                    </div>
                    <button className="btn btn-primary">submit</button>
                </form>
            )
        }
    }
}

export default EditFlower;
