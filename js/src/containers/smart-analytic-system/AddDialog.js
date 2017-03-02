/**
 * Created by jiangyukun on 2017/3/2.
 */
import React, {Component, PropTypes} from 'react'
import Modal from 'react-bootstrap/lib/Modal'

class AddDialog extends Component {

  state = {
    show: true
  }

  close = () => {
    this.setState({show: false})
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.close} onExited={this.props.onExited} dropback="static">
        <Modal.Header closeButton={true}>
          <Modal.Title>新增</Modal.Title>
        </Modal.Header>
      </Modal>
    )
  }
}

AddDialog.propTypes = {
  onExited: PropTypes.func
}

export default AddDialog
