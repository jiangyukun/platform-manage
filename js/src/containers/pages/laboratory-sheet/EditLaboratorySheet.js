/**
 * Created by jiangyukun on 2016/12/15.
 */
import React, {Component, PropTypes} from 'react'

import CommonDialog from '../../../components/core/CommonDialog'

class EditLaboratorySheet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 1,
            show: true
        }
    }

    beforePicture() {

    }

    nextPicture() {

    }

    scale() {

    }

    rotate() {

    }

    markRecorded() {

    }

    markUnPass() {

    }

    markInvalid() {

    }

    render() {
        return (
            <CommonDialog show={this.state.show} onClose={this.props.onClose()}>
                <h4>{this.props.title}，第{this.state.index + 1}张，上传时间：{this.props.dateTime}</h4>

                <section className="picture-preview-container flex">
                    <div className="before-picture-btn" onClick={e => this.beforePicture()}>
                        <i className="fa fa-chevron-left"></i>
                    </div>
                    <div className="list-picture-container">
                        <div className="center-position-table">
                            <div className="center-position">
                                <img ng-src="{{previewCtrl.pictureUrl}}" style={this.state.pictureStyle}/>
                            </div>
                        </div>
                    </div>
                    <div className="next-picture-btn" onClick={e => this.nextPicture()}>
                        <i className="fa fa-chevron-right"></i>
                    </div>
                </section>

                <div className="ngdialog-buttons">
                    <input ng-if="previewCtrl.type != 6" type="button" className="ngdialog-button ngdialog-button-primary" onClick={e => this.markRecorded()} value="标为已录入"/>
                    <input ng-if="previewCtrl.type != 6" type="button" className="ngdialog-button ngdialog-button-secondary" onClick={e => this.markUnPass()} value="标为未录入"/>
                    <input ng-if="previewCtrl.type != 6" type="button" className="ngdialog-button ngdialog-button-secondary" onClick={e => this.markInvalid()} value="标为无效"/>

                    <input type="button" className="btn toolbar-btn" onClick={e => this.scale(1)} value="放大"/>
                    <input type="button" className="btn toolbar-btn" onClick={e => this.scale(-1)} value="缩小"/>
                    <input type="button" className="btn toolbar-btn" onClick={e => this.rotate()} value="旋转"/>
                </div>

            </CommonDialog>
        )
    }
}

EditLaboratorySheet.propTypes = {
    list: PropTypes.array,
    title: PropTypes.string
}

export default EditLaboratorySheet
