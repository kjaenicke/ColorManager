import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { apiMiddleware } from 'redux-api-middleware';
import { getConfig } from './actions'
import App from './containers/app'

const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk, apiMiddleware ] :
  [ thunk, apiMiddleware, logger() ]

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
const store = createStoreWithMiddleware(reducer)

store.dispatch(getConfig())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('color-manager')
)
