/**
 * Created by jiangyukun on 2017/1/11.
 */
import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'

import Flex from '../../../components/core/layout/Flex'
import Input from '../../../components/ui/Input'

class SendMessageDialog extends Component {
    constructor() {
        super()
        this.state = {
            show: true,

            mobile: ''
        }
    }

    handleMobileChange(event) {
        this.setState({mobile: event.target.value})
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={() => this.setState({show: false})} onExited={this.props.onExited} backdrop="static">
                <Modal.Header closeButton={true}>
                    <Modal.Title>发送短信</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-4">
                                <label className="mt-5">接收人账号<span className="red">*</span>：</label>
                            </div>
                            <div className="col-xs-6">
                                <Input type="text" className="form-control" placeholder="请输入接收人账号"
                                       value={this.state.mobile} onChange={e => this.handleMobileChange(e)}/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-4">
                                <label className="mt-5">接收人姓名：</label>
                            </div>
                            <div className="col-xs-6">
                                <Input type="text" className="form-control" placeholder="输入账号后自动获取"
                                       value={this.state.mobile} disabled={true}/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-4">
                                <label className="mt-5">接收人身份：<span className="red">*</span>：</label>
                            </div>
                            <div className="col-xs-6">
                                <input type="text" className="form-control" placeholder="输入账号后自动获取"
                                       value={this.state.mobile} disabled={true}/>
                            </div>
                        </div>

                        <div className="row mt-10">
                            <div className="col-xs-4">
                                <label className="mt-5">短信内容：<span className="red">*</span>：</label>
                            </div>
                            <div className="col-xs-8">
                                <textarea rows="5" className="form-control"></textarea>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <div className="row">
                        <div className="col-xs-6">
                            <button className="btn btn-block btn-success">发送短信</button>
                        </div>
                        <div className="col-xs-6">
                            <button className="btn btn-block">取消</button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}

SendMessageDialog.propTypes = {
    onExited: PropTypes.func
}

export default SendMessageDialog
