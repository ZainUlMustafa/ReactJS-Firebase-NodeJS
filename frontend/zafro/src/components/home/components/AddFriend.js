import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from '@mui/material'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addFriend } from '../../../store/actions/apiActions'

const AddFriend = (props) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const addFriend = (name) => {
        props.addFriend(name)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name.trim() === '') {
            setError('Name cannot be empty');
        } else {
            console.log('Submitted Name:', name);
            addFriend(name)
            setError('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                size='small'
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={Boolean(error)}
                helperText={error}
            />
            <Button
                size='small'
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '10px' }}
            >
                Add friend
            </Button>
        </form>
    );
}

const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addFriend: (name) => dispatch(addFriend(name)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddFriend);