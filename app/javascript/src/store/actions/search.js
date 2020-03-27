import * as actionTypes from './actionTypes'

export const search = search => {
    const url = `/search?utf8=✓&search=${search}`
    return dispatch => {
        fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                dispatch(searchComplete())
            }})
        .then(res => dispatch(searchComplete(res)))
    }
}

export const searchLoading = () => {
    return {
        type: actionTypes.SEARCH_LOADING
    }
}

export const searchComplete = () => {
    return {
        type: actionTypes.SEARCH_COMPLETE
    }
}