import * as actions from './actionTypes';

const dbRef = '/api/v1/users/index'

export const fetchUsersStart = () => {
    return {
        type: actions.FETCH_USERS_START
    }
}

export const fetchUsersSuccess = usersArr => {
    return {
        type: actions.FETCH_USERS_SUCCESS,
        usersArr
    }
}

export const fetchUsersFail = error => {
    return {
        type: actions.FETCH_USERS_FAIL,
        error
    }
}

export const fetchUsers = () => {
    return dispatch => {
        dispatch(fetchUsersStart())
        fetch(dbRef)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                dispatch(fetchUsersFail("network response was not ok"))
            })
            .then(res => dispatch(fetchUsersSuccess(res)))
            .catch(() => this.props.history.push("/"))
    }
}

export const createUser = () => {
    return {
        type: actions.CREATE_USER
    }
}

export const deleteUser = () => {
    return {
        type: actions.DELETE_USER
    }
}

export const editUser = () => {
    return {
        type: actions.EDIT_USER
    }
}