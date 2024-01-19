import { storage, cloudFunction } from '../../config/firebaseConfig';

export const addFriend = (name) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        /// dispatch to indicate initiation of request
        dispatch({
            type: "ADD_FRIEND_CALL_INIT",
        });
        await cloudFunction.httpsCallable('friendMgm-addFriend')(
            {
                "friend": name

            })
            .then(async (res) => {
                dispatch({
                    type: "ADD_FRIEND_CALL_DONE",
                });
            }).catch(async (error) => {
                console.error(error);
                dispatch({
                    type: "ADD_FRIEND_CALL_FAILED",
                });
            });
    }
};

export const removeFriend = (friendId) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        /// dispatch to indicate initiation of request
        dispatch({
            type: "REM_FRIEND_CALL_INIT",
        });
        await cloudFunction.httpsCallable('friendMgm-removeFriend')(
            {
                "friendId": friendId

            })
            .then(async (res) => {
                dispatch({
                    type: "REM_FRIEND_CALL_DONE",
                });
            }).catch(async (error) => {
                console.error(error);
                dispatch({
                    type: "REM_FRIEND_CALL_FAILED",
                });
            });
    }
};