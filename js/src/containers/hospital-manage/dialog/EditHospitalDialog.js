import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import notification from 'antd/lib/notification'
import Select1 from '../../../components/core/Select1'

class EditHospitalDialog extends Component {
  constructor(props) {
    super(props)
    this.onProvinceChange = this.onProvinceChange.bind(this)
    this.checkFormValid = this.checkFormValid.bind(this)
    this.state = {
      show: true,

      hospitalId: '',
      hospitalName: '', // 医院名称
      regionNumber: '', // 区域号
      serialNumber: '', // 流水号
      provinceId: '',
      cityId: '',
      isProjectHospital: '',
      manager: '',
      operationPerson: '',

      invalid: true
    }
  }

  handleHospitalNameChange(e) {
    this.setState({hospitalName: e.target.value.trim()}, this.checkFormValid)
  }

  handleRegionNumberChange(e) {
    this.setState({regionNumber: e.target.value.trim()}, this.checkFormValid)
  }

  handleSerialNumberChange(e) {
    this.setState({serialNumber: e.target.value.trim()}, this.checkFormValid)
  }

  handleManagerChange(e) {
    this.setState({manager: e.target.value.trim()}, this.checkFormValid)
  }

  handleOperationPersonChange(e) {
    this.setState({operationPerson: e.target.value.trim()}, this.checkFormValid)
  }

  onSelectIsProjectHospital(selectedItem) {
    this.setState({isProjectHospital: selectedItem.value}, this.checkFormValid)
  }

  onSelectProvince(selectedItem) {
    const provinceId = selectedItem.value
    if (provinceId != this.state.provinceId) {
      this.setState({provinceId, cityId: '', invalid: true}, this.onProvinceChange)
    }
  }

  onProvinceChange() {
    const provinceId = this.state.provinceId
    if (!provinceId) return
    if (!this.props.cityMapper[provinceId]) {
      this.props.fetchCityList(provinceId)
    }
  }

  onSelectCity(selectedItem) {
    const cityId = selectedItem.value
    this.setState({cityId}, this.checkFormValid)
  }

  // 信息是否完整，是否可以提交
  checkFormValid() {
    let valid = true
    if (!this.state.hospitalName) valid = false
    if (!this.state.regionNumber) valid = false
    if (!this.state.serialNumber) valid = false
    if (!this.state.provinceId) valid = false
    if (!this.state.cityId) valid = false
    if (this.state.isProjectHospital === '') valid = false

    const invalid = !valid
    if (invalid != this.state.invalid) {
      this.setState({invalid})
    }
  }

  // 更新医院信息
  updateHospitalInfo() {
    this.props.updateHospitalInfo({
      "id": this.props.hospitalId,
      "hospital_Name": this.state.hospitalName,
      "province": this._province.getSelected().text,
      "city": this._city.getSelected().text,
      "hospitalSerialNumber": this.state.serialNumber,
      "cityCode": this.state.regionNumber,
      "hospital_In_Project": this._isProjectHospital.getSelected().value,
      "backend_Manager": this.state.manager || '',
      "operation_Manager": this.state.operationPerson || ''
    }).then(() => {
      this.setState({show: false})
      notification.success({message: '提示', description: '更新医院成功！'})
    }, err => {
      notification.error({message: '提示', description: err})
    })
  }

  componentDidMount() {
    this.props.fetchHospitalInfo(this.props.hospitalId).then(hospitalInfo => {
      this.maxSerialNumber = 0
      this.setState({
        hospitalName: hospitalInfo['hospital_Name'] || '',
        serialNumber: hospitalInfo['hospitalSerialNumber'] || '',
        provinceId: hospitalInfo['province'] || '',
        cityId: hospitalInfo['city'] || '',
        regionNumber: hospitalInfo['cityCode'] || '',
        isProjectHospital: hospitalInfo['hospital_In_Project'],
        manager: hospitalInfo['backend_Manager'] || '',
        operationPerson: hospitalInfo['operation_Manager'] || ''
      }, this.onProvinceChange)
    })
  }

  render() {
    let cityList = []
    if (this.state.provinceId) {
      cityList = this.props.cityMapper[this.state.provinceId] || []
    }
    const serialNumberPlaceholder = '该地区流水号已到' + this.maxSerialNumber + '，推荐填写' + (this.maxSerialNumber + 1)

    let hospitalNameClass = this.state.hospitalName.length > 12 ? 'col-xs-7' : 'col-xs-6'

    return (
      <Modal show={this.state.show} onHide={() => this.setState({show: false})} onExited={this.props.onExited} backdrop="static">
        <Modal.Header closeButton={true}>
          <Modal.Title>修改医院</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="container-fluid">
            <div className="row">
              <div className="col-xs-4">
                <label className="mt-5">医院名称：<span className="red">*</span>：</label>
              </div>
              <div className={hospitalNameClass}>
                <input type="text" className="form-control" placeholder="请输入医院名称"
                       value={this.state.hospitalName} onChange={e => this.handleHospitalNameChange(e)}/>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-4">
                <label className="mt-5">省份：<span className="red">*</span>：</label>
              </div>
              <div className="col-xs-6">
                <Select1 ref={c => this._province = c} selectItems={this.props.provinceList}
                         required={true} value={this.state.provinceId}
                         onSelect={selectedItem => this.onSelectProvince(selectedItem)}
                >
                </Select1>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-4">
                <label className="mt-5">城市/地区<span className="red">*</span>：</label>
              </div>
              <div className="col-xs-6">
                <Select1 ref={c => this._city = c}
                         selectItems={cityList}
                         required={true}
                         value={this.state.cityId}
                         onSelect={selectedItem => this.onSelectCity(selectedItem)}
                ></Select1>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-4">
                <label className="mt-5">是否项目医院：<span className="red">*</span>：</label>
              </div>
              <div className="col-xs-6">
                <Select1 ref={c => this._isProjectHospital = c}
                         title="项目医院"
                         value={this.state.isProjectHospital}
                         selectItems={[{value: '1', text: '是'}, {value: '0', text: '否'}]}
                         required={true}
                         onSelect={e => this.onSelectIsProjectHospital(e)}>
                </Select1>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-4">
                <label className="mt-5">区域号：<span className="red">*</span>：</label>
              </div>
              <div className="col-xs-6">
                <input type="text" className="form-control" placeholder="请输入区域号"
                       value={this.state.regionNumber} onChange={e => this.handleRegionNumberChange(e)}/>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-4">
                <label className="mt-5">流水号：<span className="red">*</span>：</label>
              </div>
              <div className="col-xs-6">
                <input type="text" className="form-control" placeholder={serialNumberPlaceholder}
                       value={this.state.serialNumber} onChange={e => this.handleSerialNumberChange(e)}/>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-4">
                <label className="mt-5">后台管理人员：</label>
              </div>
              <div className="col-xs-6">
                <input type="text" className="form-control" placeholder="请输入后台管理人员"
                       value={this.state.manager} onChange={e => this.handleManagerChange(e)}/>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-4">
                <label className="mt-5">运营人员：</label>
              </div>
              <div className="col-xs-6">
                <input type="text" className="form-control" placeholder="请输入运营人员"
                       value={this.state.operationPerson} onChange={e => this.handleOperationPersonChange(e)}/>
              </div>
            </div>
          </section>
        </Modal.Body>
        <Modal.Footer>
          <div className="col-xs-6">
            <input type="button" className="btn btn-success btn-block" value="保存"
                   disabled={this.state.invalid}
                   onClick={e => this.updateHospitalInfo()}/>
          </div>
          <div className="col-xs-6">
            <input type="button" className="btn btn-default btn-block" onClick={() => this.setState({show: false})} value="取消"/>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

EditHospitalDialog.propTypes = {
  hospitalId: PropTypes.string,
  provinceList: PropTypes.array,
  cityMapper: PropTypes.object,
  fetchCityList: PropTypes.func,
  fetchCityMaxSerialNumber: PropTypes.func,
  updateHospitalInfo: PropTypes.func,
  onExited: PropTypes.func
}

export default EditHospitalDialog
