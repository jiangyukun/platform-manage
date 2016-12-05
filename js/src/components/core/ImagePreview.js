/**
 * Created by jiangyukun on 2016/10/21.
 */
import React, {Component} from 'react'
import {merge} from 'lodash'

import Dialog from './Dialog'

export default class ImagePreview extends Component {
    constructor(props) {
        super()
        this.state = {url: props.url, style: {}, showReset: false}
    }

    close() {
        this.setState({url: null})
        this.dialog.close()
    }

    open(url) {
        this.setState({url})
        this.dialog.open()
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

    componentDidUpdate() {
        if (this._img) {
            this._img.onload = () => {
                this.setState({width: this._img.naturalWidth, angle: 0, showReset: false})
            }
        }
    }

    render() {
        return (
            <Dialog ref={c => this.dialog = c}>
                <div className="ngdialog-content" style={{width: '80%'}}>
                    <div className="full-screen-preview">
                        <img ref={ c => this._img = c} src={this.state.url} style={{
                            width: this.state.width,
                            transform: 'rotate(' + this.state.angle + 'deg)'
                        }}/>
                    </div>
                    <div className="ngdialog-buttons">
                        <input type="button" className="btn toolbar-btn" onClick={e => this.zoomIn(e)} value="放大"/>
                        <input type="button" className="btn toolbar-btn" onClick={e => this.zoomOut(e)} value="缩小"/>
                        <input type="button" className="btn toolbar-btn" onClick={e => this.rotate(e)} value="旋转"/>
                        {this.state.showReset && <input type="button" className="btn toolbar-btn reset" onClick={e => this.reset(e)} value="还原"/>}
                        <input type="button" className="ngdialog-button ngdialog-button-secondary" onClick={e => this.close()} value="关闭"/>
                    </div>
                </div>
            </Dialog>
        )
    }
}
