import * as actions from '../actions/actionTypes'

const initialState = {
    events: [],
    loading: false,
    err: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.FETCH_EVENTS_SUCCESS: {
            return [
                state, {
                    events: action.res,
                    loading: false
                }
            ]
        }
        case actions.FETCH_EVENTS_FAIL: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        case actions.FETCH_EVENTS: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.CREATE_EVENT_SUCCESS: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        case actions.CREATE_EVENT: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.CREATE_EVENT_FAIL: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        default: return state
    }
}