import * as actions from '../actions/actionTypes'

const initialState = {
    events: [],
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.FETCH_EVENTS_START: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.FETCH_EVENTS_SUCCESS: {
            return [
                state, {
                    loading: false,
                    events: action.eventsArr
                }
            ]
        }
        case actions.FETCH_EVENTS_FAIL: {
            return [
                state, {
                    loading: false,
                    error: action.error
                }
            ]
        }
        case actions.CREATE_EVENT: {
            return state
        }
        case actions.DELETE_EVENT: {
            return state
        }
        case actions.EDIT_EVENT: {
            return state
        }
        default: return state
    } 
}