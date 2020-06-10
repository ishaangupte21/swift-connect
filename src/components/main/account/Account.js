import React from 'react';
import {Navbar} from '../nav/Navbar'
import { auth, db, functions, storage } from '../../../config/firebase';
import { TextField, Button, Typography } from '@material-ui/core';

export default class Account extends React.Component {

    state = {
        data: null,
        username: '',
        name: ''
    }

    constructor(props) {
        super(props)

        this.fileRef = React.createRef()
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if(user) {
                db.collection('users').doc(user.uid).get().then(data => {
                    this.setState({data: data.data()})
                })
            } else {
                this.props.history.push('/login')
            }
        })
    }

    handleSubmit = async e => {
       try {
        e.preventDefault()
        let name
        if(this.state.name === '') {
            name = this.state.data.name
        } else {
            name = this.state.name
        }
        if(this.fileRef.current.files.length === 0) {
            //no profile pic
            const functionFb = functions.httpsCallable('editAccount')
            console.log(await functionFb({profilePic: null, name, username: this.state.username}))
        } else {
            //yes profile pic
            await storage.ref().child('profile_pics').child(this.fileRef.current.files[0].name).put(this.fileRef.current.files[0])
            const downloadUrl = await storage.ref().child('profile_pics').child(this.fileRef.current.files[0].name).getDownloadURL()
            const functionFb = functions.httpsCallable('editAccount')
            console.log(await functionFb({profilePic: downloadUrl, name, username: this.state.username}))
            
        }
       } catch (err) {
           console.log('an error occured, error')
       }
    }

    render() {
        if(this.state.data !== null) {
            return (
                <div>
                
                <Navbar history={this.props.history} />
                    <Typography variant='h3' className="account-header">My Account</Typography>
                    <form  id="account-form">
                    
                        {
                            this.state.data.usernameChanged - Date.now() >= 1296000000 ? (
                                <TextField variant='outlined' defaultValue={this.state.data.username} label='Username'
                                onChange={e => this.setState({username: e.target.value})}/>
                            ) : (
                                <TextField variant='outlined' defaultValue={this.state.data.username} disabled label='Username'/>
                            )
                        }
                        <br/>

                        <TextField label='Name' defaultValue={this.state.data.name} variant='outlined' style={{marginTop: 15}} />

                        <input type="file" name="" id="profile-img-input" ref={this.fileRef} style={{display: 'none'}}  />
                        <br/>
                        <Button variant='outlined' onClick={() => this.fileRef.current.click()} color='secondary' 
                        style={{marginTop: 15}}>Select Profile Image</Button>
                        <br/>
                        <Button type='submit' variant='contained' color='primary'  style={{marginTop: 15}}>Save Changes</Button>
                    </form>
                
                </div>
            )
        } else return null
    }
}