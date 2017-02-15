/**
 * Created by jiangyu2016 on 16/10/15.
 */
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import onceValidValue from '../middleware/once_valid_value'
import request_3_phase from '../middleware/request_3_phase'
import {routerReducer as routing} from 'react-router-redux'
import * as reducers from '../reducers/'

const allReducers = combineReducers({...reducers, routing})

export default function configureStore() {
  return createStore(allReducers, {
    app: {
      name: '小贝壳控制台',
      version: '1.0',
      color: {

      },
      settings: {
        headerFixed: true,
        asideFixed: true,
        asideFolded: false,
        asideDock: false,
        container: false,
        asideMessage: true
      },
      errQueue: []
    }
  }, applyMiddleware(thunk, onceValidValue, request_3_phase))
}
