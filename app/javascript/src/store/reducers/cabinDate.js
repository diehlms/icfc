import * as actions from '../actions/actionTypes'

const initialState = {
    cabin_dates: [],
    loading: false,
    err: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.FETCH_CABIN_DATES_SUCCESS: {
            return [
                state, {
                    cabin_dates: action.res,
                    loading: false
                }
            ]
        }
        case actions.FETCH_CABIN_DATES_FAIL: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        case actions.FETCH_CABIN_DATES: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        default: return state
    }
}