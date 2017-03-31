/**
 * Created by jiangyukun on 2017/3/31.
 */
import React, {PropTypes} from 'react'

class _PatientBasicInfo extends React.Component {

  render() {
    const basicInfo = this.props.basicInfo || {}

    return (
      <div>
        <div className="flex">
          <div className="flex1">患者编号：{basicInfo['patient_Code']}</div>
          <div className="flex1">患者医院：{basicInfo['hospital_Name']}</div>
        </div>
        <div className="flex mt-10">
          <div className="flex1">患者账号：{basicInfo['patient_Phone']}</div>
          <div className="flex1">患者姓名：{basicInfo['patient_Name']}</div>
        </div>
      </div>
    )
  }
}

_PatientBasicInfo.propTypes = {
  basicInfo: PropTypes.object
}

export default _PatientBasicInfo
