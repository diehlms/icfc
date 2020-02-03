import * as actions from '../actions/actionTypes'

const initialState = {
    pictures: [],
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.FETCH_PICTURES_START: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.FETCH_PICTURES_SUCCESS: {
            return [
                state, {
                    loading: false,
                    pictures: action.picturesArr
                }
            ]
        }
        case actions.FETCH_PICTURES_FAIL: {
            return [
                state, {
                    loading: false,
                    error: action.error
                }
            ]
        }
        case actions.CREATE_PICTURE: {
            return state
        }
        case actions.DELETE_PICTURE: {
            return state
        }
        default: return state
    } 
}