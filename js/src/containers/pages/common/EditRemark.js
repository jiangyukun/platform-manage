/**
 * Created by jiangyukun on 2016/12/22.
 */
import React, {Component, PropTypes} from 'react'
import CommonDialog from '../../../components/core/CommonDialog'

import * as antdUtil from '../../../core/utils/antdUtil'

class EditRemark extends Component {
    constructor(props) {
        super(props)
        this.close = this.close.bind(this)
        this.confirm = this.confirm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.originalValue = props.value
        this.state = {show: true, value: props.value || ''}
    }

    handleChange(event) {
        this.setState({value: event.target.value.trim()})
    }

    close() {
        this.setState({show: false})
    }

    confirm() {
        this.props.updateRemark(this.props.patientId, this.props.infoId, this.props.remarkType, this.state.value)
            .then(() => antdUtil.tipSuccess('修改备注成功！'), err => antdUtil.tipErr(err)).then(this.close())
    }

    render() {
        return (
            <CommonDialog show={this.state.show} onHide={this.close} onExited={this.props.onExited} width="30%" className="ngdialog ngdialog-theme-default">
                <h4>修改备注</h4>

                <p style={{marginTop: '15px', marginBottom: '15px'}}>
                    <textarea className="form-control" rows="4" value={this.state.value} onChange={this.handleChange}></textarea>
                </p>
                <div className="ngdialog-buttons">
                    <button type="button" className="ngdialog-button ngdialog-button-secondary" onClick={this.close}>取消</button>
                    <button type="button" className="ngdialog-button ngdialog-button-primary"
                            onClick={this.confirm}
                            disabled={this.state.value == this.originalValue}>确定
                    </button>
                </div>
            </CommonDialog>
        )
    }
}

EditRemark.defaultProps = {
    value: ''
}

EditRemark.propTypes = {
    patientId: PropTypes.string,
    infoId: PropTypes.string,
    value: PropTypes.string,
    onExited: PropTypes.func,
    remarkType: PropTypes.number,
    updateRemark: PropTypes.func
}

export default EditRemark