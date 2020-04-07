import * as actions from './actionTypes';
import axios from 'axios'

export const fetchComments = () => {
    const url = "/api/v1/comments/index";
    return dispatch => {
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    dispatch(fetchCommentsFail())
                }})
            .then(res => dispatch(fetchCommentsSuccess(res)))
    }
}

export const fetchCommentsSuccess = res => {
    return {
        type: actions.FETCH_COMMENTS_SUCCESS,
        res
    }
}

export const fetchCommentsFail = () => {
    return {
        type: actions.FETCH_COMMENTS_FAIL,
    }
}

export const createComment = (user_id, article_id, content) => {
    return dispatch => {
        dispatch(createCommentInit())
        const url = "/api/v1/comments/create";
        let body = {
            'user_id': user_id,
            'article_id': article_id,
            'content': content,
        }
        console.log(body)
        const token = document.querySelector('meta[name="csrf-token"]').content;
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
                dispatch(createCommentFail())
            }
        })
        .then(res => dispatch(createCommentSuccess()))
    }
}

export const createCommentInit = () => {
    return {
        type: actions.LOADING_START
    }
}

export const createCommentSuccess = () => {
    return {
        type: actions.LOADING_FINISH
    }
}

export const createCommentFail = () => {
    return {
        type: actions.LOADING_FINISH,
    }
}

export const deleteComment = id => {
    const url = `/api/v1/comments/destroy/${id}`;
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
                    dispatch(deleteCommentSuccess())
                }
            dispatch(deleteCommentFail())
        })
    }
}

export const deleteCommentInit = () => {
    return {
        type: actions.LOADING_START
    }
}

export const deleteCommentSuccess = () => {
    return {
        type: actions.LOADING_FINISH
    }
}

export const deleteCommentFail = () => {
    return {
        type: actions.LOADING_FINISH
    }
}