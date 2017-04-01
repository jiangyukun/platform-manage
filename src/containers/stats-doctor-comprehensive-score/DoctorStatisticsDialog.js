/**
 * Created by jiangyukun on 2017/2/15.
 */
import React, {Component, PropTypes} from 'react'
import Modal from 'react-bootstrap/lib/Modal'

class DoctorStatisticsDialog extends Component {
  state = {
    show: true
  }

  componentDidMount() {
    this.props.fetchDoctorStatisticsList(this.props.doctorId)
  }

  render() {
    return (
      <Modal show={this.state.show}
             onHide={() => this.setState({show: false})}
             bsStyle="lg"
             onExited={this.props.onExited}
             backdrop="static">
        <Modal.Header closeButton={true}>
          <Modal.Title>{this.props.doctorName + ' ' + this.props.hospitalName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{marginTop: '50px', marginBottom: '50px'}}>
            <table className="table table-striped table-bordered">
              <thead>
              <tr>
                <th>患者数</th>
                <th>平均患者数</th>
                <th>阻断成功</th>
                <th>阻断失败</th>
                <th>抗病毒</th>
                <th>需抗病毒</th>
                <th>得分</th>
                <th>排名</th>
                <th>记录时间</th>
              </tr>
              </thead>
              <tbody>
              {
                this.props.doctorStatisticsList && this.props.doctorStatisticsList.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item['bind_Patient_Count']}</td>
                      <td>{item['average_Patient_Count']}</td>
                      <td>{item['baby_Blocking_Success_Count']}</td>
                      <td>{item['baby_Blocking_Failure_Count']}</td>
                      <td>{item['accept_Antiviral_Count']}</td>
                      <td>{item['need_Antiviral_Count']}</td>
                      <td>{item['score']}</td>
                      <td>{item['ranking']}</td>
                      <td>{item['create_Time']}</td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

DoctorStatisticsDialog.propTypes = {
  doctorId: PropTypes.string,
  doctorStatisticsList: PropTypes.array,
  doctorName: PropTypes.string,
  hospitalName: PropTypes.string,
  fetchDoctorStatisticsList: PropTypes.func,
  onExited: PropTypes.func
}

export default DoctorStatisticsDialog
