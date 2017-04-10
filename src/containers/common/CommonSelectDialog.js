/**
 * Created by jiangyukun on 2017/4/10.
 */
import React, {PropTypes, Component} from 'react'
import Modal from 'react-bootstrap/lib/Modal'

import Select1 from '../../components/core/Select1'

class CommonSelectDialog extends Component {
  constructor(props) {
    super()
    this.initValue = props.value
    this.state = {
      show: true,
      value: props.value
    }
  }

  selectItem = ({value}) => {
    this.setState({value})
  }

  close = () => {
    this.setState({show: false})
  }

  componentWillUpdate() {
    if (this.props.closeSignal) {
      this.close()
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.close} onExited={this.props.onExited} backdrop="static">
        <Modal.Header closeButton={true}>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{marginTop: '50px', marginBottom: '50px'}}>
            <Select1 value={this.state.value} selectItems={this.props.options} onSelect={this.selectItem}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="col-xs-6">
            <input type="button" className="btn btn-success btn-block" value="确定"
                   disabled={!this.state.value || this.state.value == this.initValue}
                   onClick={() => this.props.onConfirm(this.state.value)}/>
          </div>
          <div className="col-xs-6">
            <input type="button"
                   className="btn btn-default btn-block"
                   onClick={this.close} value="取消"/>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

CommonSelectDialog.defaultProps = {
  value: ''
}

CommonSelectDialog.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onConfirm: PropTypes.func,
  closeSignal: PropTypes.bool,
  onExited: PropTypes.func,
}

export default CommonSelectDialog
