import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from '@mui/material'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addFriend } from '../../../store/actions/apiActions'

const AddFriend = (props) => {
    const { apiControl } = props
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const addFriend = (friendObject) => {
        props.addFriend(friendObject)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (name.trim() === '') {
            setNameError('Name cannot be empty');
            return;
        } else {
            setNameError('');
        }

        if (description.trim() === '') {
            setDescriptionError('Description cannot be empty');
            return;
        } else {
            setDescriptionError('');
        }

        console.log('Submitted Name:', name);
        console.log('Submitted Description:', description);

        addFriend({ friend: name, description })

        setName('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                size='small'
                label="Name"
                variant="outlined"
                disabled={apiControl.addFriendLoader.length > 0}
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={Boolean(nameError)}
                helperText={nameError}
            />
            <TextField
                sx={{ marginTop: '10px' }}
                size='small'
                label="Description"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={Boolean(descriptionError)}
                helperText={descriptionError}
            />
            <Button
                size='small'
                type="submit"
                variant="contained"
                color="primary"
                disabled={apiControl.addFriendLoader.length > 0}
                style={{ marginTop: '10px' }}
            >
                {apiControl.addFriendLoader.length > 0 ? "Adding..." : "Add friend"}
            </Button>
        </form>
    );
}

const mapStateToProps = (state) => {
    return {
        apiControl: state.apiControl,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addFriend: (friendObject) => dispatch(addFriend(friendObject)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddFriend);