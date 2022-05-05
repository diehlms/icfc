import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import ArticleReducer from '../src/store/reducers/articles';
import CabinReducer from '../src/store/reducers/cabins';
import EventReducer from '../src/store/reducers/events';
import UserReducer from '../src/store/reducers/users';
import LoadingReducer from '../src/store/reducers/loading';
import ErrorsReducer from '../src/store/reducers/errors';
import SuccessMessagesReducer from '../src/store/reducers/successMessages';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    articles: ArticleReducer,
    cabins: CabinReducer,
    events: EventReducer,
    users: UserReducer,
    loading: LoadingReducer,
    errors: ErrorsReducer,
    successMessages: SuccessMessagesReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

document.addEventListener('DOMContentLoaded', () => {
    const user_id_node = document.getElementById('session_id_tag');
    const admin_node = document.getElementById('admin_tag');
    let userId;
    let isAdmin
    if (!!user_id_node) {
        userId = JSON.parse(user_id_node.getAttribute('data'));
    }
    if (!!admin_node) {
        isAdmin = JSON.parse(admin_node.getAttribute('data'));
    }
    ReactDOM.render(
        <Provider 
            store={store}>
            <BrowserRouter>
                <App
                    userId={userId}
                    isAdmin={isAdmin}
                />
            </BrowserRouter>
        </Provider>,
        document.body.appendChild(document.createElement('div')),
    )
})