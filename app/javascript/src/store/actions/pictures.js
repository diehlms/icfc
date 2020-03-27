import * as actions from './actionTypes';
import axios from 'axios'

export const fetchPictures = () => {
    const url = "/api/v1/pictures/index";
    return dispatch => {
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    dispatch(fetchPicturesFail())
                }})
            .then(res => dispatch(fetchPicturesSuccess(res)))
    }
}

export const fetchPicturesSuccess = res => {
    return {
        type: actions.FETCH_PICTURES_SUCCESS,
        res
    }
}

export const fetchPicturesFail = () => {
    return {
        type: actions.FETCH_PICTURES_FAIL,
    }
}

export const createPicture = (caption, image, user_id) => {
    return dispatch => {
        const url = "/api/v1/pictures/create";
        let body = new FormData();
        body.append('image', image);
        body.append('caption', caption);
        body.append('user_id', user_id);
        const token = document.querySelector('meta[name="csrf-token"]').content;
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
                dispatch(createPictureFail())
            }
        })
        .then(res => dispatch(createPictureSuccess(res)))
    }
}


export const createPictureSuccess = res => {
    return {
        type: actions.CREATE_PICTURE_SUCCESS,
        res
    }
}

export const createPictureFail = err => {
    return {
        type: actions.CREATE_PICTURE_FAIL,
    }
}

export const editPicture = () => {
    return {
    }
}

export const editPictureSuccess = () => {
    return {
    }
}

export const editPictureFail = () => {
    return {

    }
}

export const deletePicture = id => {
    const url = `/api/v1/pictures/destroy/${id}`;
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
                    dispatch(deletePictureSuccess())
                }
            dispatch(deletePictureFail())
        })
    }
}

export const deletePictureSuccess = () => {
    return {
        type: actions.DELETE_PICTURE_SUCCESS
    }
}

export const deletePictureFail = () => {
    return {
        type: actions.DELETE_PICTURE_FAIL
    }
}