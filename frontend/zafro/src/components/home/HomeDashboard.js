import React from 'react'
import { connect } from "react-redux";
import { Container, Toolbar, Grid, Typography } from '@mui/material';
import LogViewer from '../cidgets/LogViewer';
import { get } from "lodash";
import FriendsList from './components/FriendsList';
import AddFriend from './components/AddFriend';

const HomeDashboard = (props) => {
  const { friendsData, writeChecksData, userData } = props;
  console.log(friendsData, writeChecksData)
  const listOfFriends = Object.values(friendsData?.list ?? {})
  return (
    <div style={{ backgroundColor: '', height: '100vh' }}>
      <Container sx={{ paddingTop: "100px", paddingInline: '20px' }}>
        <AddFriend />
        <br />
        <FriendsList listOfFriends={listOfFriends} uid={userData?.uid ?? ""} />
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state.firebase.data)
  return {
    themeColors: state.theme,
    userData: state.firebase.profile,
    project: state.project,
    friendsData: state.firestore.data.Friends,
    writeChecksData: get(state.firebase.data, `WriteChecks`),
  };
};


export default connect(mapStateToProps)(HomeDashboard);
