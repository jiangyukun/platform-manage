/**
 * Created by jiangyukun on 2017/4/5.
 */
import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {merge} from 'lodash'

import EditPatientInfo from './EditPatientInfo'

import {fetchPatientInfo, updateAuditingState, updatePatientInfo} from '../node-auditing/node-auditing'
import {deleteAccount, clearDeleteAccountSuccess} from './patient-edit'
import * as antdUtil from '../../core/utils/antdUtil'

class EditPatientInfoWrap extends React.Component {
  componentDidUpdate() {
    if (this.props.deleteAccountSuccess) {
      this.props.clearDeleteAccountSuccess()
      antdUtil.tipSuccess('删除账号成功！')
    }
  }

  render() {
    return (
      <EditPatientInfo {...this.props}/>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    deleteAccountSuccess: state['patient_edit']['deleteAccountSuccess'],
    ...ownProps
  }
}

export default connect(mapStateToProps, (dispatch) => merge({}, bindActionCreators({deleteAccount, clearDeleteAccountSuccess}, dispatch), {
  fetchPatientInfo: fetchPatientInfo(dispatch),
  updateAuditingState: updateAuditingState(dispatch),
  updatePatientInfo: updatePatientInfo(dispatch)
}))(EditPatientInfoWrap)
