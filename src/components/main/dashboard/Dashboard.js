import React from 'react';
import { Navbar } from '../nav/Navbar';
import { auth, db } from '../../../config/firebase';
import { MainDisplayCarousel } from './MainDisplay';
import { Grid, Typography } from '@material-ui/core';
import { DashboardSideBar } from './DashboardSideBar';

export default class Dashboard extends React.Component {

    state= {
        snaps: null,
        users: null
    }
    

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if(user) {
                db.collection('posts').orderBy('systemTime', 'desc').limit(20).onSnapshot(snap => {
                    this.setState({snaps: snap})
                })
                db.collection('users').get().then(data => this.setState({users: data}))
            } else {
                this.props.history.push('/login')
            }
        })
    }
    render() {
        return (
           <section style={{overflowX: 'hidden'}}>
           
           <div id="dashboard-pc"> 
           <Navbar history={this.props.history} />
           {
               //<MainDisplayCarousel data={this.state.snaps} />
            }

            <Grid container spacing={2}>
            
                <Grid item xs={3}>
                <DashboardSideBar history={this.props.history} users={this.state.users}/>

                </Grid>

                <Grid item xs={9} style={{paddingLeft: 300,  paddingRight: 200}}>
                <MainDisplayCarousel data={this.state.snaps} />
                
                </Grid>
            
            </Grid>
           </div>

           <div id="dashboard-phone"> 
           <Navbar history={this.props.history} />
           <MainDisplayCarousel data={this.state.snaps} />
           </div>
           
           </section>
        )
    }
}