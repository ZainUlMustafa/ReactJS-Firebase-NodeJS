import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, firestoreConnect } from "react-redux-firebase";
import PrimaryAppBar from "./laptopDrawer/PrimaryAppBar";
import { useLocation } from "react-router-dom";
import { get } from "lodash";

const SignedInDrawer = (props) => {
  const location = useLocation();
  const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
  const possibleProid = getLastItem(location.pathname)
  const isProid = possibleProid.includes('webproj')
  const { Child, isEmailVerified, isSignedIn, themeRed } = props;
  useEffect(() => {

  }, [])

  return (
    <PrimaryAppBar proid={isProid ? possibleProid : '-1'} Child={Child} isEmailVerified={isEmailVerified} isSignedIn={isSignedIn} themeRed={themeRed} />
  )
};

const mapStateToProps = (state) => {
  // console.log(state.firebase.data)
  return {
    project: state.project,
    userData: state.firebase.profile,
    themeRed: state.themeRed,
    sensorLogs: get(state.firebase.data, `logs`),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {

  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    const { userData } = props;
    return [
      {
        collection: "Friends",
        doc: userData.uid,
        storeAs: "Friends",
      },
      {
        collection: "Notifications",
        where: [['uid', '==', userData?.uid ?? '-1']],
        storeAs: "GenNotifs",
      }
    ];
  }),
  firebaseConnect((props) => {
    const { userData } = props;

    return [
      `/WriteChecks/${userData?.uid}`
    ]
  }),
)(SignedInDrawer);
