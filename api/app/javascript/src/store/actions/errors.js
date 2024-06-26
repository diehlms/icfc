import * as actions from './actionTypes';

export const setErrors = errors => {
    return {
        type: actions.SET_ERRORS,
        errors
    }
}

export const clearErrors = () => {
    return {
        type: actions.CLEAR_ERRORS
    }
}