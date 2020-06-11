import React from 'react'
import { Typography, Avatar, Tabs, Tab, useMediaQuery, Box, useTheme } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'


export const UserView = ({data}) => {
   
   

    return (
        <section id='user-view'>
        
        <Typography variant='h6'>{data.username}</Typography> 
        <Avatar src={data.photoURL} variant='rounded' />
        <br/>
            
 
        </section>
    )
}