import React from 'react'
import { Box, List, ListItemAvatar, ListItem, ListItemText } from '@material-ui/core'
import { SearchRounded, Home, Add, AccountCircle, Message, Settings } from '@material-ui/icons'
import {PostDialogDesktop} from '../posts/PostDialogDesktop'
import {SearchForFriends} from '../search/SearchForFriends'

export const DashboardSideBar = ({history, users}) => {

    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState(false)    

    return (
       <Box style={{backgroundColor: 'white', borderRadius: '10px', marginTop: 20, height: '90%',
        width: 'fit-content', padding: 20, marginLeft: 200}}>
            <List>
            <ListItem>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="75" height="75" viewBox="0 0 200 200">
            <image x="8" y="17" width="184" height="166" xlinkHref="data:img/png;base64,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"/>
            <image id="Ellipse_1_copy_2" data-name="Ellipse 1 copy 2" x="38" y="67" width="126" height="33" xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAhCAYAAAAf+x+qAAACkklEQVR4nO2bu2pUURSGP09hsFALU9up4wuYWFgYRPACXh4hQtKZN8g7JFYm+AxJpSCCjeDtAUyMaay1MBZBm8iGdWA4zBA3e+39u8C/GRjY//p+1uyZM/tyYpUjMnQFuG2vl4BzwFngB/Ad2AU+AM/t9V9UtAxVeP+m8aeARWAFuJAB/AVYA54Bhxnjaihahuq8xzX+HrAOnM8oPtRXC7Bd4FGiaBma8HZT3p8BntrAEgBs/Jb5zRR65Shahqa8k2b8GSt+vbD4JL0G7gMHFbzHFS1Dc97hjD9pn5QaAJjvltWppWgZJLzDxj8BFioB9FqwOrUULYOEd7zx6etgqTJAryWr561oGWS8/W98+vuw4/BQkaP05Dly/JsULYOUt5/xi40BsHqPHP2iZZDy9jP+c+ZCgZf2gItOXtEySHnTjJ8TAWB15xx8omWQ86bG3xQB9PKoHy2DnDc1fl4McdXBI1oGOW9q/GUxxMjBI1oGOW9n23xKzTrUjpZBztvZOrFSpx1qR8sg5+0abJgcp58OHtEyyHk7O8Wh1DeH2tEyyHlT4z+JIXYcPKJlkPOmxr8TQ7x18IiWQc6bGv9SDOFRP1oGOW9q/Htbv1Voz+qXKloGOW+/O7cmglh39IqWQcr7fz++TOH34w/tOG5LrTifVY+WQco7fvQqnfLcbASwWemMerQMMt7h8ep0EvMVcK0iwBvgBvCrkn+0DBLe4Snb38BdO4tdQ8n3TsWmR8wg4Z10kyatI98CNpwBNsy3xTp1tAzNeaddoUqfjmXggT0JliiNf2h+NWd69AxNeac1vte2Pf4/BvYzi+/buJHd5FApWoYmvKX342dtb/nAdqjSXe2PwAtbncoyb6RoGfx5gT8dAP8ieuTKRQAAAABJRU5ErkJggg=="/>
          </svg>
          
          
          
            
            </ListItem>
            <ListItem button onClick={() => history.push('/')}>
            <ListItemAvatar><Home/></ListItemAvatar>
            <ListItemText>Dashboard</ListItemText>
        </ListItem>
                <ListItem button onClick={() => setSearch(true)}>
                    <ListItemAvatar><SearchRounded/></ListItemAvatar>
                    <ListItemText>Search for Friends</ListItemText>
                </ListItem>
                <ListItem button onClick={() => setOpen(true)}>
                    <ListItemAvatar><Add/></ListItemAvatar>
                    <ListItemText>Post</ListItemText>
                </ListItem>
                <ListItem button onClick={() => history.push('/messages')}>
                    <ListItemAvatar><Message/></ListItemAvatar>
                    <ListItemText>Direct Messages</ListItemText>
                </ListItem>
                <ListItem button onClick={() => history.push('/profile')}>
                    <ListItemAvatar><AccountCircle/></ListItemAvatar>
                    <ListItemText>Profile</ListItemText>
                </ListItem>
                <ListItem button onClick={() => history.push('/account')}>
                    <ListItemAvatar><Settings/></ListItemAvatar>
                    <ListItemText>Account</ListItemText>
                </ListItem>
            </List>

            <PostDialogDesktop open={open} handleClose={() => setOpen(false)} />
            <SearchForFriends open={search} data={users} handleClose={() => setSearch(false)} />
       </Box>
    )
}