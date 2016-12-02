/**
 * Created by jiangyukun on 2016/12/2.
 */
import React, {Component, PropTypes} from 'react'
import Modal from 'antd/lib/modal'

import {toRemarkTypeResponseKey} from '../../../../core/pages/nodeAuditingHelper'

class EditRemark extends Component {
    constructor() {
        super()
        this.handleOk = this.handleOk.bind(this)
        this.state = {show: false, remark: ''}
    }

    open(patient, remarkType) {
        this.id = patient['patient_Id']
        this.remarkType = remarkType
        let key = toRemarkTypeResponseKey(remarkType)
        console.log(patient[key])

        this.setState({show: true, remark: patient[key]})
    }

    handleChange(event) {
        this.setState({remark: event.target.value})
    }

    handleOk() {
        this.props.editRemark(this.id, this.remarkType, this.state.remark)
        this.setState({show: false})
    }

    render() {
        return (
            <Modal title="修改备注" visible={this.state.show}
                   onOk={this.handleOk} onCancel={() => this.setState({show: false})}
            >
                <p style={{marginTop: '15px', marginBottom: '15px'}}>
                    <textarea className="form-control" rows="4" value={this.state.remark} onChange={e => this.handleChange(e)}></textarea>
                </p>
            </Modal>
        )
    }
}

EditRemark.propTypes = {
    editRemark: PropTypes.func
}

export default EditRemark
