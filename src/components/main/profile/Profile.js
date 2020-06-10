import React from 'react'
import {auth, db} from '../../../config/firebase'

import { UserView } from './UserView'
import { Navbar } from '../nav/Navbar'
import { UserTabs } from './UserTabs'

export default class Profile extends React.Component {

    state = {
        userData: null,
        listener: null,
        dataForLatest: null
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if(user) {
                this.setState({listener: db.collection('users').doc(user.uid).onSnapshot(doc => {
                    this.setState({userData: doc.data()})
                })
               
            })

            db.collection('posts').where('uid', '==', user.uid).get().then(data => {
                const array = []
                data.forEach(post => array.push(post))
                this.setState({dataForLatest: array})
            })
            } else {
                this.props.history.push('/login')
            }
        })
    }

    componentWillUnmount() {
        if(this.state.listener !== null) {
            this.state.listener()
        }
    }

    render() {
        if(this.state.userData !== null && this.state.dataForLatest !== null) {
            return (
                <div>
                <Navbar history={this.props.history} />
                <UserView data={this.state.userData} />
                <UserTabs data={this.state.userData} latest={this.state.dataForLatest}  />

                </div>
            )
        } else {
            return null
        }
    }
}