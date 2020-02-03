import * as actions from './actionTypes';

const dbRef = '/api/v1/cabins/index'

export const fetchCabinsStart = () => {
    return {
        type: actions.FETCH_CABINS_START
    }
}

export const fetchCabinsSuccess = cabinsArr => {
    return {
        type: actions.FETCH_CABINS_SUCCESS,
        cabinsArr
    }
}

export const fetchCabinsFail = error => {
    return {
        type: actions.FETCH_CABINS_FAIL,
        error
    }
}

export const fetchCabins = () => {
    return dispatch => {
        dispatch(fetchCabinsStart())
        fetch(dbRef)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                dispatch(fetchCabinsFail("network response was not ok"))
            })
            .then(res => dispatch(fetchCabinsSuccess(res)))
            .catch(() => this.props.history.push("/"))
    }
}

export const createCabin = () => {
    return {
        type: actions.CREATE_CABIN
    }
}

export const deleteCabin = () => {
    return {
        type: actions.DELETE_CABIN
    }
}

export const editCabin = () => {
    return {
        type: actions.EDIT_CABIN
    }
}