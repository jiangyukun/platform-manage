/**
 * Created by jiangyukun on 2016/12/29.
 */
import {GET, POST} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

//获取省列表
export let fetchAppUpdatePaginateList = dispatch => option => {
  return new Promise((resolve, reject) => {
    POST('/config/app/update', {body: option}).then((result) => {
      const list = result['webAppUpdates'] || []
      const total = result['totalCount']
      dispatch({
        type: types.FETCH_APP_UPDATE_LIST + phase.SUCCESS, list, total
      })
      resolve()
    }, err => reject(err))
  })
}
