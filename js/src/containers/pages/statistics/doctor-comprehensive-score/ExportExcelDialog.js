/**
 * Created by jiangyukun on 2017/2/15.
 */
import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'

class ExportExcelDialog extends Component {
  state = {
    show: true
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={() => this.setState({show: false})} onExited={this.props.onExited} backdrop="static">
        <Modal.Header closeButton={true}>
          <Modal.Title>导出到excel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{marginTop: '50px', marginBottom: '50px'}}>
            <div>*选择评分导出的起止日期，导出Excel表格将会把此时间段内的所有医生评分记录导出</div>
            <div>*每周五对医生进行评分及排名</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="col-xs-6">
            <input type="button" className="btn btn-success btn-block" value="导出"
                   disabled={!this.state.downloadUrl}
                   onClick={e => this.downloadExcel()}/>
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
