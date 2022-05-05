import * as actions from './actionTypes';

export const setSuccessMessages = successMessages => {
    return {
        type: actions.SET_SUCCESS_MESSAGES,
        successMessages
    }
}

export const clearSuccessMessages = () => {
    return {
        type: actions.CLEAR_SUCCESS_MESSAGES
    }
}