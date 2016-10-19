import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal, Button} from 'react-bootstrap'

import Select1 from '../../core/Select1'

class AddDoctor extends Component {
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
                    <section className="container-fluid" ng-form="addDoctor.form">
                        <div className="row">
                            <div className="col-xs-3">
                                <label className="mt-5">医生姓名<span className="red">*</span>：</label>
                            </div>
                            <div className="col-xs-6">
                                <input required ng-model="addDoctor.doctorName" type="text" className="form-control"
                                       placeholder="请输入姓名"/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">医院<span className="red">*</span>：</label>
                            </div>
                            <div className="col-xs-6">
                                <Select1 selectItems={this.props.hospitalList} required={true}></Select1>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">科室<span className="red">*</span>：</label>
                            </div>
                            <div className="col-xs-6">
                                <select required className="form-control" ng-model="addDoctor.department"
                                        ng-options="department.id as department.text for department in addDoctor.departmentList"></select>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">职称<span className="red">*</span>：</label>
                            </div>
                            <div className="col-xs-6">
                                <select required className="form-control" ng-model="addDoctor.position"
                                        ng-options="position.id as position.text for position in addDoctor.positionList"></select>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">专长：</label>
                            </div>
                            <div className="col-xs-9">
                                <textarea ng-model="addDoctor.special" className="form-control"></textarea>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">手机号码<span className="red">*</span>：</label>
                            </div>
                            <div className="col-xs-6">
                                <input required type="text" ng-model="addDoctor.mobile" className="form-control"
                                       placeholder="请输入手机号码"/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-3">
                                <label className="mt-5">密码<span className="red">*</span>：</label>
                            </div>
                            <div className="col-xs-6">
                                <input required type="text" ng-model="addDoctor.password" className="form-control"
                                       placeholder="请输入6-20位密码"/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-6">
                                <div className="row">
                                    <div className="previewContainer">
                                        <img ngf-thumbnail="addDoctor.headImageFile" className="img-responsive"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="center-block w-100">
                                        <button className="btn btn-default btn-block" ngf-select
                                                ng-model="addDoctor.headImageFile">头像上传
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="row">
                                    <div className="previewContainer">
                                        <img ngf-thumbnail="addDoctor.holdCardImageFile" className="img-responsive"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="center-block w-100">
                                        <button className="btn btn-default btn-block" ngf-select
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
                    <div className="col-xs-12">
                        <input type="button" className="btn btn-success btn-block"
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

export default connect(mapStateToProps, null, null, {withRef: true})(AddDoctor)
