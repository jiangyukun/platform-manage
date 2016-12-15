import React, {Component, PropTypes} from 'react'
import {Modal, Button} from 'react-bootstrap'
import moment from 'moment'
import DatePicker from 'antd/lib/date-picker'

import ImagePreview from '../../../../components/core/ImagePreview'
import constants from '../../../../core/constants'
import * as antdUtil from '../../../../core/utils/antdUtil'

class EditPatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            idCard: '',
            birthday: null,
            minority: '',
            isHepatitisB: '',
            isPregnantWomen: '',
            auditingState: '',
            lastUpdateDate: '',
            createDate: '',
            photo: '',

            show: true,
            showPhoto: false,
            valid: false
        }
    }

    close() {
        this.setState({show: false})
        setTimeout(() => {
            this.props.onClose()
        }, this.props.closeTimeout)
    }

    cancelAuditing() {
        antdUtil.confirm('确定撤销审核吗？', () => {
            this.props.updateAuditingState(this.infoId, constants.auditingState.auditing)
                .then(() => antdUtil.tipSuccess('撤销审核成功!'), err => antdUtil.tipErr('撤销审核失败！'))
                .then(this.close())
        })
    }

    markUnPass() {
        antdUtil.confirm('确定标为不通过吗？', () => {
            this.props.updateAuditingState(this.infoId, constants.auditingState.auditingUnPass)
                .then(() => antdUtil.tipSuccess('标为不通过成功!'), err => antdUtil.tipErr('标为不通过失败！'))
                .then(this.close())
        })
    }

    markPass() {
        antdUtil.confirm('确定标为已审核吗？', () => {
            this.props.updateAuditingState(this.infoId, constants.auditingState.auditingPass)
                .then(() => antdUtil.tipSuccess('标为已审核成功!'), err => antdUtil.tipErr('标为已审核失败！'))
                .then(this.close())
        })
    }

    updatePatientInfo() {
        antdUtil.confirm('确定保存修改吗？', () => {
            this.props.updatePatientInfo({
                "patient_Id": this.props.patientId,
                "id_Num": this.state.idCard,
                "patient_Name": this.state.name,
                "patient_Nation": this.state.minority,
                "patient_Is_Hepatitis": this.state.isHepatitisB,
                "patient_Is_Pregnant": this.state.isPregnantWomen,
                "patient_BirthDate": this.state.birthday && this.state.birthday.format('YYYY-MM-DD'),
                "patient_Photo": this.state.photo
            }).then(() => antdUtil.tipSuccess('更新病人信息成功！'), err => antdUtil.tipErr(err)).then(this.close())
        })
    }

    componentDidMount() {
        this.props.fetchPatientInfo(this.props.patientId).then(patientInfo => {
            this.infoId = patientInfo['info_Id']
            this.setState({
                name: patientInfo['full_Name'] || '',
                idCard: patientInfo['id_Number'] || '',
                birthday: patientInfo['birth_Date'] ? moment(patientInfo['birth_Date']) : null,
                minority: patientInfo['nation'],
                isHepatitisB: patientInfo['is_Hepatitis'],
                isPregnantWomen: patientInfo['is_Pregnant'],
                auditingState: patientInfo['is_Checked'],
                lastUpdateDate: patientInfo['updateTime'] || '',
                createDate: patientInfo['creatTime'] || '',
                photo: patientInfo['info_Photo'] || ''
            })
        })
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={() => this.close()} backdrop="static">
                <Modal.Header closeButton={true}>
                    <Modal.Title>编辑患者</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.state.showPhoto && (
                            <ImagePreview url={this.state.photo} onClose={() => this.setState({showPhoto: false})}/>
                        )
                    }
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
                                       type="text" className="form-control" placeholder="请输入身份证号"/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">出生日期：</label>
                            </div>
                            <div className="col-xs-6">
                                <DatePicker value={this.state.birthday}
                                            onChange={value => this.setState({birthday: value})}
                                            inputPrefixCls="birthday-input"
                                            placeholder="请选择日期"/>
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
                    <div className="row">
                        <div className="col-xs-4">
                            <input type="button" className="btn btn-default btn-block"
                                   onClick={e => this.setState({showPhoto: true})} value="查看头像"/>
                        </div>
                        <div className="col-xs-offset-4 col-xs-4">
                            <input type="button" className="btn btn-default btn-block" onClick={e => this.updatePatientInfo()} value="保存修改"/>
                        </div>
                    </div>

                    <div className="row mt-10">
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
    updatePatientInfo: PropTypes.func,
    onClose: PropTypes.func
}

export default EditPatient
