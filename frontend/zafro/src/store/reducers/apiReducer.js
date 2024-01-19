const initState = {
    addFriendLoader: "",
    remFriendLoader: "",
    dpFriendLoader: "",
}

const apiReducer = (state = initState, action) => {
    // //console.log(action);

    if (action.type === 'ADD_FRIEND_CALL_INIT') {
        return {
            ...state,
            addFriendLoader: action.identifier
        }
    } else if (action.type === 'ADD_FRIEND_CALL_DONE') {
        return {
            ...state,
            addFriendLoader: ""
        }

    } else if (action.type === 'ADD_FRIEND_CALL_FAILED') {
        return {
            ...state,
            addFriendLoader: ""
        }

    } else if (action.type === 'REM_FRIEND_CALL_INIT') {
        return {
            ...state,
            remFriendLoader: action.identifier
        }
    } else if (action.type === 'REM_FRIEND_CALL_DONE') {
        return {
            ...state,
            remFriendLoader: ""
        }

    } else if (action.type === 'REM_FRIEND_CALL_FAILED') {
        return {
            ...state,
            remFriendLoader: ""
        }
    } else if (action.type === 'ADD_PICTURE_CALL_INIT') {
        return {
            ...state,
            dpFriendLoader: action.identifier
        }
    } else if (action.type === 'ADD_PICTURE_CALL_DONE') {
        return {
            ...state,
            dpFriendLoader: ""
        }

    } else if (action.type === 'ADD_PICTURE_CALL_FAILED') {
        return {
            ...state,
            dpFriendLoader: ""
        }
    }

    return state;
}

export default apiReducer;