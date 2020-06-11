import React from 'react'
import { Typography, Avatar, Tabs, Tab, useMediaQuery, Box, useTheme, Button } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import { functions } from '../../../config/firebase'


export const UserViewOtherProfile = ({data, id, following}) => {
   
   const follow = () => {
       const followFunction = functions.httpsCallable('follow')
       followFunction({id}).then(res => console.log(res)).catch(err => console.error(err))
   }

   React.useEffect(() => {
       if(following !== null ) {
        console.log(following)
    }
   })

    return (
        <section id='user-view'>
        
        <Typography variant='h6'>{data.username}</Typography> 
        <Avatar src={data.photoURL} variant='rounded' />
        <br/>
            {following.includes(id) ? (
                <Button variant='outlined' color='secondary' size='small' onClick={follow}>UnFollow</Button>
            ) : (
                <Button variant='outlined' color='secondary' size='small' onClick={follow}>Follow</Button>
            )}
 
        </section>
    )
}