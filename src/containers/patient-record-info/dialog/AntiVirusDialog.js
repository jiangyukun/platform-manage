/**
 * 抗病毒
 * Created by jiangyukun on 2017/3/31.
 */
import React, {PropTypes} from 'react'
import Modal from 'react-bootstrap/lib/Modal'

import _PatientBasicInfo from './_PatientBasicInfo'
import _AuditingButtons from './_AuditingButtons'

class AntiVirusDialog extends React.Component {
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
          <Modal.Title>查看-抗病毒</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <_PatientBasicInfo basicInfo={this.props.basicInfo}/>

          <div className="record-type-detail-info">
            <div className="flex1">
              <div>药品名称：{recordTypeInfo['name'] || '未知'}</div>
              <div className="mt-5">每日剂量：{recordTypeInfo['dose'] || '未知'}</div>
              <div className="mt-5">用药时间： {recordTypeInfo['start_Time']} ~ {recordTypeInfo['end_Time'] || '至今'}</div>
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

AntiVirusDialog.propTypes = {
  basicInfo: PropTypes.object,
  recordTypeInfo: PropTypes.object,
  auditingRecordInfo: PropTypes.func,
  onExited: PropTypes.func
}

export default AntiVirusDialog
