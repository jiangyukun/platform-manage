/**
 * Created by jiangyu2016 on 2016/10/22.
 */
import React, {Component, PropTypes} from 'react'
import Modal from 'react-bootstrap/lib/Modal'

import Input from '../../../components/ui/Input'
import Select1 from '../../../components/core/Select1'
import EditableImagePreview from '../../../components/core/EditableImagePreview'
import * as antdUtil from '../../../core/utils/antdUtil'
import constants from '../../../core/constants'

class EditDoctorDialog extends Component {
  constructor(props) {
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleHospitalChange = this.handleHospitalChange.bind(this)
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this)
    this.handlePositionChange = this.handlePositionChange.bind(this)
    this.handleSpecialChange = this.handleSpecialChange.bind(this)
    this.handleIsVisitDoctorChange = this.handleIsVisitDoctorChange.bind(this)
    this.checkFormValid = this.checkFormValid.bind(this)
    this.handleHeadPictureChange = this.handleHeadPictureChange.bind(this)
    this.handleHoldCardPictureChange = this.handleHoldCardPictureChange.bind(this)
    const {doctorInfo} = props
    this.hospitalName = doctorInfo['hospital_Id']
    this.departmentName = doctorInfo['department_Id']
    this.positionName = doctorInfo['title_Id']
    this.mobile = doctorInfo['phone']
    this.state = {
      show: true,
      showHeadPicture: false,
      showHoldCardPicture: false,
      valid: false,

      name: doctorInfo['doctor_Name'],
      hospital: doctorInfo['hid'],
      department: doctorInfo['did'],
      position: doctorInfo['tid'],
      isVisitDoctor: doctorInfo['is_Doctor_Purview'],
      special: doctorInfo['doctor_Major'],
      headPictureUrl: doctorInfo['doctor_Photo'],
      holdCardPictureUrl: doctorInfo['doctor_Practicing_Photo'],
      auditingState: doctorInfo['doctor_Is_Checked']
    }
  }

  close(force) {
    let edited = false
    const {
      doctor_Name, hid, did, tid, is_Doctor_Purview, doctor_Major, doctor_Photo, doctor_Practicing_Photo
    } = this.props.doctorInfo
    if (this.state.name != doctor_Name) edited = true
    if (this.state.hospital != hid) edited = true
    if (this.state.department != did) edited = true
    if (this.state.position != tid) edited = true
    if (this.state.isVisitDoctor != is_Doctor_Purview) edited = true
    if (this.state.special != doctor_Major) edited = true
    if (this.state.headPictureUrl != doctor_Photo) edited = true
    if (this.state.holdCardPictureUrl != doctor_Practicing_Photo) edited = true

    if (this.props.isCanEdit && !force && edited) {
      if (this.showCancelEditTip) return
      this.showCancelEditTip = true
      antdUtil.confirm('您修改了医生信息，确定放弃此次操作吗？', () => this.setState({show: false}), () => this.showCancelEditTip = false)
    } else {
      this.setState({show: false})
    }
  }

  cancelAuditing() {
    this._updateAuditingState('撤销审核', constants.auditingState.auditing)
  }

  markUnPass() {
    this._updateAuditingState('标为不通过', constants.auditingState.auditingUnPass)
  }

  markPass() {
    this._updateAuditingState('标为已审核', constants.auditingState.auditingPass)
  }

  _updateAuditingState(tip, state) {
    antdUtil.confirm(`确定${tip}吗？`, () => this.props.updateDoctorAuditingState(this.props.doctorId, state)
      .then(() => antdUtil.tipSuccess(`${tip}成功！`), err => antdUtil.tipErr(err))
      .then(this.setState({show: false}))
    )
  }

  handleNameChange(event) {
    this.setState({name: event.target.value}, this.checkFormValid)
  }

  handleHospitalChange({value, text}) {
    this.hospitalName = text
    this.setState({hospital: value}, this.checkFormValid)
  }

  handleDepartmentChange({value, text}) {
    this.departmentName = text
    this.setState({department: value}, this.checkFormValid)
  }

  handlePositionChange({value, text}) {
    this.positionName = text
    this.setState({position: value}, this.checkFormValid)
  }

  handleSpecialChange(event) {
    this.setState({special: event.target.value}, this.checkFormValid)
  }

  handleIsVisitDoctorChange(event) {
    this.setState({isVisitDoctor: event.target.value}, this.checkFormValid)
  }

  handleHeadPictureChange(url) {
    this.setState({headPictureUrl: url}, this.checkFormValid)
  }

  handleHoldCardPictureChange(url) {
    this.setState({holdCardPictureUrl: url}, this.checkFormValid)
  }

  checkFormValid() {
    let valid = true
    if (!this.state.name) valid = false
    if (!this.state.hospital) valid = false
    if (!this.state.department) valid = false
    if (!this.state.position) valid = false
    if (valid != this.state.valid) {
      this.setState({valid})
    }
  }

  updateDoctorInfo() {
    this.props.updateDoctorInfo({
      doctor_Id: this.props.doctorInfo['doctor_Id'],
      doctor_Name: this.state.name,
      phone: this.mobile,
      hospital_Id: this.state.hospital,
      doctor_Department: this.state.department,
      doctor_Title: this.state.position,
      doctor_Major: this.state.special,
      doctor_Photo: this.state.headPictureUrl,
      doctor_Practicing_Photo: this.state.holdCardPictureUrl,
      is_Doctor_Purview: this.state.isVisitDoctor == '2' ? 2 : 1
    }, {
      hospitalName: this.hospitalName,
      positionName: this.positionName,
      departmentName: this.departmentName
    }).then(() => {
      this.close(true)
      antdUtil.tipSuccess('更新医生信息成功！')
      this.props.handleIsVisitDoctorChange()
    }, err => antdUtil.tipErr(err))
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={() => this.close()} onExited={this.props.onExited} backdrop="static">
        <Modal.Header closeButton={true}>
          <Modal.Title>编辑医生信息</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            this.state.showHeadPicture && (
              <EditableImagePreview url={this.state.headPictureUrl}
                                    imageUrlUpdated={this.handleHeadPictureChange}
                                    onExited={() => this.setState({showHeadPicture: false})}/>
            )
          }
          {
            this.state.showHoldCardPicture && (
              <EditableImagePreview url={this.state.holdCardPictureUrl}
                                    imageUrlUpdated={this.handleHoldCardPictureChange}
                                    onExited={() => this.setState({showHoldCardPicture: false})}/>
            )
          }
          <section className="container-fluid flex1">
            <div className="row">
              <div className="col-xs-3">
                <label className="mt-5">医生姓名<span className="red">*</span>：</label>
              </div>
              <div className="col-xs-6">
                <Input type="text" className="form-control"
                       required={true} value={this.state.name}
                       onChange={this.handleNameChange}/>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-3">
                <label className="mt-5">医院<span className="red">*</span>：</label>
              </div>
              <div className="col-xs-6">
                <Select1 value={this.state.hospital} selectItems={this.props.hospitalList} required={true}
                         onSelect={this.handleHospitalChange} disabled={this.state.auditingState == constants.auditingState.auditingPass}></Select1>
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
                <Select1 required={true} value={this.state.position}
                         selectItems={this.props.positionList}
                         onSelect={this.handlePositionChange}></Select1>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-3">
                <label className="mt-5">是否随访医生：</label>
              </div>
              <div className="col-xs-6">
                <select className="form-control" value={this.state.isVisitDoctor} onChange={this.handleIsVisitDoctorChange}>
                  <option value="">请选择</option>
                  <option value="1">否</option>
                  <option value="2">是</option>
                </select>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-3">
                <label className="mt-5">专长：</label>
              </div>
              <div className="col-xs-9">
                <textarea value={this.state.special} className="form-control" onChange={this.handleSpecialChange}></textarea>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-6">
                <button className="btn btn-default" onClick={e => this.setState({showHeadPicture: true})}>查看用户头像</button>
              </div>
              <div className="col-xs-6">
                <button className="btn btn-default" onClick={e => this.setState({showHeadPicture: true})}>查看持证照片</button>
              </div>
            </div>
          </section>
        </Modal.Body>
        <Modal.Footer>
          {
            this.props.isCanEdit && (
              <div className="row mt-10">
                <div className="col-xs-3">
                  <input type="button" className="btn btn-danger btn-block" onClick={e => this.cancelAuditing()}
                         disabled={this.state.auditingState == 1} value="撤销审核"/>
                </div>
                <div className="col-xs-3">
                  <input type="button" className="btn btn-danger btn-block" onClick={e => this.markUnPass()}
                         disabled={this.state.auditingState == 3} value="标为不通过"/>
                </div>
                <div className="col-xs-3">
                  <input type="button" className="btn btn-success btn-block" onClick={e => this.markPass()}
                         disabled={this.state.auditingState == 2} value="标为已审核"/>
                </div>
                <div className="col-xs-3">
                  <input type="button" className="btn btn-success btn-block"
                         onClick={e => this.updateDoctorInfo()}
                         disabled={!this.state.valid}
                         value="保存修改"/>
                </div>
              </div>
            )
          }
        </Modal.Footer>
      </Modal>
    )
  }
}

EditDoctorDialog.defaultProps = {
  updateDoctorInfoSuccess: () => {}
}

EditDoctorDialog.propTypes = {
  doctorId: PropTypes.string,
  doctorInfo: PropTypes.object,
  hospitalList: PropTypes.array,
  positionList: PropTypes.array,
  departmentList: PropTypes.array,
  updateDoctorInfo: PropTypes.func,
  updateDoctorAuditingState: PropTypes.func,
  updateDoctorInfoSuccess: PropTypes.func,
  isCanEdit: PropTypes.bool,
  onExited: PropTypes.func
}

export default EditDoctorDialog
