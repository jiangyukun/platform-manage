/**
 * Created by jiangyukun on 2017/1/6.
 */
import React, {Component, PropTypes} from 'react'
import Modal from 'react-bootstrap/lib/Modal'

import Select1 from '../../components/core/Select1'

class DownloadExcelDialog extends Component {
  constructor() {
    super()
    this.selectItem = this.selectItem.bind(this)
    this.state = {
      show: true,
      historyList: [],
      downloadUrl: ''
    }
  }

  selectItem({value, text}) {
    this.setState({downloadUrl: value})
  }

  downloadExcel() {
    window.open(this.state.downloadUrl)
  }

  componentDidMount() {
    this.props.fetchHistoryAssayReportList().then(result => {
      const list = result.map(historyItem => {
        return {
          value: historyItem['file_dowload_url'],
          text: historyItem['file_name']
        }
      })
      this.setState({
        historyList: list
      })
    }, err => {
      console.log(err)
    })
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={() => this.setState({show: false})} onExited={this.props.onExited} backdrop="static">
        <Modal.Header closeButton={true}>
          <Modal.Title>文件列表</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{marginTop: '50px', marginBottom: '50px'}}>
            <Select1 selectItems={this.state.historyList} onSelect={this.selectItem}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="col-xs-6">
            <input type="button" className="btn btn-success btn-block" value="下载"
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

DownloadExcelDialog.propTypes = {
  fetchHistoryAssayReportList: PropTypes.func,
  onExited: PropTypes.func
}

export default DownloadExcelDialog
