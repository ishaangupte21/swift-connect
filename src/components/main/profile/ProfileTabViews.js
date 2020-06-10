import React from 'react'
import { Typography, ListItem, List, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core'
import {Link} from 'react-router-dom'
import {db} from '../../../config/firebase'

export class FollowerTab extends React.Component {

    state = {
        followersNodes: []
    }

    componentDidMount() {
        this.props.followers.forEach(follower => {
            db.collection('users').doc(follower).get().then(doc => {
                let follow = [...this.state.followerNodes, doc.data()]
                this.setState({followerNodes: follow})
            })
        })
    }

    render() {
        if(this.state.followersNodes.length === 0) {
            return (
                <Typography variant='body1'>No Followers :(</Typography>
            )
        } else {
            return (
                <List>
                    {
                        this.state.followers.map(follower => (
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar variant='rounded' src={follower.photoURL}/>
                                
                                </ListItemAvatar>
                            
                                <ListItemText>
                                    <Link to={`/profiles/${follower.uid}`}><Typography variant='body1'>{follower.username}</Typography></Link>
                                </ListItemText>
                            </ListItem>
                        ))
                    }
                </List>
            )
        }
    }
}

export class FollowingTab extends React.Component {
    state={
        followingNodes: []
    }

    componentDidMount() {
        this.props.following.forEach(user => {
            db.collection('users').doc(user).get().then(doc => {
                let followers = [...this.state.followingNodes, doc.data()]
                this.setState({followingNodes: followers})
            })
        })
    }

    render() {
        if(this.state.followingNodes.length === 0) {
            return (
                <Typography variant='body1'>Not Following Anyone :(</Typography>
            )
        } else {
            return (
                <List>
                    {
                        this.state.followingNodes.map(user => (
                            <ListItem>
                            <ListItemAvatar>
                            <Avatar variant='rounded' src={user.photoURL}/>
                            
                            </ListItemAvatar>
                        
                            <ListItemText>
                                <Link to={`/profiles/${user.uid}`}><Typography variant='body1'>{user.username}</Typography></Link>
                            </ListItemText>
                        </ListItem>
                        ))
                    }
                </List>
            )

        }
    }
}

export class LatestView extends React.Component {

    state={
        posts: []
    }

    componentDidMount() {
        db.collection('posts').where("username", '==', this.props.uid).limit(5).get().then(docs => {
            docs.forEach(doc => {
                let posts = [...this.state.posts, doc.data()]
                this.setState({posts})
            })
        })
    }
}