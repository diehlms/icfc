import * as actions from '../actions/actionTypes'

const initialState = {
    loading: false,
    results: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.SEARCH: {
            return [
                state, {
                    results: action.res,
                    loading: false
                }
            ]
        }
        case actions.SEARCH_COMPLETE: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        case actions.SEARCH_LOADING: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        default: return state
    }
}