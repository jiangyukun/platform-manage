/**
 * Created by jiangyukun on 2017/3/31.
 */
import React, {PropTypes} from 'react'

import {AUDIT_STATUS} from '../../../constants/patient-record-info'

class _AuditingButtons extends React.Component {

  auditNoRecord = () => {
    this.props.auditingRecordInfo(AUDIT_STATUS.NO_RECORD)
  }

  auditRecorded = () => {
    this.props.auditingRecordInfo(AUDIT_STATUS.RECORDED)
  }

  auditInvalid = () => {
    this.props.auditingRecordInfo(AUDIT_STATUS.INVALID)
  }

  render() {
    return (
      <div className="record-info-check-area">
        <div>
          <button className="btn" onClick={this.auditNoRecord}>未录入</button>
        </div>
        <div className="mt-5">
          <button className="btn" onClick={this.auditRecorded}>已录入</button>
        </div>
        <div className="mt-5">
          <button className="btn" onClick={this.auditInvalid}>无效</button>
        </div>
      </div>
    )
  }
}

_AuditingButtons.propTypes = {
  auditingRecordInfo: PropTypes.func
}

export default _AuditingButtons
