import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'
import { addFriendPicture, removeFriend } from '../../../store/actions/apiActions'

const FriendCard = (props) => {
    const { name, id, dp } = props.eachFriend
    const { uid, apiControl } = props

    const handleRemove = () => {
        props.removeFriend(id)
    }

    const handleAttachPicture = async () => {
        try {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.click();

            input.addEventListener('change', async (event) => {
                const file = event.target.files[0];
                console.log(`Attaching picture for item with id: ${id}`, file);

                props.addFriendPicture(uid, props.eachFriend, file)
            });
        } catch (error) {
            console.error('Error attaching picture:', error);
        }
    };

    if ((uid ?? "").length === 0) {
        return <>Error</>
    }

    return (
        <ListItem
            key={id}
            secondaryAction={
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        size='small'
                        onClick={(e) => handleAttachPicture()}>
                        Upload picture
                    </Button>
                    <span style={{ padding: '10px' }}></span>
                    <Button
                        variant="outlined"
                        color="error"
                        size='small'
                        disabled={apiControl.remFriendLoader === id}
                        onClick={(e) => { handleRemove() }}>
                        {apiControl.remFriendLoader === id ? "Removing..." : "Remove"}
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
        apiControl: state.apiControl,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeFriend: (friendId) => dispatch(removeFriend(friendId)),
        addFriendPicture: (uid, friendId, picture) => dispatch(addFriendPicture(uid, friendId, picture))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FriendCard);