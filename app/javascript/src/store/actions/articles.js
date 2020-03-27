import * as actions from './actionTypes';
import axios from 'axios';

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

export const postImage = () => {
    return {

    }
}

export const createArticleSuccess = res => {
    return {
        type: actions.CREATE_ARTICLE_SUCCESS,
        res
    }
}

export const createArticleFail = err => {
    return {
        type: actions.CREATE_ARTICLE_FAIL,
    }
}

export const editArticle = () => {
    return {
    }
}

export const editArticleSuccess = () => {
    return {
    }
}

export const editArticleFail = () => {
    return {

    }
}

export const deleteArticle = id => {
    const url = `/api/v1/articles/destroy/${id}`;
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
                    return res.json()
                } else {
                    dispatch(deleteArticleFail())
                }
            dispatch(deleteArticleSuccess())
        })
    }
}

export const deleteArticleSuccess = () => {
    return {
        type: actions.DELETE_ARTICLE_SUCCESS
    }
}

export const deleteArticleFail = () => {
    return {
        type: actions.DELETE_ARTICLE_FAIL
    }
}