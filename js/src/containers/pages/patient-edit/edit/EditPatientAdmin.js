import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import moment from 'moment'
import DatePicker from 'antd/lib/date-picker'

import Select1 from '../../../../components/core/Select1'
import EditableImagePreview from '../../../../components/core/EditableImagePreview'
import constants from '../../../../core/constants'
import * as antdUtil from '../../../../core/utils/antdUtil'

class EditPatientAdmin extends Component {
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
            hospitalName: '',
            doctor1: '',
            doctor2: '',
            doctor3: '',

            show: true,
            showPhoto: false,
            valid: false
        }
    }

    handleDoctor1Change = ({value}) => {
        this.setState({doctor1: value})
    }

    handleDoctor2Change = ({value}) => {
        this.setState({doctor2: value})
    }

    handleDoctor3Change = ({value}) => {
        this.setState({doctor3: value})
    }

    cancelAuditing() {
        antdUtil.confirm('确定撤销审核吗？', () => {
            this.props.updateAuditingState(this.infoId, this.props.patientId, constants.auditingState.auditing)
                .then(() => antdUtil.tipSuccess('撤销审核成功!'), err => antdUtil.tipErr('撤销审核失败！'))
                .then(this.setState({show: false}))
        })
    }

    markUnPass() {
        antdUtil.confirm('确定标为不通过吗？', () => {
            this.props.updateAuditingState(this.infoId, this.props.patientId, constants.auditingState.auditingUnPass)
                .then(() => antdUtil.tipSuccess('标为不通过成功!'), err => antdUtil.tipErr('标为不通过失败！'))
                .then(this.setState({show: false}))
        })
    }

    markPass() {
        antdUtil.confirm('确定标为已审核吗？', () => {
            this.props.updateAuditingState(this.infoId, this.props.patientId, constants.auditingState.auditingPass)
                .then(() => antdUtil.tipSuccess('标为已审核成功!'), err => antdUtil.tipErr('标为已审核失败！'))
                .then(this.setState({show: false}))
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
                "patient_Photo": this.state.photo,
                "hospital_Id": this.hospitalId,
                "infection_Doctor_Id": this.state.doctor1 || null,
                "obstetrics_Doctor_Id": this.state.doctor2 || null,
                "pediatrics_Doctor_Id": this.state.doctor3 || null
            }).then(() => {
                antdUtil.tipSuccess('更新病人信息成功！')
                this.setState({show: false})
                this.props.patientInfoUpdated()
            }, err => antdUtil.tipErr(err))
        })
    }

    componentDidMount() {
        this.props.fetchPatientInfo(this.props.patientId).then(patientInfo => {
            this.infoId = patientInfo['info_Id']
            this.hospitalId = patientInfo['hospital_Id']
            this.hospitalName = patientInfo['hospital_Name']
            this.doctorList1 = patientInfo['infection_doctor_list'].map(doctor => {
                return {value: doctor['user_id'], text: doctor['doctor_name']}
            })
            this.doctorList2 = patientInfo['obstetrics_doctor_list'].map(doctor => {
                return {value: doctor['user_id'], text: doctor['doctor_name']}
            })
            this.doctorList3 = patientInfo['pediatrics_doctor_list'].map(doctor => {
                return {value: doctor['user_id'], text: doctor['doctor_name']}
            })
            this.setState({
                name: patientInfo['full_Name'] || '',
                idCard: patientInfo['id_Number'] || '',
                birthday: patientInfo['birth_Date'] ? moment(patientInfo['birth_Date']) : null,
                minority: patientInfo['nation'] || '',
                isHepatitisB: patientInfo['is_Hepatitis'],
                isPregnantWomen: patientInfo['is_Pregnant'],
                auditingState: patientInfo['is_Checked'] || '',
                lastUpdateDate: patientInfo['updateTime'] || '',
                createDate: patientInfo['creatTime'] || '',
                photo: patientInfo['info_Photo'] || '',
                doctor1: patientInfo['infection_Doctor_User_Id'] || '',
                doctor2: patientInfo['obstetrics_Doctor_User_Id'] || '',
                doctor3: patientInfo['pediatrics_Doctor_User_Id'] || ''
            })
        })
    }

    render() {
        return (
            <Modal show={this.state.show}
                   bsSize="lg"
                   onHide={() => this.setState({show: false})}
                   onExited={this.props.onExited}
                   backdrop="static">
                <Modal.Header closeButton={true}>
                    <Modal.Title>编辑患者</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.state.showPhoto && (
                            <EditableImagePreview url={this.state.photo}
                                                  onExited={() => this.setState({showPhoto: false})}
                                                  imageUrlUpdated={url => this.setState({photo: url})}/>
                        )
                    }
                    <section className="container-fluid">
                        <div className="col-xs-12 col-md-6">
                            <div className="row">
                                <div className="col-xs-3">
                                    <label className="mt-5">姓名：</label>
                                </div>
                                <div className="col-xs-9">
                                    <input value={this.state.name} onChange={e => this.setState({name: e.target.value})}
                                           type="text" className="form-control" placeholder="请输入姓名"/>
                                </div>
                            </div>

                            <div className="row mt-10">
                                <div className="col-xs-3">
                                    <label className="mt-5">身份证号：</label>
                                </div>
                                <div className="col-xs-9">
                                    <input value={this.state.idCard} onChange={e => this.setState({idCard: e.target.value})}
                                           type="text" className="form-control" placeholder="请输入身份证号"/>
                                </div>
                            </div>

                            <div className="row mt-10">
                                <div className="col-xs-3">
                                    <label className="mt-5">出生日期：</label>
                                </div>
                                <div className="col-xs-9">
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
                                <div className="col-xs-9">
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
                                <div className="col-xs-9">
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
                                <div className="col-xs-9">
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
                                <div className="col-xs-9">
                                    <input type="text" value={this.state.createDate} className="form-control" disabled/>
                                </div>
                            </div>

                            <div className="row mt-10">
                                <div className="col-xs-3">
                                    <label className="mt-5">上次修改时间：</label>
                                </div>
                                <div className="col-xs-9">
                                    <input type="text" value={this.state.lastUpdateDate} className="form-control" disabled/>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="row">
                                <div className="col-xs-4">
                                    <label className="mt-5">医院：</label>
                                </div>
                                <div className="col-xs-8">
                                    <input className="form-control" disabled={true} value={this.hospitalName}/>
                                </div>
                            </div>

                            <div className="row mt-10">
                                <div className="col-xs-4">
                                    <label className="mt-5">感染科医生：</label>
                                </div>
                                <div className="col-xs-8">
                                    <Select1 selectItems={this.doctorList1} value={this.state.doctor1} onSelect={this.handleDoctor1Change}/>
                                </div>
                            </div>
                            <div className="row mt-10">
                                <div className="col-xs-4">
                                    <label className="mt-5">妇产科医生：</label>
                                </div>
                                <div className="col-xs-8">
                                    <Select1 selectItems={this.doctorList2} value={this.state.doctor2} onSelect={this.handleDoctor2Change}/>
                                </div>
                            </div>
                            <div className="row mt-10">
                                <div className="col-xs-4">
                                    <label className="mt-5">儿科医生：</label>
                                </div>
                                <div className="col-xs-8">
                                    <Select1 selectItems={this.doctorList3} value={this.state.doctor3} onSelect={this.handleDoctor3Change}/>
                                </div>
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

EditPatientAdmin.propTypes = {
    patientId: PropTypes.string,
    fetchPatientInfo: PropTypes.func,
    updateAuditingState: PropTypes.func,
    updatePatientInfo: PropTypes.func,
    patientInfoUpdated: PropTypes.func,
    onExited: PropTypes.func
}

export default EditPatientAdmin
