import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'
import { removeFriend } from '../../../store/actions/apiActions'

const FriendCard = (props) => {
    const { name, id, dp } = props.eachFriend

    const handleRemove = (friendId) => {
        console.log(friendId)
        props.removeFriend(friendId)
    }

    return (
        <ListItem
            key={id}
            secondaryAction={
                <>
                    <Button variant="contained" color="primary" size='small'>
                        Upload picture
                    </Button>
                    <span style={{ padding: '10px' }}></span>
                    <Button variant="outlined" color="error" size='small' onClick={(e) => { handleRemove(id) }}>
                        Remove
                    </Button>
                </>
            }
            disablePadding
        >
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar
                        alt={`${name}`}
                        src={`${dp}`}
                    />
                </ListItemAvatar>
                <ListItemText id={id} primary={`${name}`} secondary={`ID: ${id}`} />
            </ListItemButton>
        </ListItem>
    )
}

const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeFriend: (friendId) => dispatch(removeFriend(friendId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FriendCard);