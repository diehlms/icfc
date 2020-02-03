import * as actions from '../actions/actionTypes'

const initialState = {
    comments: [],
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.FETCH_COMMENTS_START: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.FETCH_COMMENTS_SUCCESS: {
            return [
                state, {
                    loading: false,
                    comments: action.commentsArr
                }
            ]
        }
        case actions.FETCH_COMMENTS_FAIL: {
            return [
                state, {
                    loading: false,
                    error: action.error
                }
            ]
        }
        case actions.CREATE_COMMENT: {
            return state
        }
        case actions.DELETE_COMMENT: {
            return state
        }
        default: return state
    } 
}