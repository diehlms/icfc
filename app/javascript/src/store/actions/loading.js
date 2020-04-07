import * as actions from './actionTypes';

export const loadingStart = () => {
    return {
        type: actions.LOADING_START
    }
}

export const loadingFinish = () => {
    return {
        type: actions.LOADING_FINISH
    }
}