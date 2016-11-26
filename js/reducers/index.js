/**
 * Created by jiangyu2016 on 16/10/15.
 */

export * from './app'
export * from './message'
export * from './hospital'

export function doctorListInfo(state = {total: 0, doctorList: []}, action) {

    if (action.type == 'fetchDoctorList') {
        return action.doctorListInfo
    }

    return state
}

export function patientListInfo(state = {total: 0, list: []}, action) {

    if (action.type == 'fetchPatientList') {
        let {data} =action.patientListInfo
        return {
            total: data['total_Patient_Count'],
            list: data['patientCheckList']
        }
    }

    return state
}

