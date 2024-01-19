import { storage, cloudFunction } from '../../config/firebaseConfig';

export const addFriend = (name) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        /// dispatch to indicate initiation of request
        dispatch({
            type: "ADD_FRIEND_CALL_INIT",
            identifier: name
        });
        await cloudFunction.httpsCallable('friendMgm-addFriendOnCall')(
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

export const addFriendPicture = (uid, friendObject, picture) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        /// dispatch to indicate initiation of request
        dispatch({
            type: "ADD_PICTURE_CALL_INIT",
            identifier: friendObject.id
        });

        var reference = `Users/${uid}/Friends/${friendObject.id}_image.png`;
        var storageReference = storage.ref(reference);
        var metadata = {
            contentType: 'image/png',
        };
        
        await storageReference.put(picture, metadata)
        await storageReference.getDownloadURL().then(async (downloadURL) => {
            await firestore.collection('Friends').doc(uid).update({
                [`list.${friendObject.id}`]: {
                    ...friendObject,
                    dp: downloadURL
                }
            });

            dispatch({
                type: "ADD_PICTURE_CALL_DONE",
            });
        }).catch(async (error) => {
            console.error(error);
            dispatch({
                type: "ADD_PICTURE_CALL_FAILED",
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
            identifier: friendId
        });
        await cloudFunction.httpsCallable('friendMgm-removeFriendOnCall')(
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