import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal, Button} from 'react-bootstrap'

import Select1 from '../../../components/core/Select1'

class EditPatient extends Component {
    constructor(props) {
        super(props)
        this.state = {active: false, invalid: true}
    }

    open() {
        this.setState({active: true})
    }

    close() {
        this.setState({active: false})
    }

    addNewDoctor() {

    }

    render() {
        return (
            <Modal show={this.state.active} onHide={()=> {
                this.close()
            }}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>注册医生</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section classNameName="container-fluid" ng-form="addDoctor.form">
                        <div classNameName="row">
                            <div classNameName="col-xs-3">
                                <label classNameName="mt-5">医生姓名<span classNameName="red">*</span>：</label>
                            </div>
                            <div classNameName="col-xs-6">
                                <input required ng-model="addDoctor.doctorName" type="text" classNameName="form-control"
                                       placeholder="请输入姓名"/>
                            </div>
                        </div>

                        <div classNameName="row mt-10">
                            <div classNameName="col-xs-3">
                                <label classNameName="mt-5">医院<span classNameName="red">*</span>：</label>
                            </div>
                            <div classNameName="col-xs-6">
                                <Select1 selectItems={this.props.hospitalList} required={true}></Select1>
                            </div>
                        </div>

                        <div classNameName="row mt-10">
                            <div classNameName="col-xs-3">
                                <label classNameName="mt-5">科室<span classNameName="red">*</span>：</label>
                            </div>
                            <div classNameName="col-xs-6">
                                <select required classNameName="form-control" ng-model="addDoctor.department"
                                        ng-options="department.id as department.text for department in addDoctor.departmentList"></select>
                            </div>
                        </div>

                        <div classNameName="row mt-10">
                            <div classNameName="col-xs-3">
                                <label classNameName="mt-5">职称<span classNameName="red">*</span>：</label>
                            </div>
                            <div classNameName="col-xs-6">
                                <select required classNameName="form-control" ng-model="addDoctor.position"
                                        ng-options="position.id as position.text for position in addDoctor.positionList"></select>
                            </div>
                        </div>

                        <div classNameName="row mt-10">
                            <div classNameName="col-xs-3">
                                <label classNameName="mt-5">专长：</label>
                            </div>
                            <div classNameName="col-xs-9">
                                <textarea ng-model="addDoctor.special" classNameName="form-control"></textarea>
                            </div>
                        </div>

                        <div classNameName="row mt-10">
                            <div classNameName="col-xs-3">
                                <label classNameName="mt-5">手机号码<span classNameName="red">*</span>：</label>
                            </div>
                            <div classNameName="col-xs-6">
                                <input required type="text" ng-model="addDoctor.mobile" classNameName="form-control"
                                       placeholder="请输入手机号码"/>
                            </div>
                        </div>

                        <div classNameName="row mt-10">
                            <div classNameName="col-xs-3">
                                <label classNameName="mt-5">密码<span classNameName="red">*</span>：</label>
                            </div>
                            <div classNameName="col-xs-6">
                                <input required type="text" ng-model="addDoctor.password" classNameName="form-control"
                                       placeholder="请输入6-20位密码"/>
                            </div>
                        </div>

                        <div classNameName="row mt-10">
                            <div classNameName="col-xs-6">
                                <div classNameName="row">
                                    <div classNameName="previewContainer">
                                        <img ngf-thumbnail="addDoctor.headImageFile" classNameName="img-responsive"/>
                                    </div>
                                </div>
                                <div classNameName="row">
                                    <div classNameName="center-block w-100">
                                        <button classNameName="btn btn-default btn-block" ngf-select
                                                ng-model="addDoctor.headImageFile">头像上传
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div classNameName="col-xs-6">
                                <div classNameName="row">
                                    <div classNameName="previewContainer">
                                        <img ngf-thumbnail="addDoctor.holdCardImageFile"
                                             classNameName="img-responsive"/>
                                    </div>
                                </div>
                                <div classNameName="row">
                                    <div classNameName="center-block w-100">
                                        <button classNameName="btn btn-default btn-block" ngf-select
                                                ng-model="addDoctor.holdCardImageFile">
                                            持牌照片
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <div classNameName="col-xs-12">
                        <input type="button" classNameName="btn btn-success btn-block"
                               disabled={this.state.invalid}
                               onClick={e=>this.addNewDoctor()} value="确定注册"/>
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

export default connect(mapStateToProps, null, null, {withRef: true})(EditPatient)
