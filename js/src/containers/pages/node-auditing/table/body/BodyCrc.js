/**
 * Created by jiangyukun on 2016/12/1.
 */
import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import {getVisitCardState} from '../../../../../core/formatBusData'

class BodyCrc extends Component {
  render() {
    return (
      <div>
        {
          this.props.list.map((patient, index) => {
            return (
              <ul key={index}
                  onClick={e => this.props.selectItem(index)}
                  onDoubleClick={e => this.props.openEditPatientDialog(index)}
                  className={classnames('list clearfix', {'selected': this.props.currentIndex == index})}>

                <li className="list-item w-120">{patient['patient_Code']}</li>
                <li className="list-item w-120">{patient['patient_Name']}</li>
                <li className="list-item w-120">{patient['patient_Phone']}</li>
                <li className="list-item w-120">{patient['hospital_Name']}</li>
                <li className="list-item w-120">{patient['backend_Manager']}</li>
                <li className="list-item w-120">{patient['operation_Manager']}</li>

                <li className="list-item w-120">{patient['indications_Doctor_Name']}</li>
                {this.props.open1 && ( <li className="list-item w-120">{patient['infection_Doctor']}</li>)}
                {this.props.open1 && (<li className="list-item w-120">{patient['obstetrics_Doctor']}</li>)}
                {this.props.open1 && (<li className="list-item w-120">{patient['pediatrics_Doctor']}</li>)}

                <li className="list-item w-120">{patient['is_Hepatitis']}</li>
                <li className="list-item w-120">{patient['is_Pregnant']}</li>
                <li className="list-item w-120">{patient['regrist_Time']}</li>
                <li className="list-item w-120">{patient['is_Checked']}</li>
                <li className="list-item w-120">{patient['pregnancy_week']}</li>

                {this.props.open2 && <li className="list-item w-120">{patient['antiviral_Record']}</li>}
                {this.props.open2 && <li className="list-item w-120">{patient['blocking_Results']}</li>}

                {this.props.open2 && <li className="list-item w-120">{patient['app_version']}</li>}
                {this.props.open2 && <li className="list-item w-120">{patient['device_Model']}</li>}
                <li className="list-item w-120">
                  {getVisitCardState(patient['visit_card_status'])}
                </li>
                <li className="list-item w-140">
                  {patient['is_First_Complete_Visit']}
                </li>
                <li className="list-item w-120">
                  {patient['first_Contact_Remark']}
                </li>

                <li className="list-item w-175">
                  <div>肝功能</div>
                  <div>HBV-DNA</div>
                  <div>乙肝五项定性</div>
                  <div>乙肝五项定量</div>
                  <div>肝脏B超</div>
                  <div>婴儿乙肝五项定性</div>
                  <div>婴儿乙肝五项定量</div>
                  <div>婴儿HBV-DNA</div>
                </li>

                {/*访视1*/}
                <li className="list-item w-120">
                  <div>{patient['visit_1_Liver_Function']}</div>
                  <div>{patient['visit_1_HBV_DNA']}</div>
                  <div>{patient['visit_1_Liver_Five_Dx']}</div>
                  <div>{patient['visit_1_Liver_Five_Dl']}</div>
                  <div>{patient['visit_1_Liver_B']}</div>
                  <div>{patient['visit_1_Liver_Baby_Five_Dx']}</div>
                  <div>{patient['visit_1_Liver_Baby_Five_Dl']}</div>
                  <div>{patient['visit_1_Baby_HBV_DNA']}</div>
                </li>
                <li className="list-item w-120">{patient['pregnant_14_Weeks_Date']}</li>
                <li className="list-item w-140">
                  {patient['is_Pregnant_14_Weeks_Complete_Visit']}
                </li>
                <li className="list-item w-120">
                  {patient['pregnant_14_Weeks_Contact_Remark']}
                </li>

                {/*访视2*/}
                <li className="list-item w-120">
                  <div>{patient['visit_2_Liver_Function']}</div>
                  <div>{patient['visit_2_HBV_DNA']}</div>
                  <div>{patient['visit_2_Liver_Five_Dx']}</div>
                  <div>{patient['visit_2_Liver_Five_Dl']}</div>
                  <div>{patient['visit_2_Liver_B']}</div>
                  <div>{patient['visit_2_Liver_Baby_Five_Dx']}</div>
                  <div>{patient['visit_2_Liver_Baby_Five_Dl']}</div>
                  <div>{patient['visit_2_Baby_HBV_DNA']}</div>
                </li>
                <li className="list-item w-140">{patient['visit_2_Accept_Visit']}</li>
                <li className="list-item w-120">{patient['pregnant_26_Weeks_Date']}</li>
                <li className="list-item w-140">
                  {patient['is_Pregnant_26_Weeks_Complete_Visit']}
                </li>
                <li className="list-item w-120">
                  {patient['pregnant_26_Weeks_Contact_Remark']}
                </li>
                <li className="list-item w-120">{patient['pregnant_33_Weeks_Date']}</li>
                <li className="list-item w-140">
                  {patient['is_Pregnant_33_Weeks_Complete_Visit']}
                </li>
                <li className="list-item w-120">
                  {patient['pregnant_33_Weeks_Contact_Remark']}
                </li>

                {/*访视3*/}
                <li className="list-item w-120">
                  <div>{patient['visit_3_Liver_Function']}</div>
                  <div>{patient['visit_3_HBV_DNA']}</div>
                  <div>{patient['visit_3_Liver_Five_Dx']}</div>
                  <div>{patient['visit_3_Liver_Five_Dl']}</div>
                  <div>{patient['visit_3_Liver_B']}</div>
                  <div>{patient['visit_3_Liver_Baby_Five_Dx']}</div>
                  <div>{patient['visit_3_Liver_Baby_Five_Dl']}</div>
                  <div>{patient['visit_3_Baby_HBV_DNA']}</div>
                </li>
                <li className="list-item w-120">{patient['pregnant_41_Weeks_Date']}</li>
                <li className="list-item w-140">
                  {patient['is_Pregnant_41_Weeks_Complete_Visit']}
                </li>
                <li className="list-item w-120">
                  {patient['pregnant_41_Weeks_Contact_Remark']}
                </li>

                {/*访视4*/}
                <li className="list-item w-120">
                  <div>{patient['visit_4_Liver_Function']}</div>
                  <div>{patient['visit_4_HBV_DNA']}</div>
                  <div>{patient['visit_4_Liver_Five_Dx']}</div>
                  <div>{patient['visit_4_Liver_Five_Dl']}</div>
                  <div>{patient['visit_4_Liver_B']}</div>
                  <div>{patient['visit_4_Liver_Baby_Five_Dx']}</div>
                  <div>{patient['visit_4_Liver_Baby_Five_Dl']}</div>
                  <div>{patient['visit_4_Baby_HBV_DNA']}</div>
                </li>
                <li className="list-item w-140">{patient['postpartum_6_Weeks_Date']}</li>
                <li className="list-item w-120">{patient['pregnant_46_Weeks_Date']}</li>
                <li className="list-item w-140">
                  {patient['is_Pregnant_46_Weeks_Complete_Visit']}
                </li>
                <li className="list-item w-120">
                  {patient['pregnant_46_Weeks_Contact_Remark']}
                </li>
                <li className="list-item w-140">{patient['postpartum_10_Weeks_Date']}</li>
                <li className="list-item w-120">{patient['pregnant_50_Weeks_Date']}</li>
                <li className="list-item w-140">
                  {patient['is_Pregnant_50_Weeks_Complete_Visit']}
                </li>
                <li className="list-item w-120">
                  {patient['pregnant_50_Weeks_Contact_Remark']}
                </li>

                {/*访视5*/}
                <li className="list-item w-120">
                  <div>{patient['visit_5_Liver_Function']}</div>
                  <div>{patient['visit_5_HBV_DNA']}</div>
                  <div>{patient['visit_5_Liver_Five_Dx']}</div>
                  <div>{patient['visit_5_Liver_Five_Dl']}</div>
                  <div>{patient['visit_5_Liver_B']}</div>
                  <div>{patient['visit_5_Liver_Baby_Five_Dx']}</div>
                  <div>{patient['visit_5_Liver_Baby_Five_Dl']}</div>
                  <div>{patient['visit_5_Baby_HBV_DNA']}</div>
                </li>

                <li className="list-item w-140">{patient['visit_5_Accept_Visit']}</li>
                <li className="list-item w-140">{patient['postpartum_8_Months_Date']}</li>
                <li className="list-item w-120">{patient['pregnant_72_Weeks_Date']}</li>
                <li className="list-item w-140">
                  {patient['is_Pregnant_72_Weeks_Complete_Visit']}
                </li>
                <li className="list-item w-120">
                  {patient['pregnant_72_Weeks_Contact_Remark']}
                </li>
                <li className="list-item w-140">{patient['postpartum_9_Months_Date']}</li>
                <li className="list-item w-120">{patient['pregnant_76_Weeks_Date']}</li>
                <li className="list-item w-140">
                  {patient['is_Pregnant_76_Weeks_Complete_Visit']}
                </li>
                <li className="list-item w-120">
                  {patient['pregnant_76_Weeks_Contact_Remark']}
                </li>

                <li className="list-item w-140">{patient['postpartum_10_Months_Date']}</li>
                <li className="list-item w-120">{patient['pregnant_80_Weeks_Date']}</li>
                <li className="list-item w-140">
                  {patient['is_Pregnant_80_Weeks_Complete_Visit']}
                </li>
                <li className="list-item w-120">
                  {patient['pregnant_80_Weeks_Contact_Remark']}
                </li>
              </ul>
            )
          })
        }
      </div>
    )
  }
}

BodyCrc.propTypes = {
  list: PropTypes.array,
  currentIndex: PropTypes.number,
  open1: PropTypes.bool,
  open2: PropTypes.bool,
  selectItem: PropTypes.func,
  openEditPatientDialog: PropTypes.func,
  openVisitCardDialog: PropTypes.func,
  openEditRemarkDialog: PropTypes.func,
  openIsCompleteVisitDialog: PropTypes.func
}

export default BodyCrc
