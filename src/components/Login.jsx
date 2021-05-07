import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';

class SignUpContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
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
        this.setState({
            redirectTo: '/flowers'
        })

    }

    render() {
		if(this.state.redirectTo) {
			return <Redirect to={{pathname: this.state.redirectTo}}/>
		} else {
			return (
			<div className ="shadow-sm" id='signUpContainer'>
					<SignUpHeader title="SSWC Login" />
				<div id='signUpFormContainer'>
				<form id="signUpForm">
					<div className='signUpRow'>
						<input type='text' placeholder='username' name='username' onChange={this.handleChange} />
					</div>
					<div className='signUpRow'>
						<input type='password' placeholder='password' name='password' onChange={this.handleChange}/>
					</div>
					<div className='signUpRow'>
						<button type='button' onClick={this.handleSubmit}>Login</button>
					</div>
				</form>
				</div>
			</div>
			)
		}
	}
}



const SignUpHeader = props => (
	<div id='signUpHeader'>
		<div id='signUpHeaderTitle'>
			{props.title}
		</div>
	</div>
);



export default SignUpContainer;