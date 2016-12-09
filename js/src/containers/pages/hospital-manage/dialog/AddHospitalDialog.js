import React, {Component, PropTypes} from 'react'
import {Modal, Button} from 'react-bootstrap'
import notification from 'antd/lib/notification'

import Select1 from '../../../../components/core/Select1'

class AddHospitalDialog extends Component {
    constructor(props) {
        super(props)
        this.checkFormValid = this.checkFormValid.bind(this)
        this.state = {
            show: true,

            hospitalName: '', // 医院名称
            regionNumber: '', // 区域号
            serialNumber: '', // 流水号
            provinceId: '',
            cityId: '',
            manager: '',

            cityMaxSerialNumber: null,
            invalid: true
        }
    }

    close() {
        this.setState({show: false})
        setTimeout(() => this.props.onClose(), this.props.closeTimeout)
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
        this.setState({manager: e.target.value.trim()})
    }

    onSelectProvince(selectedItem) {
        const provinceId = selectedItem.value
        this.setState({provinceId, cityId: '', cityMaxSerialNumber: null}, this.checkFormValid)
        if (!this.props.cityMapper[provinceId]) {
            this.props.fetchCityList(provinceId)
        }
    }

    onSelectCity(selectedItem) {
        const cityId = selectedItem.value
        this.setState({cityId}, this.checkFormValid)
        if (cityId) {
            this.setState({cityMaxSerialNumber: -1})
        }
        this.props.fetchCityMaxSerialNumber(cityId).then(maxSerialNumber => this.setState({cityMaxSerialNumber: maxSerialNumber}))
    }

    // 信息是否完整，是否可以提交
    checkFormValid() {
        let valid = true
        if (!this.state.hospitalName) valid = false
        if (!this.state.regionNumber) valid = false
        if (!this.state.serialNumber) valid = false
        if (!this.state.provinceId) valid = false
        if (!this.state.cityId) valid = false
        if (!this._isProjectHospital.getSelected().value) valid = false

        const invalid = !valid
        if (invalid != this.state.invalid) {
            this.setState({invalid: !valid})
        }
    }

    addHospital() {
        this.props.addHospital({
            "hospital_Name": this.state.hospitalName,
            "province": this._province.getSelected().text,
            "city": this._city.getSelected().text,
            "hospitalSerialNumber": this.state.serialNumber,
            "cityCode": this.state.regionNumber,
            "hospital_In_Project": this._isProjectHospital.getSelected().value
        }).then(() => {
            notification.success({message: '提示', description: '添加医院成功！'})
            this.close()
        }, err => {
            notification.error({message: '提示', description: err})
        })
    }

    render() {
        let cityList = []
        if (this.state.provinceId) {
            cityList = this.props.cityMapper[this.state.provinceId] || []
        }

        let serialNumberPlaceHolder
        if (this.state.cityMaxSerialNumber == null) {
            serialNumberPlaceHolder = '请输入流水号'
        } else if (this.state.cityMaxSerialNumber == -1) {
            serialNumberPlaceHolder = '获取该地区流水号中...'
        } else {
            serialNumberPlaceHolder = '该地区流水号已到' + this.state.cityMaxSerialNumber + '，推荐填写' + (this.state.cityMaxSerialNumber + 1)
        }

        return (
            <Modal show={this.state.show} onHide={() => this.close()} backdrop="static">
                <Modal.Header closeButton={true}>
                    <Modal.Title>新增医院</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className="container-fluid">
                        <div className="row">
                            <div className="col-xs-4">
                                <label className="mt-5">医院名称：<span className="red">*</span>：</label>
                            </div>
                            <div className="col-xs-6">
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
                                         required={true}
                                         onSelect={selectedItem => this.onSelectProvince(selectedItem)}></Select1>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-4">
                                <label className="mt-5">城市/地区<span className="red">*</span>：</label>
                            </div>
                            <div className="col-xs-6">
                                <Select1 ref={c => this._city = c} selectItems={cityList}
                                         required={true} value={this.state.cityId}
                                         onSelect={selectedItem => this.onSelectCity(selectedItem)}>
                                </Select1>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-4">
                                <label className="mt-5">是否项目医院：<span className="red">*</span>：</label>
                            </div>
                            <div className="col-xs-6">
                                <Select1 ref={c => this._isProjectHospital = c} selectItems={[{value: '1', text: '是'}, {value: '0', text: '否'}]}
                                         required={true}></Select1>
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
                                <input type="text" className="form-control" placeholder={serialNumberPlaceHolder}
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
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <div className="col-xs-6">
                        <input type="button" className="btn btn-success btn-block" value="保存"
                               disabled={this.state.invalid}
                               onClick={e => this.addHospital()}/>
                    </div>
                    <div className="col-xs-6">
                        <input type="button" className="btn btn-default btn-block" onClick={() => this.close()} value="取消"/>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}

AddHospitalDialog.defaultProps = {
    closeTimeout: 250
}

AddHospitalDialog.propTypes = {
    provinceList: PropTypes.array,
    cityMapper: PropTypes.object,
    fetchCityList: PropTypes.func,
    fetchCityMaxSerialNumber: PropTypes.func,
    addHospital: PropTypes.func,
    closeTimeout: PropTypes.number,
    onClose: PropTypes.func
}

export default AddHospitalDialog
