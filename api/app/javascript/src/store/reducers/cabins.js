import * as actions from '../actions/actionTypes'

const initialState = {
    cabins: [],
    loading: false,
    err: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.FETCH_CABINS_SUCCESS: {
            return [
                state, {
                    cabins: action.res,
                    loading: false
                }
            ]
        }
        case actions.FETCH_CABINS_FOR_USER_SUCCESS: {
            const filteredCabins = action.res.filter(cabin => {
                return cabin.userId === action.userId;
            });
            return [
                state, {
                    cabins: filteredCabins,
                    loading: false
                }
            ]
        }
        case actions.FETCH_CABINS_FAIL: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        case actions.FETCH_CABINS: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.CREATE_CABIN_SUCCESS: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        case actions.CREATE_CABIN: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.CREATE_CABIN_FAIL: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        default: return state
    }
}