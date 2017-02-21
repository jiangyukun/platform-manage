import React, {Component, PropTypes} from 'react'
import EditPatientAdmin from './edit/EditPatientAdmin'
import EditPatientCrc from './edit/EditPatientCrc'

class EditPatient extends Component {
  render() {
    if (this.context.role == 'admin') {
      return <EditPatientAdmin {...this.props}/>
    }
    if (this.context.role == 'crc') {
      return <EditPatientCrc {...this.props}/>
    }
    throw new Error('illegal role type')
  }
}

EditPatient.contextTypes = {
  role: PropTypes.string
}

EditPatient.propTypes = {
  patientId: PropTypes.string,
  fetchPatientInfo: PropTypes.func,
  updateAuditingState: PropTypes.func,
  updatePatientInfo: PropTypes.func,
  patientInfoUpdated: PropTypes.func,
  onExited: PropTypes.func
}

export default EditPatient
