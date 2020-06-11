import React from 'react'
import {Dialog, DialogTitle, Button, TextField, IconButton, Typography} from '@material-ui/core'
import {Image} from '@material-ui/icons'
import Error from '../../../config/error'
import {storage, db, auth} from '../../../config/firebase'


export const PostDialogDesktop = ({open, handleClose}) => {
    const fileBtnRef = React.useRef()
    const [err, setErr] = React.useState('');
    const [username, setUsername] = React.useState(null)
    const [uid, setUid] = React.useState(null)
    const fileNameRef = React.useRef()
    const [photoURL, setPhotoURL] = React.useState(null)
    
    React.useMemo(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
               setUsername(user.displayName)
               setUid(user.uid),
               setPhotoURL(user.photoURL)
            }
        })

    
    })
    const handleSubmit = async e => {
        try {
            e.preventDefault()
            if(fileBtnRef.current.files.length !== 0) {
                const file = fileBtnRef.current.files[0]
                if(file.size >= 3000000) {
                    throw new Error('file too large', 'The file must be less than 3MB')
                }

                await storage.ref().child(`posts/${file.name}`).put(file)
                const downloadURL = await storage.ref().child(`posts/${file.name}`).getDownloadURL()
                await db.collection('posts').add({
                    username,
                    description: post,
                    systemTime: Date.now(),
                    imageURL: downloadURL,
                    uid,
                    likes: [],
                    photoURL
                })
                handleClose()
            } else {
                await db.collection('posts').add({
                    username,
                    description: post,
                    systemTime: Date.now(),
                    imageURL: null,
                    uid,
                    photoURL,
                    likes: []
                })
                handleClose()
            }
        } catch (err) {
            setErr(err.message)
        }
    }

    const [post, setPost] = React.useState('')
    const [filename, setFilename] = React.useState('')

    const disabled = () => {
       if(post.length === 0) {
           return {disabled: true}
       }
    }

    const fileChange = e => {
       if(e.target.files.length !== 0) {
        setFilename(e.target.files[0].name)
       } else {
           setFilename('')
       }
    } 

  

   

    return (
        <Dialog open={open} onClose={handleClose}  >
    
        <DialogTitle>Add a Post</DialogTitle>
        <form style={{padding: '2rem', paddingTop: 0}} onSubmit={handleSubmit}>
            
        <TextField variant='outlined' color='secondary' label="What's Going On?"  onChange={e => setPost(e.target.value)}/> <br/>

        <input type="file" name="" id="post-image-input" accept="image/*" style={{display: 'none'}} ref={fileBtnRef} onChange={fileChange}/>
        
       <div className="post-form-btns">
       
       <IconButton onClick={() => fileBtnRef.current.click()}><Image/></IconButton>
      
       <Button type='submit' variant='contained' color='primary' style={{marginTop: '1rem'}}
        className='post-add-btn' {...disabled()}>Post</Button>

        <Typography variant='body2' id="post-add-file-name-text" ref={fileNameRef}>{filename}</Typography>
      
       </div>
       </form> 



    
    </Dialog>
    )
}