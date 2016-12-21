/**
 * Created by jiangyukun on 2016/10/21.
 */
import React, {Component, PropTypes} from 'react'
import {merge} from 'lodash'
import CommonDialog from './CommonDialog'

export default class ImagePreview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true,
            width: 0,
            angle: 0,
            showReset: false
        }
    }

    zoomIn() {
        this.setState({width: this.state.width * 1.2, showReset: true})
    }

    zoomOut() {
        this.setState({width: this.state.width * 0.8, showReset: true})
    }

    rotate() {
        this.setState({angle: this.state.angle + 90, showReset: true})
    }

    reset() {
        this.setState({width: this._img.naturalWidth, angle: 0, showReset: false})
    }

    componentDidMount() {
        if (this._img) {
            this._img.onload = () => {
                this.setState({width: this._img.naturalWidth, angle: 0, showReset: false})
            }
        }
    }

    render() {
        return (
            <CommonDialog show={this.state.show} onHide={() => this.setState({show: false})} onExited={() => this.props.onExited()} width="80%">
                <div className="full-screen-preview">
                    {
                        !this.props.url && (
                            <div>暂无图片</div>
                        )
                    }
                    {
                        this.props.url && (
                            <img ref={ c => this._img = c} src={this.props.url} style={{
                                width: this.state.width,
                                transform: 'rotate(' + this.state.angle + 'deg)'
                            }}/>
                        )
                    }
                </div>
                <div className="ngdialog-buttons">
                    {this.props.url && <input type="button" className="btn toolbar-btn" onClick={e => this.zoomIn(e)} value="放大"/>}
                    {this.props.url && <input type="button" className="btn toolbar-btn" onClick={e => this.zoomOut(e)} value="缩小"/>}
                    {this.props.url && <input type="button" className="btn toolbar-btn" onClick={e => this.rotate(e)} value="旋转"/>}
                    {this.state.showReset && <input type="button" className="btn toolbar-btn reset" onClick={e => this.reset(e)} value="还原"/>}
                    <input type="button" className="ngdialog-button ngdialog-button-secondary" onClick={e => this.setState({show: false})} value="关闭"/>
                </div>
            </CommonDialog>
        )
    }
}

ImagePreview.propTypes = {
    url: PropTypes.string,
    onExited: PropTypes.func
}
