/**
 * Created by jiangyukun on 2016/12/1.
 */
import React, {Component, PropTypes} from 'react'
import Modal from 'antd/lib/modal'
import {toCompleteVisitTypeResponseKey} from '../../../../core/pages/nodeAuditingHelper'

class EditIsCompleteVisit extends Component {
    constructor() {
        super()
        this.handleOk = this.handleOk.bind(this)
        this.state = {id: '', show: false, value: ''}
    }

    open(patient, completeVisitType) {
        this.patient = patient
        this.completeVisitType = completeVisitType
        let value = patient[toCompleteVisitTypeResponseKey(completeVisitType)]

        if (value == '是') {
            value = '1';
        } else if (value == '否') {
            value = '0';
        } else if (value == '未联系') {
            value = '2';
        }
        this.setState({id: patient['patient_Id'], value, show: true})
    }

    handleSelectChange(event) {
        this.setState({value: event.target.value})
    }

    handleOk() {
        this.setState({show: false})
        this.props.editIsCompleteVisit(this.state.id, this.completeVisitType, this.state.value)
    }

    render() {
        return (
            <Modal title="是否完成随访" visible={this.state.show}
                   onOk={this.handleOk} onCancel={() => this.setState({show: false})}
            >
                <select className="form-control" value={this.state.value} onChange={e => this.handleSelectChange(e)}>
                    <option value="">请选择</option>
                    <option value="1">是</option>
                    <option value="0">否</option>
                    <option value="2">未联系</option>
                </select>
            </Modal>
        )
    }
}

EditIsCompleteVisit.propTypes = {
    editIsCompleteVisit: PropTypes.func
}

export default EditIsCompleteVisit
