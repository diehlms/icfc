import * as actions from '../actions/actionTypes'

const initialState = {
    successMessages: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.SET_SUCCESS_MESSAGES: {
            return [
                state, {
                    successMessages: action.successMessages,
                    loading: false
                }
            ]
        }
        case actions.CLEAR_SUCCESS_MESSAGES: {
            return [
                state, {
                    successMessages: null
                }
            ]
        }
        default: return state
    }
}