/**
 * Created by jiangyu2016 on 16/10/15.
 */

export * from './app'
export * from './message'

export function doctorListInfo(state = {total: 0, doctorList: []}, action) {

    if (action.type == 'fetchDoctorList') {
        return action.doctorListInfo
    }

    return state
}

export function patientListInfo(state = {total: 0, patientList: []}, action) {

    if (action.type == 'fetchPatientList') {
        return action.patientListInfo
    }

    return state
}

export function hospitalList(state = [], action) {
    return [
        {value: '1', text: '浙江医院'},
        {value: '2', text: '医院2'},
        {value: '3', text: '医院3'},
        {value: '4', text: '医院4'},
        {value: '5', text: '医院5'},
        {value: '6', text: '医院6'},
        {value: '7', text: '医院7'},
        {value: '8', text: '杭州医院'},
        {value: '9', text: '滨江医院'},
        {value: '10', text: '杭州医院10'},
        {value: '11', text: '杭州医院11'},
        {value: '12', text: '杭州医院12'}
    ]
}

