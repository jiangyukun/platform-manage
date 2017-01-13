/**
 * Created by jiangyukun on 2017/1/11.
 */
import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'

import Input from '../../../components/ui/Input'
import Select1 from '../../../components/core/Select1'
import * as antdUtil from '../../../core/utils/antdUtil'
import * as formatBusData from '../../../core/formatBusData'

class SendMessageDialog extends Component {
    constructor() {
        super()
        this.state = {
            show: true,

            mobile: '',
            username: '',
            userType: '',
            smsTemplate: '',
        }
    }

    handleMobileChange(event) {
        const mobile = event.target.value
        if (this._mobile.isValid(mobile)) {
            this.props.fetchUserTypeAndName(mobile).then(info => {
                const {name, userType} = info
                this.setState({username: name || '未知', userType: formatBusData.getUserType(userType)})
            }, err => {
                this.setState({username: '无此用户', userType: '无此用户'})
            })
        } else {
            this.setState({username: '', userType: ''})
        }
        this.setState({mobile})
    }

    handleSmsTemplateChange({value, text}) {
        this.setState({smsTemplate: text})
    }

    sendSMS() {
        antdUtil.confirm('确定发送短信吗？', () => {
            this.props.sendSmsMessage(this.state.mobile, this.state.smsTemplate)
        })
    }

    close() {
        this.setState({show: false})
    }

    componentDidMount() {
        if (this.props.smsTemplate.length == 0) {
            this.props.fetchAllSmsTemplate()
        }
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={() => this.close()} onExited={this.props.onExited} backdrop="static">
                <Modal.Header closeButton={true}>
                    <Modal.Title>发送短信</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-4">
                                <label className="mt-5">接收人账号：<span className="red">*</span></label>
                            </div>
                            <div className="col-xs-6">
                                <Input type="text" className="form-control" placeholder="请输入接收人账号"
                                       ref={c => this._mobile = c} format="^1[34578]\d{9}$" errorTip="请输入正确的手机号码！"
                                       value={this.state.mobile} onChange={e => this.handleMobileChange(e)}/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-4">
                                <label className="mt-5">接收人姓名：</label>
                            </div>
                            <div className="col-xs-6">
                                <input type="text" className="form-control" placeholder="输入账号后自动获取"
                                       value={this.state.username} disabled={true}/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-4">
                                <label className="mt-5">接收人身份：</label>
                            </div>
                            <div className="col-xs-6">
                                <input type="text" className="form-control" placeholder="输入账号后自动获取"
                                       value={this.state.userType} disabled={true}/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-4">
                                <label className="mt-5">选择短信模板：<span className="red">*</span></label>
                            </div>
                            <div className="col-xs-8">
                                <Select1 selectItems={this.props.smsTemplate}
                                         onSelect={selected => this.handleSmsTemplateChange(selected)}/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-4">
                                <label className="mt-5">短信内容：</label>
                            </div>
                            <div className="col-xs-8">
                                <textarea value={this.state.smsTemplate} disabled={true} rows="5" className="form-control break-all"></textarea>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <div className="row">
                        <div className="col-xs-6">
                            <button className="btn btn-block btn-success" onClick={e => this.sendSMS()}>发送短信</button>
                        </div>
                        <div className="col-xs-6">
                            <button className="btn btn-block" onClick={e => this.close()}>取消</button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}

SendMessageDialog.propTypes = {
    fetchUserTypeAndName: PropTypes.func,
    smsTemplate: PropTypes.array,
    fetchAllSmsTemplate: PropTypes.func,
    sendSmsMessage: PropTypes.func,
    onExited: PropTypes.func
}

export default SendMessageDialog
