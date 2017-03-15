/**
 * Created by jiangyukun on 2016/12/15.
 */
import React, {Component, PropTypes} from 'react'
import CommonDialog from '../../components/core/CommonDialog'
import Image from '../../components/element/Image'

import {convertTitle} from '../../core/pages/laboratorySheetHelper'
import constants from '../../core/constants'
import * as antdUtil from '../../core/utils/antdUtil'
import * as dateUtils from '../../core/dateUtils'

class EditLaboratorySheet extends Component {
  constructor(props) {
    super(props)
    this.listLength = 0
    this.sheetType = props.sheetType
    this.title = convertTitle(props.sheetType)
    this.state = {
      list: [],
      current: -1,
      previousIndex: null,
      uploadTime: '',

      show: true,
      pictureUrl: null
    }
  }

  beforePicture() {
    if (this.state.current > 0) {
      this.previousIndex = this.state.current
      this.setState({current: this.state.current - 1})
    }
  }

  nextPicture() {
    if (this.state.current < this.listLength - 1) {
      this.setState({
        previousIndex: this.state.current,
        current: this.state.current + 1,
        uploadTime: this.state.list[this.state.current + 1].uploadTime
      })
    }
  }

  markRecorded() {
    this._mark('确定标为已录入吗？', '标为已录入成功！', constants.laboratoryState.RECORDED)
  }

  markUnPass() {
    this._mark('确定标为未录入吗？', '标为未录入成功！', constants.laboratoryState.UN_RECORDED)
  }

  markInvalid() {
    this._mark('确定标为无效吗？', '标为无效成功！', constants.laboratoryState.INVALID)
  }

  _mark(messageStart, messageSuccess, sheetType) {
    antdUtil.confirm(messageStart, () => {
      this.props.markSheetItem(this.state.list[this.state.current].id, sheetType)
        .then(antdUtil.tipSuccess(messageSuccess), err => antdUtil.tipErr(err))
        .then(this.setState({show: false})).then(this.props.sheetStateUpdated())
    })
  }

  componentDidMount() {
    this.props.fetchPictureUrlList(this.props.mobile, this.props.sheetType).then(sheetList => {
      if (!sheetList) return
      const list = sheetList.map(sheet => {
        return {
          id: sheet['id'],
          url: sheet['url'],
          uploadTime: sheet['assay_upload_time']
        }
      })
      this.listLength = sheetList.length
      if (this.listLength) {
        this.setState({current: 0, previousIndex: 0, list})
        this.setState({pictureUrl: list[0].url, uploadTime: list[0].uploadTime})
      }
    })
  }

  componentDidUpdate() {
    if (this.state.current != this.state.previousIndex) {
      this.setState({previousIndex: this.state.current})
    }
  }

  render() {
    return (
      <CommonDialog show={this.state.show}
                    onHide={() => this.setState({show: false})}
                    onExited={() => this.props.onExited()}
                    className="ngdialog ngdialog-theme-full-container" width="75%">
        {this.state.current == -1 && <h4>暂无化验单</h4>}
        {this.state.current != -1 && <h4>{this.title}，第{this.state.current + 1}张，上传时间：{dateUtils.formatDateStr(this.state.uploadTime)}</h4>}

        <section className="picture-preview-container flex">
          <div className="before-picture-btn" onClick={e => this.beforePicture()}>
            <i className="fa fa-chevron-left"></i>
          </div>
          <div className="list-picture-container">
            <div className="center-position-table">
              <div className="center-position">
                {
                  this.state.previousIndex === this.state.current && (
                    <Image ref={c => this._image = c}
                           src={this.state.list[this.state.current].url}/>
                  )
                }
              </div>
            </div>
          </div>
          <div className="next-picture-btn" onClick={e => this.nextPicture()}>
            <i className="fa fa-chevron-right"></i>
          </div>
        </section>

        <div className="ngdialog-buttons">
          {
            this.props.isCanEdit && this.state.current != -1 && this.sheetType != 6 && (
              <input type="button" className="ngdialog-button ngdialog-button-primary" onClick={e => this.markRecorded()} value="标为已录入"/>
            )
          }
          {
            this.props.isCanEdit && this.state.current != -1 && this.sheetType != 6 && (
              <input type="button" className="ngdialog-button ngdialog-button-secondary" onClick={e => this.markUnPass()} value="标为未录入"/>
            )
          }
          {
            this.props.isCanEdit && this.state.current != -1 && this.sheetType != 6 && (
              <input type="button" className="ngdialog-button ngdialog-button-secondary" onClick={e => this.markInvalid()} value="标为无效"/>
            )
          }

          {this.state.current != -1 && <input type="button" className="btn toolbar-btn" onClick={e => this._image.zoomIn()} value="放大"/>}
          {this.state.current != -1 && <input type="button" className="btn toolbar-btn" onClick={e => this._image.zoomOut()} value="缩小"/>}
          {this.state.current != -1 && <input type="button" className="btn toolbar-btn" onClick={e => this._image.rotate()} value="旋转"/>}
        </div>
      </CommonDialog>
    )
  }
}

EditLaboratorySheet.propTypes = {
  mobile: PropTypes.string,
  sheetType: PropTypes.number,
  fetchPictureUrlList: PropTypes.func,
  markSheetItem: PropTypes.func,
  sheetStateUpdated: PropTypes.func,
  isCanEdit: PropTypes.bool,
  onExited: PropTypes.func
}

export default EditLaboratorySheet
