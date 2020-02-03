import * as actions from './actionTypes';

const dbRef = '/api/v1/pictures/index'

export const fetchPicturesStart = () => {
    return {
        type: actions.FETCH_PICTURES_START
    }
}

export const fetchPicturesSuccess = picturesArr => {
    return {
        type: actions.FETCH_PICTURES_SUCCESS,
        picturesArr
    }
}

export const fetchPicturesFail = error => {
    return {
        type: actions.FETCH_PICTURES_FAIL,
        error
    }
}

export const fetchPictures = () => {
    return dispatch => {
        dispatch(fetchPicturesStart())
        fetch(dbRef)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                dispatch(fetchPicturesFail("network response was not ok"))
            })
            .then(res => dispatch(fetchPicturesSuccess(res)))
            .catch(() => this.props.history.push("/"))
    }
}

export const createPicture = () => {
    return {
        type: actions.CREATE_PICTURE
    }
}

export const deletePicture = () => {
    return {
        type: actions.DELETE_PICTURE
    }
}