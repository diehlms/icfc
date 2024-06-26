import * as actions from '../actions/actionTypes'

const initialState = {
    users: [],
    loading: false,
    err: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.FETCH_USERS_SUCCESS: {
            return [
                state, {
                    users: action.res,
                    loading: false
                }
            ]
        }
        case actions.FETCH_USERS_FAIL: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        case actions.FETCH_USERS: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        default: return state
    }
}