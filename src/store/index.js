import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import products from './products/reducer'
import cart from './cart/reducer'
import customer from './customer/reducer'
import { logger } from './middlewares/loggingMiddleware'

const reducer = combineReducers({
  products,
  cart,
  customer,
})

const initialState = {}
const enhancers = []
const middleware = [
  logger,
]

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  reducer,
  initialState,
  composedEnhancers
)

export default store
