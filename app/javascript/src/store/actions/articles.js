import * as actions from './actionTypes';
import uuid from 'uuid'

const dbRef = '/api/v1/articles/index'

export const fetchArticlesStart = () => {
    return {
        type: actions.FETCH_ARTICLES_START
    }
}

export const fetchArticlesSuccess = articlesArr => {
    return {
        type: actions.FETCH_ARTICLES_SUCCESS,
        articlesArr
    }
}

export const fetchArticlesFail = error => {
    return {
        type: actions.FETCH_ARTICLES_FAIL,
        error
    }
}

export const fetchArticles = () => {
    return dispatch => {
        dispatch(fetchArticlesStart())
        fetch(dbRef)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                dispatch(fetchArticlesFail("network response was not ok"))
            })
            .then(res => dispatch(fetchArticlesSuccess(res)))
            .catch(err => console.log(err))
    }
}

export const createArticle = (title, content, img, user_id) => {
    const url = "/api/v1/articles/create";
    const body = {
        "title": title,
        "content": content,
        "img": img,
        "id": uuid.v4(),
        "user_id": user_id
    };

    if (title.length == 0 || content.length == 0 || user_id.length == 0) {
        return;
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.props.history.push(`/articles/${response.id}`))
        .catch(error => console.log(error.message));
    return {
        type: actions.CREATE_ARTICLE
    }
}

export const deleteArticle = () => {
    return {
        type: actions.DELETE_ARTICLE
    }
}

export const editArticle = () => {
    return {
        type: actions.EDIT_ARTICLE
    }
}