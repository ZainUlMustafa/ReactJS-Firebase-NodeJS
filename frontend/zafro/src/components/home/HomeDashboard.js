import React from 'react'
import { connect } from "react-redux";
import { Container, Toolbar, Grid, Typography } from '@mui/material';
import SensorSection from './components/sensors/SensorSection';
import GlassBeaker from '../cidgets/waterBeaker/GlassBeaker';
import WaterGatesStatus from './components/sensors/WaterGatesStatus';
import LogViewer from '../cidgets/LogViewer';
import { get } from "lodash";

const HomeDashboard = (props) => {
  const { sensorsData } = props;

  // const logs = [
  //   { timestamp: '2023-06-12 10:05:32', message: 'Beaker A filled up' },
  //   { timestamp: '2023-06-12 10:07:15', message: 'Beaker A emptied' },
  //   { timestamp: '2023-06-12 10:10:22', message: 'Beaker B filled up' },
  //   { timestamp: '2023-06-12 10:12:01', message: 'Beaker B emptied' },
  // ];

  // console.log(props.sensorLogs)

  return (
    <div style={{ backgroundColor: '', height: '100vh' }}>
      <Grid container>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    themeColors: state.theme,
    userData: state.firebase.profile,
    project: state.project,
    sensorsData: state.firestore.data.SensorsData,
    sensorLogs: get(state.firebase.data, `logs`),
  };
};


export default connect(mapStateToProps)(HomeDashboard);
