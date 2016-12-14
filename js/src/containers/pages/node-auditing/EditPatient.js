import React, {Component, PropTypes} from 'react'
import {Modal, Button} from 'react-bootstrap'
import moment from 'moment'

import DatePicker from 'antd/lib/date-picker'
import Select1 from '../../../components/core/Select1'
import constants from '../../../core/constants'
import * as antdUtil from '../../../core/utils/antdUtil'

class EditPatient extends Component {
    constructor(props) {
        super(props)
        this.state = {show: true, valid: false}
    }

    close() {
        this.setState({show: false})
        setTimeout(() => {
            this.props.onClose()
        }, this.props.closeTimeout)
    }

    cancelAuditing() {
        this.props.updateAuditingState(this.props.patientId, constants.auditingState.auditing)
            .then(() => antdUtil.tipSuccess('取消审核成功!'), err => antdUtil.tipErr('取消审核失败！'))
    }

    markUnPass() {
        this.props.updateAuditingState(this.props.patientId, constants.auditingState.auditingUnPass)
            .then(() => antdUtil.tipSuccess('标为不通过成功!'), err => antdUtil.tipErr('标为不通过失败！'))
    }

    markPass() {
        this.props.updateAuditingState(this.props.patientId, constants.auditingState.auditingPass)
            .then(() => antdUtil.tipSuccess('标为已审核成功!'), err => antdUtil.tipErr('标为已审核失败！'))
    }

    updatePatient() {

    }

    componentDidMount() {
        this.props.fetchPatientInfo(this.props.patientId).then(patientInfo => {
            this.setState({
                name: patientInfo['full_Name'],
                idCard: patientInfo['id_Number'],
                birthday: moment(patientInfo['birth_Date']),
                minority: patientInfo['nation'],
                isHepatitisB: patientInfo['is_Hepatitis'],
                isPregnantWomen: patientInfo['is_Pregnant'],
                auditingState: patientInfo['is_Checked'],
                lastUpdateDate: patientInfo['updateTime'],
                createDate: patientInfo['creatTime']
            })
        })
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={() => this.close()} backdrop="static">
                <Modal.Header closeButton={true}>
                    <Modal.Title>查看患者</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className="container-fluid">
                        <div className="row">
                            <div className="col-xs-3">
                                <label className="mt-5">姓名：</label>
                            </div>
                            <div className="col-xs-6">
                                <input value={this.state.name} onChange={e => this.setState({name: e.target.value})}
                                       type="text" className="form-control" placeholder="请输入姓名"/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">身份证号：</label>
                            </div>
                            <div className="col-xs-6">
                                <input value={this.state.idCard} onChange={e => this.setState({idCard: e.target.value})}
                                       type="text" className="form-control"
                                       placeholder="请输入身份证号"/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">出生日期：</label>
                            </div>
                            <div className="col-xs-6">
                                <DatePicker value={this.state.birthday} onChange={value => this.setState({birthday: value})}
                                            type="text" className="xxx" placeholder="请选择日期"/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">民族：</label>
                            </div>
                            <div className="col-xs-6">
                                <select className="form-control" value={this.state.minority} onChange={e => this.setState({minority: e.target.value})}>
                                    <option value="">请选择</option>
                                    <option value="汉族">汉族</option>
                                    <option value="其他">其他</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">是否乙肝：</label>
                            </div>
                            <div className="col-xs-6">
                                <select className="form-control" value={this.state.isHepatitisB} onChange={e => this.setState({isHepatitisB: e.target.value})}>
                                    <option value="">请选择</option>
                                    <option value="1">是</option>
                                    <option value="0">否</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">是否孕妇：</label>
                            </div>
                            <div className="col-xs-6">
                                <select value={this.state.isPregnantWomen} className="form-control" onChange={e => this.setState({isPregnantWomen: e.target.value})}>
                                    <option value="">请选择</option>
                                    <option value="1">是</option>
                                    <option value="0">否</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">创建时间：</label>
                            </div>
                            <div className="col-xs-6">
                                <input type="text" value={this.state.createDate} className="form-control" disabled/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">上次修改时间：</label>
                            </div>
                            <div className="col-xs-6">
                                <input type="text" value={this.state.lastUpdateDate} className="form-control" disabled/>
                            </div>
                        </div>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <div className="row" ng-if="!editPatientCtrl.tempAccount">
                        <div className="col-xs-4">
                            <input type="button" className="btn btn-default btn-block"
                                   onClick={e => this.lookHeadPicture()} value="查看修改头像"/>
                        </div>
                        <div className="col-xs-offset-4 col-xs-4">
                            <input type="button" className="btn btn-default btn-block" onClick={e => this.updatePatientInfo()} value="保存修改"/>
                        </div>
                    </div>

                    <div className="row mt-10" ng-if="!editPatientCtrl.tempAccount">
                        <div className="col-xs-4">
                            <input type="button" className="btn btn-danger btn-block" onClick={e => this.cancelAuditing()}
                                   disabled={this.state.auditingState == 1} value="撤销审核"/>
                        </div>
                        <div className="col-xs-4">
                            <input type="button" className="btn btn-danger btn-block" onClick={e => this.markUnPass()}
                                   disabled={this.state.auditingState == 3} value="标为不通过"/>
                        </div>
                        <div className="col-xs-4">
                            <input type="button" className="btn btn-success btn-block" onClick={e => this.markPass()}
                                   disabled={this.state.auditingState == 2} value="标为已审核"/>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}

EditPatient.defaultProps = {
    closeTimeout: 250
}

EditPatient.propTypes = {
    patientId: PropTypes.string,
    fetchPatientInfo: PropTypes.func,
    updateAuditingState: PropTypes.func,
    onClose: PropTypes.func
}

export default EditPatient
