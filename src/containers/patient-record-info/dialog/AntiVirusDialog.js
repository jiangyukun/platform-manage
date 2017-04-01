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

  render() {
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
              <div>药品名称： 替诺福韦</div>
              <div className="mt-5">每日剂量： 600mg</div>
              <div className="mt-5">用药时间： 2016-07-20 ~ 2017-02-10</div>
            </div>
            <_AuditingButtons/>
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
  onExited: PropTypes.func
}

export default AntiVirusDialog
