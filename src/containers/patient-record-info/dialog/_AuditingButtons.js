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
          <button className="btn" disabled={this.props.currentStatus == AUDIT_STATUS.NO_RECORD} onClick={this.auditNoRecord}>未录入</button>
        </div>
        <div className="mt-5">
          <button className="btn" disabled={this.props.currentStatus == AUDIT_STATUS.RECORDED} onClick={this.auditRecorded}>已录入</button>
        </div>
        <div className="mt-5">
          <button className="btn" disabled={this.props.currentStatus == AUDIT_STATUS.INVALID} onClick={this.auditInvalid}>无效</button>
        </div>
      </div>
    )
  }
}

_AuditingButtons.propTypes = {
  currentStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  auditingRecordInfo: PropTypes.func
}

export default _AuditingButtons
