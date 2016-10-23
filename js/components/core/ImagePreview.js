/**
 * Created by jiangyukun on 2016/10/21.
 */
import React, {Component} from 'react'
import {Modal} from 'react-overlays'

import Dialog from './Dialog'

export default class ImagePreview extends Component {
    close() {
        this.dialog.close()
    }

    open() {
        this.dialog.open()
    }

    render() {
        return (
            <Dialog ref={c=>this.dialog = c}>
                <div className="ngdialog-content" style={{width: '80%'}}>
                    <div className="full-screen-preview">
                        <img src={this.props.url}/>
                    </div>
                    <div className="ngdialog-buttons">
                        <input type="button" className="ngdialog-button ngdialog-button-secondary" onClick={e=>this.close()} value="关闭"/>
                    </div>
                    {/*<div className="ngdialog-close" onClick={e=>this.close()}></div>*/}
                </div>
            </Dialog>
        )
    }
}
