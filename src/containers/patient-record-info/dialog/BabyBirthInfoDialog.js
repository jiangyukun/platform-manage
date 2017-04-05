/**
 * Created by jiangyukun on 2017/3/31.
 */
import React, {PropTypes} from 'react'
import Modal from 'react-bootstrap/lib/Modal'

import _PatientBasicInfo from './_PatientBasicInfo'
import _AuditingButtons from './_AuditingButtons'

class BabyBirthInfoDialog extends React.Component {
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
    return (
      <Modal show={this.state.show}
             backdrop="static"
             onHide={this.close}
             onExited={this.props.onExited}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>查看-宝宝出生信息</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <_PatientBasicInfo basicInfo={this.props.basicInfo}/>
          <div className="record-type-detail-info">
            <div className="flex1">
              <h4 className="record-info-header">宝宝{recordTypeInfo['baby_Number']}：</h4>
              <div className="mt-5">宝宝身高：{recordTypeInfo['first_Baby_Height']}</div>
              <div className="mt-5">宝宝体重：{recordTypeInfo['first_Baby_Weight']}</div>
              <div className="flex">
                <div className="flex1">是否有出生缺陷：{recordTypeInfo['first_Baby_Have_Physiological_Defect']}</div>
                <div className="flex1">缺陷名称：{recordTypeInfo['first_Baby_Physiological_Defect']}</div>
              </div>
            </div>
            <_AuditingButtons auditingRecordInfo={this.props.auditingRecordInfo}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-info" onClick={this.add}>确定</button>
        </Modal.Footer>
      </Modal>
    )
  }
}

BabyBirthInfoDialog.propTypes = {
  basicInfo: PropTypes.object,
  recordTypeInfo: PropTypes.object,
  auditingRecordInfo: PropTypes.func,
  onExited: PropTypes.func
}

export default BabyBirthInfoDialog
