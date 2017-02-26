/**
 * Created by jiangyukun on 2016/11/29.
 */
import * as types from '../constants/ActionTypes'

export function deleteErr(errId) {
  return {
    type: types.DELETE_ERROR, errId
  }
}
