import * as actions from '../actions/actionTypes'

const initialState = {
    articles: [],
    loading: false,
    message: null,
    err: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.FETCH_ARTICLES_SUCCESS: {
            return [
                state, {
                    articles: action.res,
                    loading: false
                }
            ]
        }
        case actions.FETCH_ARTICLES_FOR_USER_SUCCESS: {
            const filteredArticles = action.res.filter(article => {
                return article.user_id === action.user_id;
            });
            return [
                state, {
                    articles: filteredArticles,
                    loading: false
                }
            ]
        }
        case actions.FETCH_ARTICLES_FAIL: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        case actions.CREATE_ARTICLE_SUCCESS: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        case actions.CREATE_ARTICLE_INIT: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.CREATE_ARTICLE_FAIL: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        case actions.DELETE_ARTICLE_SUCCESS: {
            return [
                state, {
                    loading: false,
                    message: 'article deleted'
                }
            ]
        }
        case actions.DELETE_ARTICLE_FAIL: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        case actions.DELETE_ARTICLE_INIT: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        default: return state
    }
}