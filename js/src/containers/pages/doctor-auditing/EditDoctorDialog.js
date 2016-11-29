/**
 * Created by jiangyu2016 on 2016/10/22.
 */
import React, {Component} from 'react'
import classnames from 'classnames'
import {Modal} from 'react-bootstrap'
import ImagePreview from '../../core/ImagePreview'

export default  class EditDoctorDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {active: false, invalid: true}
    }

    open(doctor) {
        this.doctor = doctor
        this.setState({active: true})
    }

    close() {
        this.setState({active: false})
    }

    render() {
        return (
            <Modal show={this.state.active} onHide={()=>this.close()}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>审核状态</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className="container-fluid flex1">
                        <div className="row">
                            <div className="col-xs-3">
                                <label className="mt-5">医生姓名：</label>
                            </div>
                            <div className="col-xs-6">
                                <input ng-model="lookOrEditAuditing.doctorName" type="text" className="form-control" placeholder="请输入姓名"/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">医院：</label>
                            </div>
                            <div className="col-xs-6">
                                <select ng-disabled="!lookOrEditAuditing.canEditHospital" className="form-control" ng-model="lookOrEditAuditing.hospital"
                                        ng-options="hospital.value as hospital.text for hospital in lookOrEditAuditing.hospitalList"></select>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">科室：</label>
                            </div>
                            <div className="col-xs-6">
                                <select className="form-control"
                                        ng-disabled="!lookOrEditAuditing.canEditHospital"
                                        ng-model="lookOrEditAuditing.department"
                                        ng-options="department.id as department.text for department in lookOrEditAuditing.departmentList"></select>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">职称：</label>
                            </div>
                            <div className="col-xs-6">
                                <select className="form-control" ng-model="lookOrEditAuditing.position"
                                        ng-options="position.id as position.text for position in lookOrEditAuditing.positionList"></select>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">专长：</label>
                            </div>
                            <div className="col-xs-9">
                                <textarea ng-model="lookOrEditAuditing.special" className="form-control"></textarea>
                            </div>
                        </div>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <div className="row">
                        <div className="col-xs-4">
                            <input type="button" className="btn btn-default btn-block" onClick={e=>this.imagePreview.open()} value="查看修改头像"/>
                            {
                                this.doctor && <ImagePreview ref={c=>this.imagePreview = c} url={this.doctor['doctor_Photo']}/>
                            }
                        </div>
                        <div className="col-xs-4">
                            <input type="button" className="btn btn-default btn-block" ng-click="lookOrEditAuditing.lookCertificatePicture();" value="持证照片"/>
                        </div>
                        <div className="col-xs-4">
                            <input type="button" className="btn btn-success btn-block" ng-click="lookOrEditAuditing.edit();" value="保存修改"/>
                        </div>
                    </div>

                    <div className="row mt-10">
                        <div className="col-xs-4">
                            <input type="button" className="btn btn-danger btn-block" ng-click="lookOrEditAuditing.cancelAuditing();"
                                   ng-disabled="lookOrEditAuditing.doctor_Is_Checked == 1" value="撤销审核"/>
                        </div>
                        <div className="col-xs-4">
                            <input type="button" className="btn btn-danger btn-block" ng-click="lookOrEditAuditing.markUnPass();"
                                   ng-disabled="lookOrEditAuditing.doctor_Is_Checked == 3" value="标为不通过"/>
                        </div>
                        <div className="col-xs-4">
                            <input type="button" className="btn btn-success btn-block" ng-click="lookOrEditAuditing.markPass();"
                                   ng-disabled="lookOrEditAuditing.doctor_Is_Checked == 2" value="标为已审核"/>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }

}
