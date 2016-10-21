/**
 * Created by jiangyukun on 2016/10/21.
 */
import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'

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
            <Modal show={this.state.active} onHide={()=>this.close()}>
                <Modal.Body>

                    <div className="full-screen-preview">
                        <img src={this.props.url}/>
                    </div>

                    {
                        /*<div className="ngdialog-buttons">
                         <input type="button" className="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog()" value="关闭"/>
                         </div>*/
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button>关闭</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
