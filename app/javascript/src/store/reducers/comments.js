import * as actions from '../actions/actionTypes'

const initialState = {
    comments: [],
    loading: false,
    err: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.FETCH_COMMENTS_SUCCESS: {
            return [
                state, {
                    comments: action.res,
                    loading: false
                }
            ]
        }
        case actions.FETCH_COMMENTS_FAIL: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        case actions.FETCH_COMMENTS: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.CREATE_COMMENT_SUCCESS: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        case actions.CREATE_COMMENT: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.CREATE_COMMENT_FAIL: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        default: return state
    }
}