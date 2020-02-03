import * as actions from './actionTypes';

const dbRef = '/api/v1/comments/index'

export const fetchCommentsStart = () => {
    return {
        type: actions.FETCH_COMMENTS_START
    }
}

export const fetchCommentsSuccess = CommentsArr => {
    return {
        type: actions.FETCH_COMMENTS_SUCCESS,
        CommentsArr
    }
}

export const fetchCommentsFail = error => {
    return {
        type: actions.FETCH_COMMENTS_FAIL,
        error
    }
}

export const fetchComments = () => {
    return dispatch => {
        dispatch(fetchCommentsStart())
        fetch(dbRef)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                dispatch(fetchCommentsFail("network response was not ok"))
            })
            .then(res => dispatch(fetchCommentsSuccess(res)))
            .catch(() => this.props.history.push("/"))
    }
}

export const createComment = () => {
    return {
        type: actions.CREATE_COMMENT
    }
}

export const deleteComment = () => {
    return {
        type: actions.DELETE_COMMENT
    }
}