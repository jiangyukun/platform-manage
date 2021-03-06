/**
 * Created by jiangyukun on 2017/3/31.
 */
import React, {PropTypes} from 'react'
import Modal from 'react-bootstrap/lib/Modal'

import _PatientBasicInfo from './_PatientBasicInfo'
import _AuditingButtons from './_AuditingButtons'

class InoculationDialog extends React.Component {
  state = {
    show: true
  }

  close = () => {
    this.setState({show: false})
  }

  componentWillUpdate() {
    if (this.props.auditingStatusUpdated) {
      this.close()
    }
  }

  render() {
    const recordTypeInfo = this.props.recordTypeInfo
    const basicInfo = this.props.basicInfo

    return (
      <Modal show={this.state.show}
             backdrop="static"
             onHide={this.close}
             onExited={this.props.onExited}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>查看-接种信息</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <_PatientBasicInfo basicInfo={this.props.basicInfo}/>

          <div className="record-type-detail-info">
            <div className="flex1">
              <h4 className="record-info-header">接种宝宝：{recordTypeInfo['baby_No']}</h4>
              <div>接种针数：{recordTypeInfo['inoculated_Number'] ? `第${recordTypeInfo['inoculated_Number']}针` : '未知'}</div>
              <div className="mt-5">乙肝疫苗接种日期：{recordTypeInfo['inoculated_HBV_Day'] || '未知'}</div>
              <div className="mt-5">免疫球蛋白接种日期：{recordTypeInfo['inoculated_HBIG_Day'] || '未知'}</div>
            </div>
            <_AuditingButtons currentStatus={basicInfo['info_Status']} auditingRecordInfo={this.props.auditingRecordInfo}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-info" onClick={this.add}>确定</button>
        </Modal.Footer>
      </Modal>
    )
  }
}

InoculationDialog.propTypes = {
  basicInfo: PropTypes.object,
  recordTypeInfo: PropTypes.object,
  auditingRecordInfo: PropTypes.func,
  onExited: PropTypes.func
}

export default InoculationDialog
