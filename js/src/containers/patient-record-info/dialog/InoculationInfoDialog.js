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

  render() {
    return (
      <Modal show={this.state.show}
             backdrop="static"
             className="console-account-manage-add"
             onHide={this.close}
             onExited={this.props.onExited}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>查看-接种信息</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <_PatientBasicInfo basicInfo={this.props.basicInfo}/>

          <div className="inoculation-info">
            <div className="flex1"></div>
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

InoculationDialog.propTypes = {
  basicInfo: PropTypes.object,
  onExited: PropTypes.func
}

export default InoculationDialog
