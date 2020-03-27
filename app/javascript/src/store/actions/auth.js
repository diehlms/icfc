import * as actions from './actionTypes'
import axios from 'axios'

export const logout = () => {
    const url = `/sessions/destroy`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    return dispatch => {
        axios.delete(url, {
              headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
              }
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    dispatch(logoutFail())
                }
            dispatch(logoutSuccess())
        })
    }
}

export const logoutSuccess = () => {
    window.location.reload(false)
    return {
        type: actions.LOGOUT_SUCCESS
    }
}

export const logoutFail = () => {
    window.location.reload(false)
    return {
        type: actions.LOGOUT_FAIL
    }
}

export const checkAuthStateSuccess = () => {
    return {
        type: actions.CHECK_AUTH_STATE_SUCCESS
    }
}

export const checkAuthStateFail = () => {
    return {
        type: actions.CHECK_AUTH_STATE_FAIL
    }
}


export const checkAuthState = () => {
    return {
        type: actions.CHECK_AUTH_STATE
    }
}