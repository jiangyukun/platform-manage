/**
 * Created by jiangyukun on 2016/12/22.
 */
import React, {Component, PropTypes} from 'react'
import Upload from 'antd/lib/upload'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'

import ImagePreview from './ImagePreview'
import * as antdUtil from '../../core/utils/antdUtil'
import * as utils from '../../core/utils'
import * as uploadUtil from '../../core/utils/uploadUtil'

class EditableImagePreview extends Component {
  constructor(props) {
    super()
    this.state = {
      imageUrl: props.url,
      isEdited: false
    }
  }

  beforeUpload = (file) => {
    const {status, message} = utils.beforeUpload(file)
    if (status != 0) {
      antdUtil.tipErr(message)
    }
    return status == 0
  }

  customRequest = (fileInfo) => {
    uploadUtil.upload(fileInfo.file).then(url => fileInfo.onSuccess(url), err => fileInfo.onError(err))
  }

  handleChange = (info) => {
    if (info.file.status === 'done') {
      const file = info.file.originFileObj
      this.httpUrl = info.file.response
      utils.getBase64(file, imageUrl => this.setState({imageUrl, isEdited: true}))
    }
  }

  cancel = () => {
    this._imagePreview.close()
  }

  confirm = () => {
    this._imagePreview.close()
    this.props.imageUrlUpdated(this.httpUrl)
  }

  render() {
    const ToolButton = ImagePreview.ToolButton

    return (
      <ImagePreview ref={c => this._imagePreview = c}
                    url={this.state.imageUrl}
                    onExited={this.props.onExited}
                    showEmptyText={false}
                    showCloseButton={!this.state.isEdited}
      >
        {
          !this.state.imageUrl && (
            <Upload className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                    customRequest={this.customRequest}
                    onChange={this.handleChange}
            >
              <Icon type="plus" className="avatar-uploader-trigger"/>
            </Upload>
          )
        }
        {
          this.state.imageUrl && (
            <ToolButton>
              <Upload beforeUpload={this.beforeUpload}
                      customRequest={this.customRequest}
                      onChange={this.handleChange}
                      showUploadList={false}
              >
                <Button type="ghost">
                  <Icon type="upload"/> 修改图片
                </Button>
              </Upload>
            </ToolButton>
          )
        }

        {
          this.state.isEdited && (
            <ToolButton>
              <input type="button" className="ngdialog-button ngdialog-button-secondary"
                     onClick={this.cancel}
                     value="取消修改"/>
            </ToolButton>
          )
        }

        {
          this.state.isEdited && (
            <ToolButton>
              <input type="button" className="ngdialog-button ngdialog-button-secondary"
                     onClick={this.confirm}
                     value="确定修改"/>
            </ToolButton>
          )
        }
      </ImagePreview>
    )
  }
}

EditableImagePreview.propTypes = {
  url: PropTypes.string,
  onExited: PropTypes.func,
  imageUrlUpdated: PropTypes.func
}

export default EditableImagePreview
