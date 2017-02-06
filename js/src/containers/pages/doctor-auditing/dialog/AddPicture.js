/**
 * Created by jiangyukun on 2016/12/23.
 */
import React, {Component, PropTypes} from 'react'
import Icon from 'antd/lib/icon'

import FileUpload from '../../../../components/core/FileUpload'

class AddPicture extends Component {
  constructor(props) {
    super(props)
    this.onFileUploadSuccess = this.onFileUploadSuccess.bind(this)
    this.state = {url: ''}
  }

  onFileUploadSuccess(url) {
    this.setState({url})
    this.props.onPictureUpdated(url)
  }

  render() {
    return (
      <FileUpload className="add-doctor-avatar-uploader" onFileUploadSuccess={this.onFileUploadSuccess}>
        <Icon type="plus" className="avatar-uploader-trigger"/>
        <div className="avatar-uploader-tip">
          {this.props.tip}
        </div>
        {
          this.state.url && (
            <div className="avatar-uploader-preview">
              <img src={this.state.url}/>
            </div>
          )
        }
      </FileUpload>
    )
  }
}

AddPicture.propTypes = {
  tip: PropTypes.string,
  onPictureUpdated: PropTypes.func
}

export default AddPicture
