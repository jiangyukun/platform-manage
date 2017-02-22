/**
 * Created by jiangyukun on 2016/12/22.
 */
import React, {Component, PropTypes} from 'react'
import CommonDialog from '../../components/core/CommonDialog'

class YesOrNoDialog extends Component {
  constructor(props) {
    super(props)
    this.originalValue = props.value
    this.state = {show: true, value: props.value || ''}
  }

  handleSelectChange = (e) => {
    this.setState({value: e.target.value})
  }

  close = () => {
    this.setState({show: false})
  }

  confirm = () => {
    this.props.updateYesOrNo(this.state.value)
  }

  componentDidUpdate() {
    if (this.props.valueUpdated) {
      this.close()
    }
  }

  render() {
    return (
      <CommonDialog className="ngdialog ngdialog-theme-default"
                    width="20%"
                    show={this.state.show}
                    onHide={this.close}
                    onExited={this.props.onExited}
      >
        <h4>{this.props.title}</h4>

        <p style={{marginTop: '15px', marginBottom: '15px'}}>
          <select className="form-control" value={this.state.value} onChange={this.handleSelectChange}>
            <option value="">请选择</option>
            <option value="0">否</option>
            <option value="1">是</option>
          </select>
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

YesOrNoDialog.defaultProps = {
  title: '',
  value: ''
}

YesOrNoDialog.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueUpdated: PropTypes.bool,
  onExited: PropTypes.func.isRequired,
  updateYesOrNo: PropTypes.func.isRequired
}

export default YesOrNoDialog
