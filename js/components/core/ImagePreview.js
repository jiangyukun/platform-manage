/**
 * Created by jiangyukun on 2016/10/21.
 */
import React, {Component} from 'react'
import classnames from 'classnames'
import {Modal, Transition} from 'react-overlays'

class Fly extends Component {
    render() {
        return (
            <Transition
                {...this.props}
                className={classnames(this.props.className, 'fly')}
                enteredClassName="in"
                enteringClassName="in"/>
        )
    }
}

export default class ImagePreview extends Component {
    constructor() {
        super()
        this.state = {active: false}
    }

    open() {
        this.setState({active: true})
    }

    close() {
        this.setState({active: false})
    }

    render() {
        return (
            <Modal show={this.state.active}
                   className={classnames('ngdialog ngdialog-theme-full-container', {'ngdialog-closing': !this.state.active})}
                   backdrop="static"
                   backdropClassName="ngdialog-overlay"
                   transition={Fly}
                   dialogTransitionTimeout={450}
                   onHide={e=>this.close()}>
                <div className="ngdialog-content" style={{width: '80%'}}>
                    <div className="full-screen-preview">
                        <img src={this.props.url}/>
                    </div>
                    <div className="ngdialog-buttons">
                        <input type="button" className="ngdialog-button ngdialog-button-secondary" onClick={e=>this.close()} value="关闭"/>
                    </div>
                    <div className="ngdialog-close" onClick={e=>this.close()}></div>
                </div>
            </Modal>
        )
    }
}
