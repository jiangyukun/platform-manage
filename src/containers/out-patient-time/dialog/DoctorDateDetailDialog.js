/**
 * Created by jiangyukun on 2017/1/19.
 */
import React, {Component, PropTypes} from 'react'
import Modal from 'react-bootstrap/lib/Modal'

import {getYesOrNoText} from '../../../core/formatBusData'

class DoctorDateDetailDialog extends Component {
  state = {show: true}

  close() {
    this.setState({show: false})
  }

  componentDidMount() {
    this.props.fetchDoctorDateDetail(this.props.userId)
  }

  render() {
    const {doctorName, hospital, dateList} = this.props.doctorDateDetail
    return (
      <Modal show={this.state.show} onHide={() => this.close()} onExited={this.props.onExited} backdrop="static">
        <Modal.Header closeButton={true}>
          <Modal.Title>{(doctorName || '') + ' ' + (hospital || '')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-bordered table-striped">
            <thead>
            <tr>
              <th>开始时间</th>
              <th>结束时间</th>
              <th>通知内容</th>
              <th>是否撤销</th>
              <th>发出时间</th>
            </tr>
            </thead>
            <tbody>
            {
              dateList && dateList.map((detail, index) => {
                return (
                  <tr key={index}>
                    <td>{detail['start_time']}</td>
                    <td>{detail['end_time']}</td>
                    <td>{detail['context']}</td>
                    <td>{getYesOrNoText(detail['status'])}</td>
                    <td>{detail['create_time']}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
          {
            (!dateList || dateList.length == 0) && (
              <div className="center-block" style={{width: '100px'}}>暂无数据</div>
            )
          }
        </Modal.Body>
      </Modal>
    )
  }
}

DoctorDateDetailDialog.propTypes = {
  userId: PropTypes.string,
  doctorDateDetail: PropTypes.object,
  fetchDoctorDateDetail: PropTypes.func,
  onExited: PropTypes.func
}

export default DoctorDateDetailDialog
