/**
 * Created by jiangyukun on 2016/10/21.
 */
import React, {Component} from 'react'
import {Modal} from 'react-overlays'
import {Transition} from 'react-overlays'
import classnames from 'classnames'

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

export default class Dialog extends Component {
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
                {this.props.children}
            </Modal>
        )
    }
}
