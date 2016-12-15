import React, {Component, PropTypes} from 'react'

import EditPatientAdmin from './edit-patient/EditPatientAdmin'
import EditPatientCrc from './edit-patient/EditPatientCrc'

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

export default EditPatient
