import React from 'react'
import { connect } from "react-redux";
import { Container, Toolbar, Grid, Typography } from '@mui/material';
import LogViewer from '../cidgets/LogViewer';
import { get } from "lodash";

const HomeDashboard = (props) => {
  const {friendsData, writeChecksData} = props;
  console.log(friendsData, writeChecksData)
  return (
    <div style={{ backgroundColor: '', height: '100vh' }}>
      <Grid container sx={{paddingTop: "100px", paddingInline: '20px'}}>
        {JSON.stringify(friendsData)}
      </Grid>
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
