import * as actions from '../actions/actionTypes'

const initialState = {
    errors: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.SET_ERRORS: {
            return [
                state, {
                    errors: action.errors,
                    loading: false
                }
            ]
        }
        case actions.CLEAR_ERRORS: {
            return [
                state, {
                    errors: null
                }
            ]
        }
        default: return state
    }
}