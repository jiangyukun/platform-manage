/**
 * Created by jiangyukun on 2016/12/1.
 */
import React, {Component, PropTypes} from 'react'
import {Modal} from 'antd'

class EditVisitCard extends Component {
    constructor() {
        super()
        this.handleOk = this.handleOk.bind(this)
        this.state = {id: '', show: false, value: ''}
    }

    open(patient) {
        console.log(patient);
        this.patient = patient
        this.setState({show: true, value: patient['visit_card_status'], id: patient['patient_Id']})
    }

    handleSelectChange(event) {
        this.setState({value: event.target.value})
    }

    handleOk() {
        this.setState({show: false})
        this.props.editVisitCard(this.state.id, this.state.value)
    }

    render() {
        return (
            <Modal title="随访卡" visible={this.state.show}
                   onOk={this.handleOk} onCancel={() => this.setState({show: false})}
            >
                <select className="form-control" value={this.state.value} onChange={e => this.handleSelectChange(e)}>
                    <option value="1">是</option>
                    <option value="2">否</option>
                    <option value="3">未知</option>
                </select>
            </Modal>
        )
    }
}

EditVisitCard.propTypes = {
    editVisitCard: PropTypes.func
}

export default EditVisitCard
