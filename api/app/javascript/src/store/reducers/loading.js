import * as actions from '../actions/actionTypes'

const initialState = {
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.LOADING_START: {
            return {
                ...state,
                loading: true
            }
        }
        case actions.LOADING_FINISH: {
            return {
                ...state,
                loading: false
            }
        }
        default: return state
    }
}