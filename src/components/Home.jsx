import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import flower from './flower.jpg';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectTo: null
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            redirectTo: '/login'
        })
    }

    render() {
        if(this.state.redirectTo) {
            return <Redirect to={{pathname: this.state.redirectTo}}/>
        } else {
            return (
                <div className="text-center">
                    <h2>Welcome to the Southern Sierra Wildflower Club!</h2>
                    <img src={flower}/>         
                    <form className="text-center" id="home" onSubmit={this.handleSubmit}>
                        <button>Login</button>
                    </form>
                </div>
            )
        }
    }
}

export default Home;