/**
 * Created by jiangyukun on 2016/12/1.
 */
import {fromJS} from 'immutable'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

const defaultValue = {total: 0, list: []}

export function hospitalManageList(state = defaultValue, action) {
    const iState = fromJS(state)

    return nextState()

    function nextState() {
        let nextIState = iState

        switch (action.type) {
            case types.FETCH_HOSPITAL_MANAGE_LIST + phase.SUCCESS:
                nextIState = fetchHospitalManageListSuccess()
                break

            case types.UPDATE_HOSPITAL_INFO + phase.SUCCESS:
                nextIState = updateHospitalInfoSuccess();
                break

            default:
                break
        }
        if (nextIState == iState) {
            return state
        }
        return nextIState.toJS()
    }

    // --------------------------------------

    function fetchHospitalManageListSuccess() {
        let {totalCount, list} = action
        return iState.set('total', totalCount).set('list', list)
    }

    function updateHospitalInfoSuccess() {
        let {newHospitalInfo} = action
        // console.log(newHospitalInfo)

        return _updateList(iState, newHospitalInfo['id'], hospital => hospital.set('hospital_Name', newHospitalInfo['newHospitalInfo'])
            .set('province', newHospitalInfo['province']).set('city', newHospitalInfo['city'])
            .set('cityCode', newHospitalInfo['cityCode']).set('hospitalSerialNumber', newHospitalInfo['hospitalSerialNumber'])
            .set('hospital_In_Project'), newHospitalInfo['hospital_In_Project'])
    }

//    ---------------------------

    function _updateList(curIState, id, callback) {
        const list = curIState.get('list')
        const match = list.find(hospital => hospital.get('id') == id)
        return curIState.update('list', list => list.update(list.indexOf(match), hospital => callback(hospital)))
    }
}
