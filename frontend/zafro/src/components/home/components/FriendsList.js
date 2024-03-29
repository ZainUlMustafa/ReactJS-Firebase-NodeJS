import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import FriendCard from './FriendsCard'

const FriendsList = ({ uid = "", listOfFriends = [] }) => {
    if (listOfFriends.length === 0) {
        return <p>No friends added</p>
    }
    return (
        <>
            <p style={{fontWeight: 'bold'}}>Friends ({listOfFriends.length})</p>
            <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {listOfFriends.sort((a, b) => a.name - b.name).map((eachFriend) => {
                    return (
                        <FriendCard key={eachFriend.id} eachFriend={eachFriend} uid={uid} />
                    )
                })}
            </List>
        </>
    )
}

export default FriendsList