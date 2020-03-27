import * as actions from '../actions/actionTypes'

const initialState = {
    isAuthed: true,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.LOGOUT: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.LOGOUT_SUCCESS: {
            return [
                state, {
                    isAuthed: false,
                    loading: false
                }
            ]
        }
        case actions.LOGOUT_FAIL: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        default: return state
    }
}