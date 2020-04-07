import * as actions from '../actions/actionTypes'

const initialState = {
    cabin_images: [],
    loading: false,
    err: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.FETCH_CABIN_IMAGES_SUCCESS: {
            return [
                state, {
                    cabin_images: action.res,
                    loading: false
                }
            ]
        }
        case actions.FETCH_CABIN_IMAGES_FAIL: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        case actions.FETCH_CABIN_IMAGES: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        default: return state
    }
}