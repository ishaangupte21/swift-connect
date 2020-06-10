import React from 'react'
import { Dialog, DialogTitle, DialogContent, Button, TextField } from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'
import { Link } from 'react-router-dom';
import { db } from '../../../config/firebase';

// export const SearchForFriends = ({open, handleClose, data}) => {

//     const [json, setJson] = React.useState([])

//     React.useEffect(() => {
//         if(data !== null) {
 
//             data.docs.forEach(doc => {
//                 let array = [...json, doc]
//                 setJson(array)
//             })
//         }
//     })

    
// }

export class SearchForFriends extends React.Component {

    state={
        json: []
    }

    componentDidMount() {
        if(this.props.data !== null) {
            this.props.data.docs.forEach(doc => {
                let array = [...this.state.json, doc]
                this.setState({json: array})
            })
        }
    }

    render() {
        if(this.props.data !== null) {
            return (
                <Dialog open={this.props.open} onClose={this.props.handleClose}  >
        
            <DialogTitle>Search for Friends</DialogTitle>
    
            <DialogContent>
            <Autocomplete id="profile-autocomplete" autoHighlight style={{width: 300}} 
                options={this.state.json}
                getOptionLabel={option => option.username}
                renderOption = {option => (
                    <React.Fragment>
                    <Link to={`/profile/${option.uid}`}> <span>{option.username}</span></Link>
    
                    </React.Fragment>
                )}
                renderInput = {params => (
                    <TextField variant='outlined' label='Enter a username to search' {...params} inputProps={{...params.inputProps}}/>
                )}
    
            />
            
            </DialogContent>
    
    
        
        </Dialog>
            ) 
        } else return null
    }
}