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
    const basicInfo = this.props.basicInfo

    return (
      <Modal show={this.state.show}
             backdrop="static"
             onHide={this.close}
             onExited={this.props.onExited}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>查看-宝宝7月信息</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <_PatientBasicInfo basicInfo={this.props.basicInfo}/>

          <div className="record-type-detail-info">
            <div className="flex1">
              {
                'first_Baby_Height' in recordTypeInfo && (
                  <div>
                    <h4 className="record-info-header">宝宝1：</h4>
                    <div>宝宝身高：{recordTypeInfo['first_Baby_Height']}</div>
                    <div>宝宝体重：{recordTypeInfo['first_Baby_Weight']}</div>
                  </div>
                )
              }

              {
                'second_Baby_Height' in recordTypeInfo && (
                  <div className="mt-15">
                    <h4 className="record-info-header">宝宝2：</h4>
                    <div>宝宝身高：{recordTypeInfo['second_Baby_Height']}</div>
                    <div>宝宝体重：{recordTypeInfo['second_Baby_Weight']}</div>
                  </div>
                )
              }

              {
                'third_Baby_Height' in recordTypeInfo && (
                  <div className="mt-15">
                    <h4 className="record-info-header">宝宝3：</h4>
                    <div>宝宝身高：{recordTypeInfo['third_Baby_Height']}</div>
                    <div>宝宝体重：{recordTypeInfo['third_Baby_Weight']}</div>
                  </div>
                )
              }
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

BabyBirthInfoDialog.propTypes = {
  basicInfo: PropTypes.object,
  recordTypeInfo: PropTypes.object,
  auditingRecordInfo: PropTypes.func,
  onExited: PropTypes.func
}

export default BabyBirthInfoDialog
