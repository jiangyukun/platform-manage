import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import md5 from 'md5'

import Select1 from '../../../components/core/Select1'
import Input from '../../../components/ui/Input'
import AddPicture from './AddPicture'
import * as antdUtil from '../../../core/utils/antdUtil'

class AddDoctorDialog extends Component {
  constructor(props) {
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleHospitalChange = this.handleHospitalChange.bind(this)
    this.handlePositionChange = this.handlePositionChange.bind(this)
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this)
    this.handleSpecialChange = this.handleSpecialChange.bind(this)
    this.handleMobileChange = this.handleMobileChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleHeadPictureChange = this.handleHeadPictureChange.bind(this)
    this.handleHoldCardPictureChange = this.handleHoldCardPictureChange.bind(this)
    this.checkFormValid = this.checkFormValid.bind(this)

    this.showCancelTip = false
    this.state = {
      show: true,
      valid: false,

      name: '',
      hospital: '',
      department: '',
      position: '',
      special: '',
      mobile: '',
      password: '',
      headPictureUrl: '',
      holdCardPictureUrl: ''
    }
  }

  handleNameChange(event) {
    this.setState({name: event.target.value}, this.checkFormValid)
  }

  handleHospitalChange(selected) {
    this.setState({hospital: selected.value}, this.checkFormValid)
  }

  handleDepartmentChange(selected) {
    this.setState({department: selected.value}, this.checkFormValid)
  }

  handlePositionChange(selected) {
    this.setState({position: selected.value}, this.checkFormValid)
  }

  handleMobileChange(event) {
    this.setState({mobile: event.target.value}, this.checkFormValid)
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value}, this.checkFormValid)
  }

  handleSpecialChange(event) {
    this.setState({special: event.target.value}, this.checkFormValid)
  }

  handleHeadPictureChange(url) {
    this.setState({headPictureUrl: url})
  }

  handleHoldCardPictureChange(url) {
    this.setState({holdCardPictureUrl: url})
  }

  checkFormValid() {
    let valid = true
    if (!this.state.name) valid = false
    if (!this.state.hospital) valid = false
    if (!this.state.department) valid = false
    if (!this.state.position) valid = false
    if (!this.state.mobile) valid = false
    if (!this.state.password) valid = false
    if (valid != this.state.valid) {
      this.setState({valid})
    }
  }

  addNewDoctor() {
    this.props.addNewDoctor({
      doctor_Name: this.state.name,
      hospital_Id: this.state.hospital,
      title_Id: this.state.position,
      department_Id: this.state.department,
      doctor_Major: this.state.special,
      is_Doctor_Purview: this.state.isVisitDoctor == '2' ? 2 : 1,
      doctor_Photo: this.state.headPictureUrl,
      doctor_Practicing_Photo: this.state.holdCardPictureUrl,
      phone: this.state.mobile,
      passWord: md5(this.state.password).toUpperCase()
    }).then(() => {
      this.close(true)
      this.props.addDoctorSuccess()
      antdUtil.tipSuccess('新增医生成功！')
    }, err => antdUtil.tipErr(err))
  }

  close(force) {
    if (!this.empty() && !force) {
      if (this.showCancelTip) {
        return
      }
      this.showCancelTip = true
      antdUtil.confirm('确定放弃此次编辑吗？', () => this.setState({show: false}), () => this.showCancelTip = false)
      return
    }
    this.setState({show: false})
  }

  empty() {
    const {
      name,
      hospital,
      department,
      position,
      special,
      mobile,
      password,
      headPictureUrl,
      holdCardPictureUrl
    } = this.state
    return !(name || hospital || department || position || special || mobile || password || headPictureUrl || holdCardPictureUrl)
  }

  componentDidMount() {
    this._name.getInput().focus()
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={() => this.close()} onExited={this.props.onExited}>
        <Modal.Header closeButton={true}>
          <Modal.Title>注册医生</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="container-fluid">
            <div className="row">
              <div className="col-xs-3">
                <label className="mt-5">医生姓名<span className="red">*</span>：</label>
              </div>
              <div className="col-xs-6">
                <Input ref={c => this._name = c} type="text" className="form-control" placeholder="请输入姓名"
                       required={true} value={this.state.name} onChange={this.handleNameChange}/>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-3">
                <label className="mt-5">医院<span className="red">*</span>：</label>
              </div>
              <div className="col-xs-6">
                <Select1 value={this.state.hospital} selectItems={this.props.hospitalList} required={true}
                         onSelect={this.handleHospitalChange}></Select1>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-3">
                <label className="mt-5">科室<span className="red">*</span>：</label>
              </div>
              <div className="col-xs-6">
                <Select1 required={true}
                         selectItems={this.props.departmentList}
                         value={this.state.department}
                         onSelect={this.handleDepartmentChange}></Select1>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-3">
                <label className="mt-5">职称<span className="red">*</span>：</label>
              </div>
              <div className="col-xs-6">
                <Select1 required={true}
                         selectItems={this.props.positionList}
                         value={this.state.position}
                         onSelect={this.handlePositionChange}
                ></Select1>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-3">
                <label className="mt-5">专长：</label>
              </div>
              <div className="col-xs-9">
                <textarea value={this.state.special} onChange={this.handleSpecialChange} className="form-control"></textarea>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-3">
                <label className="mt-5">手机号码<span className="red">*</span>：</label>
              </div>
              <div className="col-xs-6">
                <Input className="form-control" placeholder="请输入手机号码" type="text"
                       value={this.state.mobile}
                       onChange={this.handleMobileChange}
                       format="^1[34578]\d{9}$" errorTip={<span>请输入正确的手机号码！</span>}/>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-3">
                <label className="mt-5">密码<span className="red">*</span>：</label>
              </div>
              <div className="col-xs-6">
                <Input className="form-control" placeholder="请输入6-20位密码" type="password"
                       value={this.state.password} onChange={this.handlePasswordChange}
                       format="^.{6,20}$" errorTip={<span>请输入6-20位密码</span>}/>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-6">
                <AddPicture tip="图片上传" onPictureUpdated={this.handleHeadPictureChange}/>
              </div>
              <div className="col-xs-6">
                <AddPicture tip="持牌照片" onPictureUpdated={this.handleHoldCardPictureChange}/>
              </div>
            </div>
          </section>
        </Modal.Body>
        <Modal.Footer>
          <div className="col-xs-12">
            <input type="button" className="btn btn-success btn-block"
                   disabled={!this.state.valid}
                   onClick={() => this.addNewDoctor()} value="确定注册"/>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

AddDoctorDialog.propTypes = {
  hospitalList: PropTypes.array,
  positionList: PropTypes.array,
  departmentList: PropTypes.array,
  onExited: PropTypes.func,
  addNewDoctor: PropTypes.func,
  addDoctorSuccess: PropTypes.func
}

export default AddDoctorDialog
