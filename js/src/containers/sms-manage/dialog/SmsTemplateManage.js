/**
 * Created by jiangyukun on 2017/1/16.
 */
import React, {Component, PropTypes} from 'react'
import Modal from 'react-bootstrap/lib/Modal'

import NewSmsTemplate from './NewSmsTemplate'

class SmsTemplateManage extends Component {
  constructor() {
    super()
    this.state = {
      show: true,
      showAdd: false
    }
  }

  close() {
    this.setState({show: false})
  }

  componentDidMount() {
    this.props.fetchSmsTemplateList()
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={() => this.close()} onExited={this.props.onExited} backdrop="static">
        <Modal.Header closeButton={true}>
          <Modal.Title>短信模板管理</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            this.state.showAdd && (
              <NewSmsTemplate
                addSmsTemplate={this.props.addSmsTemplate}
                templateAddSuccessFlag={this.props.templateAddSuccessFlag}
                onExited={() => this.setState({showAdd: false})}/>
            )
          }

          <div className="container-fluid" style={{height: '500px', overflow: 'auto'}}>
            <table className="table table-striped table-bordered">
              <thead>
              <tr>
                <th>模板id</th>
                <th>内容</th>
                <th>审核状态</th>
              </tr>
              </thead>
              <tbody>
              {
                this.props.smsTemplateList.map(template => {
                  return (
                    <tr key={template.value}>
                      <td>{template.value}</td>
                      <td>{template.text}</td>
                      <td>{template.status}</td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="row">
            <div className="col-xs-6">
              <button className="btn btn-primary btn-block" onClick={e => this.setState({showAdd: true})}>
                新增模板
              </button>
            </div>
            <div className="col-xs-6">
              <div className="btn btn-default btn-block" onClick={e => this.close()}>取消</div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

SmsTemplateManage.propTypes = {
  onExited: PropTypes.func,
  smsTemplateList: PropTypes.array,
  fetchSmsTemplateList: PropTypes.func,
  addSmsTemplate: PropTypes.func,
  templateAddSuccessFlag: PropTypes.bool
}

export default SmsTemplateManage
