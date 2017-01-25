/**
 * Created by jiangyukun on 2017/1/25.
 */

import * as types from '../constants/ActionTypes'
import * as phase from '../constants/PhaseConstant'

export default ({dispatch, getState}) => next => action => {
    try {
        return next(action)
    } finally {
        const state = getState()
        switch (action.type) {
            case types.UPDATE_OUT_PATIENT_REMARK + phase.SUCCESS:
                dispatch({type: types.RESET_OUT_PATIENT_REMARK})
        }
    }
}
