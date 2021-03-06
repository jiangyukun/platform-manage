/**
 * Created by jiangyu2016 on 16/10/15.
 */
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import request_3_phase from '../middleware/request_3_phase'

import allReducers from '../reducers/'

export default function configureStore() {
  const store = createStore(allReducers, {}, applyMiddleware(thunk, request_3_phase))

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
