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
        case actions.FETCH_ARTICLES_FAIL: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        case actions.FETCH_ARTICLES: {
            return [
                state, {
                    loading: true
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
        case actions.CREATE_ARTICLE: {
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
        case actions.DELETE_ARTICLE: {
            return [
                state, {
                    loading: true
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
        default: return state
    }
}