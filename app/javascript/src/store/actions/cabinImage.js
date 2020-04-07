import * as actions from './actionTypes';
import axios from 'axios'

export const fetchCabinImages = () => {
    const url = "/api/v1/cabin_image/index";
    return dispatch => {
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    dispatch(fetchCabinImagesFail())
                }})
            .then(res => dispatch(fetchCabinImagesSuccess(res)))
    }
}

export const fetchCabinImagesSuccess = res => {
    return {
        type: actions.FETCH_CABIN_IMAGES_SUCCESS,
        res
    }
}

export const fetchCabinImagesFail = () => {
    return {
        type: actions.FETCH_CABIN_IMAGES_FAIL,
    }
}

export const addCabinImage = (cabin_id, image) => {
    const url = `/api/v1/cabin_image/create`;
    const body = new FormData();
    body.append('cabin_id', cabin_id)
    body.append('image', image)
    const token = document.querySelector('meta[name="csrf-token"]').content;
    return dispatch => {
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token
            },
            body: body
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                dispatch(addCabinImageFail())
            }
        })
    }
}

export const addCabinImageSuccess = () => {
    return {
        type: actions.LOADING_FINISH
    }
}

export const addCabinImageFail = () => {
    return {
        type: actions.LOADING_FINISH
    }
}

export const deleteCabinImage = id => {
    const url = `/api/v1/cabin_image/destroy/${id}`;
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
                    dispatch(deleteCabinImageSuccess())
                }
            dispatch(deleteCabinImageFail())
        })
    }
}

export const deleteCabinImageSuccess = () => {
    return {
        type: actions.LOADING_FINISH
    }
}

export const deleteCabinImageFail = () => {
    return {
        type: actions.LOADING_FINISH
    }
}