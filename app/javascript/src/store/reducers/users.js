import * as actions from '../actions/actionTypes'

const initialState = {
    users: [],
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.FETCH_USERS_START: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.FETCH_USERS_SUCCESS: {
            return [
                state, {
                    loading: false,
                    users: action.usersArr
                }
            ]
        }
        case actions.FETCH_USERS_FAIL: {
            return [
                state, {
                    loading: false,
                    error: action.error
                }
            ]
        }
        case actions.CREATE_USER: {
            return state
        }
        case actions.DELETE_USER: {
            return state
        }
        case actions.EDIT_USER: {
            return state
        }
        default: return state
    } 
}