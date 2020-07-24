import * as actions from './actionTypes';

export const fetchUsers = () => {
    const url = "/api/v1/users/index";
    return dispatch => {
        dispatch(fetchUsersInit());
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    dispatch(fetchUsersFinish()) &&
                    dispatch(fetchUsersFail());
                }})
            .then(res => 
                dispatch(fetchUsersSuccess(res)) &&
                dispatch(fetchUsersFinish())
            );
    }
}

export const fetchUsersInit = () => {
    return {
        type: actions.LOADING_START
    }
}

export const fetchUsersSuccess = res => {
    return {
        type: actions.FETCH_USERS_SUCCESS,
        res
    }
}

export const fetchUsersFail = () => {
    return {
        type: actions.FETCH_USERS_FAIL,
    }
}

export const fetchUsersFinish = () => {
    return {
        type: actions.LOADING_FINISH
    }
}

export const editUser = () => {
    return {
    }
}

export const editUserSuccess = () => {
    return {
    }
}

export const editUserFail = () => {
    return {

    }
}