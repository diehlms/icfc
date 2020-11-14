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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    articles: ArticleReducer,
    cabins: CabinReducer,
    events: EventReducer,
    users: UserReducer,
    loading: LoadingReducer,

});

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