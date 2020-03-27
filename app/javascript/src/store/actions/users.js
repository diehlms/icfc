import * as actions from './actionTypes';

export const fetchUsers = () => {
    const url = "/api/v1/users/index";
    return dispatch => {
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    dispatch(fetchUsersFail())
                }})
            .then(res => dispatch(fetchUsersSuccess(res)))
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