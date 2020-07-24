import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ArticleReducer from '../src/store/reducers/articles';
import CommentReducer from '../src/store/reducers/comments';
import CabinReducer from '../src/store/reducers/cabins';
import PictureReducer from '../src/store/reducers/pictures';
import EventReducer from '../src/store/reducers/events';
import UserReducer from '../src/store/reducers/users';
import AuthReducer from '../src/store/reducers/auth';
import SearchReducer from '../src/store/reducers/search';
import CabinImageReducer from '../src/store/reducers/cabinImage';
import LoadingReducer from '../src/store/reducers/loading';
import CabinDateReducer from '../src/store/reducers/cabinDate';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    articles: ArticleReducer,
    comments: CommentReducer,
    cabins: CabinReducer,
    pictures: PictureReducer,
    events: EventReducer,
    users: UserReducer,
    auth: AuthReducer,
    search: SearchReducer,
    cabinImage: CabinImageReducer,
    loading: LoadingReducer,
    cabinDate: CabinDateReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

document.addEventListener('DOMContentLoaded', () => {
    const node = document.getElementById('session_id_tag')
    const data = JSON.parse(node.getAttribute('data'))
    ReactDOM.render(
        <Provider 
            store={store}>
            <BrowserRouter>
                <App
                    user_id={data}
                />
            </BrowserRouter>
        </Provider>,
        document.body.appendChild(document.createElement('div')),
    )
})