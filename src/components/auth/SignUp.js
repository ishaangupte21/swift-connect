import React from 'react';
import { auth, functions } from '../../config/firebase';
import { Typography, TextField, Button } from '@material-ui/core';


export default class SignUp extends React.Component {
    state = {
        email :'',
        password: '',
        name: '',
        username: '',
        error: ''
    }

    componentDidMount() {
        auth.signOut()
        auth.onAuthStateChanged(user => {
            if(user) {
                this.props.history.push('/')
            } else {

            }
        }) 
    }

    handleSubmit = async e => {
        try {
            e.preventDefault()
            const cred = await auth.createUserWithEmailAndPassword(this.state.email.trim().toLowerCase(), this.state.password.trim())
            const userFunction = functions.httpsCallable('createUserNode');
            await userFunction({uid: cred.user.uid, email: cred.user.email, username: this.state.username.trim(), name: this.state.name.trim()})
            this.props.history.push('/')
        } catch (err) {
            this.setState({error: err.message})
        }
    }

    render() {
        return (
            <div className="login-container">
                <Typography variant='h3'>Sign Up</Typography> <br/>
                <form className="login-form" onSubmit={this.handleSubmit}>
                <TextField variant='outlined' label='Email Address' onChange={e => {this.setState({email: e.target.value})}} /> <br/>
                <TextField variant='outlined' label='Password' type='password' onChange={e => {this.setState({password: e.target.value})}} /> <br/>
                <TextField variant='outlined' label='Username' onChange={e => {this.setState({username: e.target.value})}} /> <br/>
                <TextField variant='outlined' label='Name (not visible)' onChange={e => {this.setState({name: e.target.value})}} /> <br/>
                <Button type='submit'variant='contained' color='primary'>SignUp</Button> <br/>
                <Typography variant='body1' color='error'>{this.state.error}</Typography>
                </form>
                <Button href="/login">Aleady Have an Account?</Button>
            </div>
        )
    }
}