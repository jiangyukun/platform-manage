import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal} from 'react-bootstrap'
import DatePicker from '../../core/datepicker/DatePicker'

class EditPatientDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
            invalid: true,
            datePicker: false
        }
    }

    open() {
        this.setState({active: true})
    }

    close() {
        this.setState({active: false, datePicker: false})
    }

    render() {
        return (
            <Modal show={this.state.active} onHide={()=> this.close()} backdrop="static">
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
                                <input ng-model="editPatientCtrl.patientName" type="text" className="form-control" placeholder="请输入姓名"/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">身份证号：</label>
                            </div>
                            <div className="col-xs-6">
                                <input ng-model="editPatientCtrl.idNumber" type="text" className="form-control" length-restrict="18"
                                       placeholder="请输入身份证号"/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">出生日期：</label>
                            </div>
                            <div className="col-xs-6">
                                <DatePicker show={this.state.datePicker} close={()=>this.setState({datePicker: false})}/>
                                <input onFocus={e=>this.setState({datePicker: true})} ng-model="birthday" type="text" className="form-control" placeholder="请选择日期"/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">民族：</label>
                            </div>
                            <div className="col-xs-6">
                                <select className="form-control" ng-model="editPatientCtrl.minority">
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
                                <select className="form-control" ng-model="editPatientCtrl.isHepatitisB">
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
                                <select ng-model="editPatientCtrl.isPregnantWomen" className="form-control">
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
                                <input type="text" ng-model="editPatientCtrl.createTime" className="form-control" disabled/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">上次修改时间：</label>
                            </div>
                            <div className="col-xs-6">
                                <input type="text" ng-model="editPatientCtrl.lastEditTime" className="form-control" disabled/>
                            </div>
                        </div>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <div className="row">
                        <div className="col-xs-4">
                            <input type="button" className="btn btn-default btn-block"
                                   ng-click="editPatientCtrl.lookHeadPicture();" value="查看修改头像"/>
                        </div>
                        <div className="col-xs-offset-4 col-xs-4">
                            <input type="button" className="btn btn-default btn-block" ng-click="editPatientCtrl.edit();" value="保存修改"/>
                        </div>
                    </div>

                    <div className="row mt-10">
                        <div className="col-xs-4">
                            <input type="button" className="btn btn-danger btn-block" ng-click="editPatientCtrl.cancelAuditing();"
                                   ng-disabled="editPatientCtrl.doctor_Is_Checked == 1" value="撤销审核"/>
                        </div>
                        <div className="col-xs-4">
                            <input type="button" className="btn btn-danger btn-block" ng-click="editPatientCtrl.markUnPass();"
                                   ng-disabled="editPatientCtrl.doctor_Is_Checked == 3" value="标为不通过"/>
                        </div>
                        <div className="col-xs-4">
                            <input type="button" className="btn btn-success btn-block" ng-click="editPatientCtrl.markPass();"
                                   ng-disabled="editPatientCtrl.doctor_Is_Checked == 2" value="标为已审核"/>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        hospitalList: state.hospitalList
    }
}

export default connect(mapStateToProps, null, null, {withRef: true})(EditPatientDialog)
