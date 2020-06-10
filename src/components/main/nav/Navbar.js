import React from 'react'

import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, useMediaQuery } from '@material-ui/core'
import { Home, AccountCircle, Menu as MenuIcon } from '@material-ui/icons'
import {auth} from '../../../config/firebase'
import { MobileDrawer } from './MobileDrawer'

export const Navbar = ({ history }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [drawer, setDrawer] = React.useState(false)

    const drawerOpen = () => setDrawer(true)
    const drawerClose = () => setDrawer(false)

   

    const phone = useMediaQuery('(min-width: 620px)')
    return (
        <div>
            <AppBar position='sticky' >

                <Toolbar>

                    {!phone && (
                       <section>
                       <IconButton onClick={() => setDrawer(true)}><MenuIcon style={{ color: 'white' }}/></IconButton>
                       <MobileDrawer open={drawer} drawerClose={drawerClose} drawerOpen={drawerOpen} />
                       </section>
                    )}

                    <Typography variant='h5'>SwiftConnect</Typography>

                    <div className="nav-buttons">
                        <IconButton onClick={() => history.push('/')}><Home style={{ color: 'white' }} /></IconButton>
                        <IconButton onClick={handleClick}><AccountCircle style={{ color: 'white' }} /></IconButton>

                    </div>
                </Toolbar>

            </AppBar>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => history.push('/profile')}>Profile</MenuItem>
                <MenuItem onClick={() => history.push('/account')}>My account</MenuItem>
                <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
            </Menu>
        </div>
    )
}