const initState = {
    addFriendLoader: "",
    remFriendLoader: "",
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

    }

    return state;
}

export default apiReducer;