import React from 'react'
import {auth, db} from '.././../../config/firebase'
import { Typography, ListItemAvatar } from '@material-ui/core'
import { Navbar } from '../nav/Navbar'
export default class Messages extends React.Component {

    state = {
        msgData: null,
        listener:null
    }


    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if(user) {
               this.setState({
                   listener:  db.collection('messages').where('members', 'array-contains', user.uid).onSnapshot(snap => {
                    this.setState({msgData: snap})
                   })
               })
            } else {
                this.props.history.push('/')
            }
        })
    }

    componentWillUnmount() {
        if(this.state.listener !== null) {
            this.state.listener()
        }
    }

    render() {
        if(this.state.msgData !== null) {
            return (
                <div>
                <Navbar history={this.props.history} />
                    <Typography variant='h3'>Direct Messages</Typography>
                
                </div>
            )
        } else return null
    }
}

const ListItem = ({data}) => {
    const [username, setUsername] = React.useState(null)


    // React.useEffect(() => {
    //     if(data !== null) {
    //         db.collection('messages').doc(data)
    //     }
    // })

    return (
        <div>
        
        <ListItem>
        
        
        </ListItem>
        </div>
    )
}