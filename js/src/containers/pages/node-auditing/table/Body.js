/**
 * Created by jiangyukun on 2016/12/1.
 */
import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

import {getVisitCardState} from '../../../../core/formatBusData'

class Body extends Component {
    render() {
        return (
            <tbody>
            {
                this.props.list.map((patient, index) => {
                    return (
                        <tr key={index}
                            onClick={e => this.props.selectItem(index)}
                            onDoubleClick={e => this.editPatient(patient)}
                            className={classnames({'selected': this.props.currentIndex == index})}>

                            <td className="w-120">{patient['patient_Code']}</td>
                            <td className="w-120">{patient['patient_Name']}</td>
                            <td className="w-120">{patient['patient_Phone']}</td>
                            <td className="w-150">{patient['hospital_Name']}</td>
                            <td className="w-120">{patient['indications_Doctor_Name']}</td>
                            {this.props.open1 && ( <td className="w-120">{patient['infection_Doctor']}</td>)}
                            {this.props.open1 && (<td className="w-120">{patient['obstetrics_Doctor']}</td>)}
                            {this.props.open1 && (<td className="w-120">{patient['pediatrics_Doctor']}</td>)}

                            <td className="w-120">{patient['is_Hepatitis']}</td>
                            <td className="w-120">{patient['is_Pregnant']}</td>
                            <td className="w-120">{patient['regrist_Time']}</td>
                            <td className="w-120">{patient['is_Checked']}</td>

                            <td className="w-120">{patient['pregnancy_week']}</td>
                            {this.props.open2 && <td className="w-120">{patient['antiviral_Record']}</td>}
                            {this.props.open2 && <td className="w-120">{patient['blocking_Results']}</td> }
                            {this.props.open2 && <td className="w-120">{patient['app_version']}</td>}
                            {this.props.open2 && <td className="w-120">{patient['device_Model']}</td>}

                            <td className="w-120">
                                {getVisitCardState(patient['visit_card_status'])}
                                <i className="fa fa-edit" onClick={e => this.props.openVisitCardDialog(patient)}></i>
                            </td>
                            <td className="w-120">
                                {patient['is_First_Complete_Visit']}
                                <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '1')"></i>
                            </td>
                            <td className="w-120">
                                {patient['first_Contact_Remark']}
                                <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '1')"></i>
                            </td>

                            <td className="w-150">
                                <div>肝功能</div>
                                <div>HBV-DNA</div>
                                <div>乙肝五项定性</div>
                                <div>乙肝五项定量</div>
                                <div>肝脏B超</div>
                                <div>婴儿乙肝五项定性</div>
                                <div>婴儿乙肝五项定量</div>
                                <div>婴儿HBV-DNA</div>
                            </td>

                            {/*访视1*/}
                            <td className="w-120">
                                <div>{patient['visit_1_Liver_Function']}</div>
                                <div>{patient['visit_1_HBV_DNA']}</div>
                                <div>{patient['visit_1_Liver_Five_Dx']}</div>
                                <div>{patient['visit_1_Liver_Five_Dl']}</div>
                                <div>{patient['visit_1_Liver_B']}</div>
                                <div>{patient['visit_1_Liver_Baby_Five_Dx']}</div>
                                <div>{patient['visit_1_Liver_Baby_Five_Dl']}</div>
                                <div>{patient['visit_1_Baby_HBV_DNA']}</div>
                            </td>
                            <td className="w-120">{patient['pregnant_14_Weeks_Date']}</td>
                            <td className="w-120">
                                {patient['is_Pregnant_14_Weeks_Complete_Visit']}
                                <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '2')"></i>
                            </td>
                            <td className="w-120">
                                {patient['pregnant_14_Weeks_Contact_Remark']}
                                <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '2')"></i>
                            </td>

                            {/*访视2*/}
                            <td className="w-120">
                                <div>{patient['visit_2_Liver_Function']}</div>
                                <div>{patient['visit_2_HBV_DNA']}</div>
                                <div>{patient['visit_2_Liver_Five_Dx']}</div>
                                <div>{patient['visit_2_Liver_Five_Dl']}</div>
                                <div>{patient['visit_2_Liver_B']}</div>
                                <div>{patient['visit_2_Liver_Baby_Five_Dx']}</div>
                                <div>{patient['visit_2_Liver_Baby_Five_Dl']}</div>
                                <div>{patient['visit_2_Baby_HBV_DNA']}</div>
                            </td>
                            <td className="w-120">{patient['visit_2_Accept_Visit']}</td>
                            <td className="w-120">{patient['pregnant_26_Weeks_Date']}</td>
                            <td className="w-120">
                                {patient['is_Pregnant_26_Weeks_Complete_Visit']}
                                <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '3')"></i>
                            </td>
                            <td className="w-120">
                                {patient['pregnant_26_Weeks_Contact_Remark']}
                                <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '3')"></i>
                            </td>
                            <td className="w-120">{patient['pregnant_33_Weeks_Date']}</td>
                            <td className="w-120">
                                {patient['is_Pregnant_33_Weeks_Complete_Visit']}
                                <i className="fa fa-edit"
                                   data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '4')"></i>
                            </td>
                            <td className="w-120">
                                {patient['pregnant_33_Weeks_Contact_Remark']}
                                <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '4')"></i>
                            </td>


                            {/*访视3*/}
                            <td className="w-120">
                                <div>{patient['visit_3_Liver_Function']}</div>
                                <div>{patient['visit_3_HBV_DNA']}</div>
                                <div>{patient['visit_3_Liver_Five_Dx']}</div>
                                <div>{patient['visit_3_Liver_Five_Dl']}</div>
                                <div>{patient['visit_3_Liver_B']}</div>
                                <div>{patient['visit_3_Liver_Baby_Five_Dx']}</div>
                                <div>{patient['visit_3_Liver_Baby_Five_Dl']}</div>
                                <div>{patient['visit_3_Baby_HBV_DNA']}</div>
                            </td>
                            <td className="w-120">{patient['pregnant_41_Weeks_Date']}</td>
                            <td className="w-120">
                                {patient['is_Pregnant_41_Weeks_Complete_Visit']}
                                <i className="fa fa-edit"
                                   data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '5')"></i>
                            </td>
                            <td className="w-120">
                                {patient['pregnant_41_Weeks_Contact_Remark']}
                                <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '5')"></i>
                            </td>


                            {/*访视4*/}
                            <td className="w-120">
                                <div>{patient['visit_4_Liver_Function']}</div>
                                <div>{patient['visit_4_HBV_DNA']}</div>
                                <div>{patient['visit_4_Liver_Five_Dx']}</div>
                                <div>{patient['visit_4_Liver_Five_Dl']}</div>
                                <div>{patient['visit_4_Liver_B']}</div>
                                <div>{patient['visit_4_Liver_Baby_Five_Dx']}</div>
                                <div>{patient['visit_4_Liver_Baby_Five_Dl']}</div>
                                <div>{patient['visit_4_Baby_HBV_DNA']}</div>
                            </td>
                            <td className="w-120">{patient['postpartum_6_Weeks_Date']}</td>
                            <td className="w-120">{patient['pregnant_46_Weeks_Date']}</td>
                            <td className="w-120">
                                {patient['is_Pregnant_46_Weeks_Complete_Visit']}
                                <i className="fa fa-edit"
                                   data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '6')"></i>
                            </td>
                            <td className="w-120">
                                {patient['pregnant_46_Weeks_Contact_Remark']}
                                <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '6')"></i>
                            </td>
                            <td className="w-120">{patient['postpartum_10_Weeks_Date']}</td>
                            <td className="w-120">{patient['pregnant_50_Weeks_Date']}</td>
                            <td className="w-120">
                                {patient['is_Pregnant_50_Weeks_Complete_Visit']}
                                <i className="fa fa-edit"
                                   data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '7')"></i>
                            </td>
                            <td className="w-120">
                                {patient['pregnant_50_Weeks_Contact_Remark']}
                                <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '7')"></i>
                            </td>


                            {/*访视5*/}
                            <td className="w-120">
                                <div>{patient['visit_5_Liver_Function']}</div>
                                <div>{patient['visit_5_HBV_DNA']}</div>
                                <div>{patient['visit_5_Liver_Five_Dx']}</div>
                                <div>{patient['visit_5_Liver_Five_Dl']}</div>
                                <div>{patient['visit_5_Liver_B']}</div>
                                <div>{patient['visit_5_Liver_Baby_Five_Dx']}</div>
                                <div>{patient['visit_5_Liver_Baby_Five_Dl']}</div>
                                <div>{patient['visit_5_Baby_HBV_DNA']}</div>
                            </td>

                            <td className="w-120">{patient['visit_5_Accept_Visit']}</td>
                            <td className="w-120">{patient['postpartum_8_Months_Date']}</td>
                            <td className="w-120">{patient['pregnant_72_Weeks_Date']}</td>
                            <td className="w-120">
                                {patient['is_Pregnant_72_Weeks_Complete_Visit']}
                                <i className="fa fa-edit"
                                   data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '8')"></i>
                            </td>
                            <td className="w-120">
                                {patient['pregnant_72_Weeks_Contact_Remark']}
                                <div>
                                    <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '8')"></i>
                                </div>
                            </td>
                            <td className="w-120">{patient['postpartum_9_Months_Date']}</td>
                            <td className="w-120">{patient['pregnant_76_Weeks_Date']}</td>
                            <td className="w-120">
                                {patient['is_Pregnant_76_Weeks_Complete_Visit']}
                                <i className="fa fa-edit"
                                   data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '9')"></i>
                            </td>
                            <td className="w-120">
                                {patient['pregnant_76_Weeks_Contact_Remark']}
                                <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '9')"></i>
                            </td>

                            <td className="w-120">{patient['postpartum_10_Months_Date']}</td>
                            <td className="w-120">{patient['pregnant_80_Weeks_Date']}</td>
                            <td className="w-120">
                                {patient['is_Pregnant_80_Weeks_Complete_Visit']}
                                <i className="fa fa-edit"
                                   data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '10')"></i>
                            </td>
                            <td className="w-120">
                                {patient['pregnant_80_Weeks_Contact_Remark']}
                                <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '10')"></i>
                            </td>

                        </tr>
                    )
                })
            }
            </tbody>
        )
    }
}

Body.propTypes = {
    list: PropTypes.array,
    currentIndex: PropTypes.number,
    open1: PropTypes.bool,
    open2: PropTypes.bool,
    selectItem: PropTypes.func,
    openVisitCardDialog: PropTypes.func
}

export default Body
