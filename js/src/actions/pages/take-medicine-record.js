/**
 * Created by jiangyukun on 2016/12/29.
 */
import {GET, POST} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

//获取省列表
export function fetchTakeMedicineRecordPaginateList(option) {
  return dispatch => {

    dispatch({type: types.FETCH_TAKE_MEDICINE_RECORD_PAGINATE_LIST})

    POST('/take-medicine-record/getTakeMedicineRecordList', {body: option}).then(result => {
      const list = result['takeMedicineRecordList']
      const total = result['count']
      dispatch({
        type: types.FETCH_TAKE_MEDICINE_RECORD_PAGINATE_LIST + phase.SUCCESS, list, total
      })
    })
  }

}
