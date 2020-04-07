import * as actions from './actionTypes';

export const fetchArticles = () => {
    const url = "/api/v1/articles/index";
    return dispatch => {
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    dispatch(fetchArticlesFail())
                }})
            .then(res => dispatch(fetchArticlesSuccess(res)))
    }
}

export const fetchArticlesInit = () => {
    return {
        type: actions.LOADING_START
    }
}

export const fetchArticlesSuccess = res => {
    return {
        type: actions.FETCH_ARTICLES_SUCCESS,
        res
    }
}

export const fetchArticlesFail = () => {
    return {
        type: actions.FETCH_ARTICLES_FAIL,
    }
}

export const createArticle = (title, content, userId, image) => {
    return dispatch => {
        dispatch(createArticleInit());
        const url = "/api/v1/articles/create";
        const token = document.querySelector('meta[name="csrf-token"]').content;
        if(image !== null){
            let body = new FormData();
            body.append('title', title);
            body.append('content', content);
            body.append('user_id', userId);
            body.append('image', image);
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
                    dispatch(createArticleFail())
                }
            })
            .then(res => dispatch(createArticleSuccess(res)))
        } else {
            let body = {
                "title": title,
                "content": content,
                "user_id": userId,
            }
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
                    dispatch(createArticleFail())
                }
            })
            .then(res => dispatch(createArticleSuccess(res)))
            }
        }   
}

export const createArticleInit = () => {
    return {
        type: actions.LOADING_START
    }
}

export const createArticleSuccess = res => {
    return {
        type: actions.LOADING_FINISH,
        res
    }
}

export const createArticleFail = err => {
    return {
        type: actions.LOADING_FINISH,
    }
}

export const deleteArticle = id => {
    const url = `/api/v1/articles/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    return dispatch => {
        dispatch(deleteArticleInit())
        fetch(url, {
            method: "DELETE",
            headers: {
              "X-CSRF-Token": token,
              "Content-Type": "application/json"
            }
        })
        .then(response => {
        if (response.ok) {
            return response.json();
        }
            dispatch(deleteArticleFail())
        })
        .then(dispatch(deleteArticleSuccess()))
        .catch(error => console.log(error.message));
    }
}

export const deleteArticleInit = () => {
    return {
        type: actions.LOADING_START
    }
}

export const deleteArticleSuccess = () => {
    return {
        type: actions.LOADING_FINISH
    }
}

export const deleteArticleFail = () => {
    return {
        type: actions.LOADING_FINISH
    }
}