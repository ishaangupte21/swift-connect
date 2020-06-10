import React from 'react';
import {SwipeableDrawer, List, ListItem, ListItemAvatar, ListItemText, Typography, ListSubheader, Divider} from '@material-ui/core'
import { AddCircleOutline, SearchRounded, SearchOutlined } from '@material-ui/icons';
import {PostDialogMobile} from '../posts/mobile/PostDialogMobile'

export const MobileDrawer = ({open, drawerOpen, drawerClose}) => {
    const [postDialogMobile, setDialogMobile] = React.useState(false)
    const closePostDialog = () => setDialogMobile(false)
    return (
        <div id="post-dialog-mobile">

            <SwipeableDrawer open={open} onOpen={drawerOpen} onClose={drawerClose}>
                <List style={{marginTop: '5%'}}>
                <ListSubheader><Typography>Actions</Typography></ListSubheader>
                <ListItem button onClick={() => setDialogMobile(true)}>
                <ListItemAvatar>
                    <AddCircleOutline />
                </ListItemAvatar>
                <ListItemText><Typography variant='body1'>Add a Post</Typography></ListItemText>
                </ListItem>
                <Divider/>
                <ListItem button>
                <ListItemAvatar>
                    <SearchOutlined />
                </ListItemAvatar>
                <ListItemText><Typography variant='body1'>Search for Friends</Typography></ListItemText>
                </ListItem>
                
                </List>
            </SwipeableDrawer>

            <PostDialogMobile open={postDialogMobile} handleClose={closePostDialog} />
        
        </div>
    )
}