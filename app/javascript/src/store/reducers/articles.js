import * as actions from '../actions/actionTypes'

const initialState = {
    articles: [],
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.FETCH_ARTICLES_START: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.FETCH_ARTICLES_SUCCESS: {
            return [
                state, {
                    loading: false,
                    articles: action.articlesArr
                }
            ]
        }
        case actions.FETCH_ARTICLES_FAIL: {
            return [
                state, {
                    loading: false,
                    error: action.error
                }
            ]
        }
        case actions.CREATE_ARTICLE: {
            return state, {
                loading: false
            }
        }
        case actions.DELETE_ARTICLE: {
            return state
        }
        case actions.EDIT_ARTICLE: {
            return state
        }
        default: return state
    } 
}