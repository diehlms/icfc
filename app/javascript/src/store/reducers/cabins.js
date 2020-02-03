import * as actions from '../actions/actionTypes'

const initialState = {
    cabins: [],
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.FETCH_CABINS_START: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.FETCH_CABINS_SUCCESS: {
            return [
                state, {
                    loading: false,
                    cabins: action.cabinsArr
                }
            ]
        }
        case actions.FETCH_CABINS_FAIL: {
            return [
                state, {
                    loading: false,
                    error: action.error
                }
            ]
        }
        case actions.CREATE_CABIN: {
            return state
        }
        case actions.DELETE_CABIN: {
            return state
        }
        case actions.EDIT_CABIN: {
            return state
        }
        default: return state
    } 
}