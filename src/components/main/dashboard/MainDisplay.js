import React from 'react'
import {Card, CardActions, CardContent, CardHeader, Avatar, Typography, CardMedia, List, ListItem, IconButton, Dialog,
DialogActions, DialogContent, TextField, DialogTitle, Button, Tooltip } from '@material-ui/core'
import {Share as ShareIcon, Favorite as FavoriteIcon, FileCopy as FileCopyIcon} from '@material-ui/icons'
import Carousel from 'react-material-ui-carousel'
import { auth, functions } from '../../../config/firebase'
import { Link } from 'react-router-dom'

export const MainDisplayCarousel = ({data}) => {



    if(data !== null) {
        return (
            
                <List>
                
                {
                    data.docs.map(post => (<Item post={post} key={post.data().systemTime}/>))
                }
                </List>
            
        
        )
    } else return null
} 

export const Item = ({post}) => {

    const [uid, setUid] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                setUid(user.uid)
            }
        })
    })

    const like = async id => {
        try {
            const likeFunction = functions.httpsCallable('likePost')
            await likeFunction({postId:id })
        } catch (err) {
            console.log('an error occured', err)
        }
    }

    const [share, setShare] = React.useState(false);


   if(post.data().imageURL !== null) {
    return (
        <div>
        <ListItem>
        <Card style={{width: '100%'}}>
         
        <CardHeader avatar={<Avatar src={post.data().photoURL}/>} title={(<Link style={{textDecoration: 'none', color: 'black'}} to={`/profile/${post.data().uid}`}>{post.data().username}</Link>)}
         subheader={new Date(post.data().systemTime).toDateString()}/>
        
         
        <CardMedia image={post.data().imageURL} style={{height: 200}}/>
         
 
        <CardContent>
        
            <Typography variant='body2'>{post.data().description}</Typography>
        
        </CardContent>

        <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => {like(post.id)}}>
          {
              post.data().likes.includes(uid) ? (<FavoriteIcon style={{color: 'red'}}/>) : (<FavoriteIcon />)
          }
          <Typography variant='body1' style={{marginLeft: 10}}>{post.data().likes.length}</Typography>
        </IconButton>
        <IconButton aria-label="share" onClick={() => setOpen(true)}>
          <ShareIcon />
        </IconButton>
       
      </CardActions>
 
    </Card>
        
        </ListItem>

        <ShareModal open={open} id={post.id} onClose={() => setOpen(false)} />
        </div>
     )
   } else {
      
        return (
          <div>
          <ListItem>
          <Card style={{width: '100%'}}>
           
          <CardHeader avatar={<Avatar src={post.data().photoURL}/>} title={(<Link style={{textDecoration: 'none', color: 'black'}} to={`/profile/${post.data().uid}`}>{post.data().username}</Link>)}
           subheader={new Date(post.data().systemTime).toDateString()}/>
          
          
   
          <CardContent>
          
              <Typography variant='body2'>{post.data().description}</Typography>
          
          </CardContent>

          <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={() => {like(post.id)}}>
            {
                post.data().likes.includes(uid) ? (<FavoriteIcon style={{color: 'red'}}/>) : (<FavoriteIcon />)
            }

            <Typography variant='body1' style={{marginLeft: 10}}>{post.data().likes.length}</Typography>
          </IconButton>
          <IconButton aria-label="share" onClick={() => setOpen(true)}>
            <ShareIcon />
          </IconButton>
         
        </CardActions>
   
      </Card>
          
          </ListItem>
          <ShareModal open={open} id={post.id} onClose={() => setOpen(false)} />
          </div>
         )
       
   }
}

   export const ShareModal = ({id, open, onClose}) => {
    const inputRef = React.useRef()

    const copy = () => {
        const copyTest = inputRef.current.childNodes[1].childNodes[0]
        copyTest.select()
        copyTest.setSelectionRange(0, 99999)
        document.execCommand('copy')
    }

    return (
        <div>
            <Dialog open={open} onClose={onClose}>

                <DialogTitle>Share</DialogTitle>
            <DialogContent>
            
            <TextField InputProps={{readOnly: true}} label='Share' defaultValue={`https:/rinosocial.com/posts/${id}`} color="primary" ref={inputRef}/>
           
            <Tooltip title="Copy">
            <IconButton style={{marginLeft: 15}} onClick={copy}><FileCopyIcon /></IconButton>
            </Tooltip>
            </DialogContent>

            <DialogActions>
            
            <Button onClick={onClose} color="secondary">
            Close
          </Button>
            
            </DialogActions>
            </Dialog>
        </div>
    )
}