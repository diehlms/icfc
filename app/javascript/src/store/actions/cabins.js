import * as actions from './actionTypes';
import axios from 'axios'

export const fetchCabins = () => {
    const url = "/api/v1/cabins/index";
    return dispatch => {
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    dispatch(fetchCabinsFail())
                }})
            .then(res => dispatch(fetchCabinsSuccess(res)))
    }
}

export const fetchCabinsSuccess = res => {
    return {
        type: actions.FETCH_CABINS_SUCCESS,
        res
    }
}

export const fetchCabinsFail = () => {
    return {
        type: actions.FETCH_CABINS_FAIL,
    }
}

export const createCabin = (name, bedrooms, description, user_id, washerdryer, dock, price_per_day, price_per_week) => {
    const url = "/api/v1/cabins/create";
    const body = {
        "name": name,
        "bedrooms": bedrooms,
        "description": description,
        "user_id": user_id,
        "washerdryer": washerdryer,
        "dock": dock,
        "price_per_day": price_per_day,
        "price_per_week": price_per_week
    }
    const token = document.querySelector('meta[name="csrf-token"]').content;
    return dispatch => {
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                dispatch(createCabinFail())
            }
        })
        .then(res => dispatch(createCabinSuccess(res)))
    }
}

export const addCabinImage = (cabin_id, image) => {
    const url = `/api/v1/cabins/${cabin_id}`;
    const body = new FormData();
    body.append('cabin_id', cabin_id)
    body.append('image', image)
    const token = document.querySelector('meta[name="csrf-token"]').content;
    return dispatch => {
        axios.put(url, {
              headers: {
                "X-CSRF-Token": token,
              },
              body: body
            })
            .then(res => {
                if (res.ok) {
                    dispatch(addCabinImageSuccess())
                }
            dispatch(addCabinImageFail())
        })
    }
}

export const addCabinImageSuccess = () => {
    return {
        type: actions.ADD_CABIN_IMAGE_SUCCESS
    }
}

export const addCabinImageFail = () => {
    return {
        type: actions.ADD_CABIN_IMAGE_FAIL
    }
}

export const createCabinSuccess = res => {
    return {
        type: actions.CREATE_CABIN_SUCCESS,
        res
    }
}

export const createCabinFail = err => {
    return {
        type: actions.CREATE_CABIN_FAIL,
    }
}

export const editCabin = () => {
    return {
    }
}

export const editCabinSuccess = () => {
    return {
    }
}

export const editCabinFail = () => {
    return {

    }
}

export const deleteCabin = id => {
    const url = `/api/v1/cabins/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    return dispatch => {
        axios.delete(url, {
              headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
              }
            })
            .then(res => {
                if (res.ok) {
                    dispatch(deleteCabinSuccess())
                }
            dispatch(deleteCabinFail())
        })
    }
}

export const deleteCabinSuccess = () => {
    return {
        type: actions.DELETE_CABIN_SUCCESS
    }
}

export const deleteCabinFail = () => {
    return {
        type: actions.DELETE_CABIN_FAIL
    }
}