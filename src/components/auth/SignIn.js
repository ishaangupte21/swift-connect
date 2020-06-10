import React from 'react';
import { auth } from '../../config/firebase';
import { Typography, TextField, Button } from '@material-ui/core';


export default class SignIn extends React.Component {
    state = {
        email :'',
        password: '',
        error: ''
    }

    componentDidMount() {
        // auth.signOut()
        auth.onAuthStateChanged(user => {
            if(user) {
                this.props.history.push('/')
            } else {

            }
        }) 
    }

    handleSubmit = e => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(this.state.email.toLowerCase().trim(), this.state.password.trim()).then(() => {
            this.props.history.push('/')
        }).catch(err => this.setState({error: err.message}))
    }

    render() {
        return (
            <div className="login-container">
                <Typography variant='h3'>Log In</Typography> <br/>
                <form className="login-form" onSubmit={this.handleSubmit}>
                <TextField variant='outlined' label='Email Address' onChange={e => {this.setState({email: e.target.value})}} /> <br/>
                <TextField variant='outlined' label='Password' type='password' onChange={e => {this.setState({password: e.target.value})}} /> <br/>
                <Button type='submit'variant='contained' color='primary'>Log In</Button> <br/>
                <Typography variant='body1' color='error'>{this.state.error}</Typography>
                </form>
                <Button href="/signup">Don't have an Account?</Button>
            </div>
        )
    }
}