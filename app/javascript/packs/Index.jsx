import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/components/App'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import articlesReducer from '../src/store/reducers/articles'
import cabinsReducer from '../src/store/reducers/cabins'
import eventsReducer from '../src/store/reducers/events'
import picturesReducer from '../src/store/reducers/pictures'
import usersReducer from '../src/store/reducers/users'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  articles: articlesReducer,
  cabins: cabinsReducer,
  events: eventsReducer,
  pictures: picturesReducer,
  users: usersReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('Index')
  const user_id = JSON.parse(node.getAttribute('user_id'))
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App user_id={user_id}/>
      </BrowserRouter>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})