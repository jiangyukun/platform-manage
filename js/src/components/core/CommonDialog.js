/**
 * Created by jiangyukun on 2016/10/21.
 */
import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-overlays'
import {Transition} from 'react-overlays'
import classnames from 'classnames'

export default class CommonDialog extends Component {
    /*componentDidUpdate() {
     if (!this.props.show) {
     setTimeout(() => this.props.onClose(), 450)
     }
     }*/

    render() {
        return (
            <Modal show={this.props.show}
                   className={classnames('ngdialog ngdialog-theme-full-container', {'ngdialog-closing': !this.props.show})}
                   backdrop="static"
                   backdropClassName="ngdialog-overlay"
                   transition={Fly}
                   dialogTransitionTimeout={450}
                   onHide={() => this.props.onHide()}
                   onExited={e => this.props.onExited()}>
                {this.props.children}
            </Modal>
        )
    }
}

CommonDialog.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onExited: PropTypes.func
}

//-----------------------------------

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
