/**
 * Created by jiangyu2016 on 16/10/15.
 */

export * from './app'
export * from './message'
export * from './hospital'
export * from './pages/hospital-manage'
export * from './pages/node-auditing'
export * from './common/provinceList'
export * from './common/cityList'

export function doctorListInfo(state = {total: 0, doctorList: []}, action) {

    if (action.type == 'fetchDoctorList') {
        return action.doctorListInfo
    }

    return state
}
