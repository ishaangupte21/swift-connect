import React from 'react'
import { db, auth } from '../../../config/firebase'
import {Navbar} from '../nav/Navbar'
import {UserView} from './UserView'
import {UserTabs} from './UserTabs'
export default class OtherUserProfile extends React.Component {
    state ={ 
        listener: null,
        data: null,
        dataForLatest: null
    }
    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    listener: db.collection('users').doc(this.props.match.params.id).onSnapshot(doc => {
                        this.setState({data: doc.data()})
                    })
                })
                db.collection('posts').where('uid', '==', this.props.match.params.id).get().then(data => {
                    const array = []
                    data.forEach(post => array.push(post))
                    this.setState({dataForLatest: array})
                })
              
            } else {
                this.props.history.push('/')
            }

            
        })
    }

    render() {
        if(this.state.data !== null  && this.state.dataForLatest !== null) {
            return (
                <div>
                <Navbar history={this.props.history} />
                <UserView data={this.state.data} />
                <UserTabs data={this.state.data} latest={this.state.dataForLatest} />

                </div>
            )
        } else return null
    }
}