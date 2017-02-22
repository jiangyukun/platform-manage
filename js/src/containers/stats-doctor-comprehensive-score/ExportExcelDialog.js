/**
 * Created by jiangyukun on 2017/2/15.
 */
import React, {Component, PropTypes} from 'react'
import DatePicker from 'antd/lib/date-picker'
import Modal from 'react-bootstrap/lib/Modal'

class ExportExcelDialog extends Component {
  state = {
    show: true,
    startDay: null,
    endDay: null
  }

  handleStartDayChange = moment => {
    this.setState({startDay: moment})
  }

  handleEndDayChange = moment => {
    this.setState({endDay: moment})
  }

  downloadExcel = () => {
    let startDayFormatted = '', endDayFormatted = ''
    if (this.state.startDay) {
      startDayFormatted = this.state.startDay.format('YYYY-MM-DD')
    }
    if (this.state.endDay) {
      endDayFormatted = this.state.endDay.format('YYYY-MM-DD')
    }
    location.href = `doctorScore/doctorScoreListExcel?start_Time=${startDayFormatted}&end_Time=${endDayFormatted}`
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={() => this.setState({show: false})} onExited={this.props.onExited} backdrop="static">
        <Modal.Header closeButton={true}>
          <Modal.Title>导出到excel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="select-start-end-day">
            <div>
              <label>开始时间：</label>
              <div className="date-picker-container">
                <DatePicker inputPrefixCls="w100" value={this.state.startDay} onChange={this.handleStartDayChange}/>
              </div>
            </div>
            <div className="mt-10">
              <label>结束时间：</label>
              <div className="date-picker-container">
                <DatePicker inputPrefixCls="w100" value={this.state.endDay} onChange={this.handleEndDayChange}/>
              </div>
            </div>
          </div>
          <div style={{marginTop: '50px', marginBottom: '50px'}}>
            <div>*选择评分导出的起止日期，导出Excel表格将会把此时间段内的所有医生评分记录导出</div>
            <div>*每周五对医生进行评分及排名</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="col-xs-6">
            <input type="button" className="btn btn-success btn-block" value="导出"
                   disabled={!this.state.startDay && !this.state.endDay}
                   onClick={this.downloadExcel}/>
          </div>
          <div className="col-xs-6">
            <input type="button" className="btn btn-default btn-block" onClick={() => this.setState({show: false})} value="取消"/>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

ExportExcelDialog.propTypes = {
  onExited: PropTypes.func
}

export default ExportExcelDialog
