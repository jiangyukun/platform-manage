import React, {Component, PropTypes} from 'react'
import {Modal, Button} from 'react-bootstrap'
import moment from 'moment'
import DatePicker from 'antd/lib/date-picker'
import ImagePreview from '../../../../components/core/ImagePreview'

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
            <Modal show={this.state.show} onHide={() => this.setState({show: false})} onExited={this.props.onExited} backdrop="static">
                <Modal.Header closeButton={true}>
                    <Modal.Title>查看患者</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.state.showPhoto && (
                            <ImagePreview url={this.state.photo} onExited={() => this.setState({showPhoto: false})}/>
                        )
                    }
                    <section className="container-fluid">
                        <div className="row">
                            <div className="col-xs-3">
                                <label className="mt-5">姓名：</label>
                            </div>
                            <div className="col-xs-6">
                                <input value={this.state.name}
                                       type="text" className="form-control" placeholder="请输入姓名"/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">身份证号：</label>
                            </div>
                            <div className="col-xs-6">
                                <input value={this.state.idCard}
                                       type="text" className="form-control" placeholder="请输入身份证号"/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">出生日期：</label>
                            </div>
                            <div className="col-xs-6">
                                <DatePicker value={this.state.birthday}
                                            inputPrefixCls="birthday-input"
                                            placeholder="请选择日期"/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">民族：</label>
                            </div>
                            <div className="col-xs-6">
                                <select className="form-control" value={this.state.minority}>
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
                                <select className="form-control" value={this.state.isHepatitisB}>
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
                                <select value={this.state.isPregnantWomen} className="form-control">
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
                    <Button onClick={() => this.close()}>关闭</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

EditPatient.propTypes = {
    patientId: PropTypes.string,
    fetchPatientInfo: PropTypes.func,
    updateAuditingState: PropTypes.func,
    updatePatientInfo: PropTypes.func,
    onExited: PropTypes.func
}

export default EditPatient
