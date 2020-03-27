import * as actions from '../actions/actionTypes'

const initialState = {
    pictures: [],
    loading: false,
    err: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.FETCH_PICTURES_SUCCESS: {
            return [
                state, {
                    pictures: action.res,
                    loading: false
                }
            ]
        }
        case actions.FETCH_PICTURES_FAIL: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        case actions.FETCH_PICTURES: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.CREATE_PICTURE_SUCCESS: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        case actions.CREATE_PICTURE: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.CREATE_PICTURE_FAIL: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        default: return state
    }
}