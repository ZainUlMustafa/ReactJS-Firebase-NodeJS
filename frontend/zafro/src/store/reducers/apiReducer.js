const initState = {
    addFriendLoader: false,
    remFriendLoader: false,
}

const apiReducer = (state = initState, action) => {
    // //console.log(action);

    if (action.type === 'ADD_FRIEND_CALL_INIT') {
        return {
            ...state,
            addFriendLoader: true
        }
    } else if (action.type === 'ADD_FRIEND_CALL_DONE') {
        return {
            ...state,
            addFriendLoader: false
        }

    } else if (action.type === 'ADD_FRIEND_CALL_FAILED') {
        return {
            ...state,
            addFriendLoader: false
        }

    } else if (action.type === 'REM_FRIEND_CALL_INIT') {
        return {
            ...state,
            remFriendLoader: true
        }
    } else if (action.type === 'REM_FRIEND_CALL_DONE') {
        return {
            ...state,
            remFriendLoader: false
        }

    } else if (action.type === 'REM_FRIEND_CALL_FAILED') {
        return {
            ...state,
            remFriendLoader: false
        }

    }

    return state;
}

export default apiReducer;