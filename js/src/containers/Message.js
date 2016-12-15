/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component} from 'react'
import CssTransitionGroup from 'react-addons-css-transition-group'
import {connect} from 'react-redux'
import classnames from 'classnames'
import Modal from 'antd/lib/modal'
import notification from 'antd/lib/notification'

import ImagePreview from '../components/core/ImagePreview'
import constants from '../core/constants'
import {fetchMessageInfo, markMessageState} from '../actions/message'
import {closeMessagePanel} from '../actions/header'

class Message extends Component {
    constructor(props) {
        super(props)

        this.loadedMessageCount = 0
        this.start = 0
        this.state = {showPhoto: false, photoUrl: null, visible: false}
        this.fetch()
    }

    fetch() {
        this.props.fetchMessageInfo({start: this.start, length: 10})
    }

    close() {
        this.props.closeMessagePanel()
    }

    markUnRead(msg) {
        const {markMessageState} = this.props
        Modal.confirm({
            title: '提示',
            content: '确定标为未读吗？',
            onOk: () => {
                markMessageState(msg['id'], constants.messageState.unread).then(() => {
                    notification.success({message: '提示', description: '标为未读成功！'})
                }, () => {
                    notification.error({message: '提示', description: '标为未读失败！'})
                })
            }
        })
    }

    markHasRead(msg) {
        const {markMessageState} = this.props
        Modal.confirm({
            title: '提示',
            content: '确定标为已读吗？',
            onOk() {
                markMessageState(msg['id'], constants.messageState.read).then(() => {
                    notification.success({message: '提示', description: '标为已读成功！'})
                }, () => {
                    notification.error({message: '提示', description: '标为已读失败！'})
                })
            }
        })
    }

    loadMoreMessage() {
        this.start += 1
        this.fetch()
    }

    render() {
        let show = !this.props.app.settings.asideMessage
        return (
            <CssTransitionGroup transitionName="slide-left" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
                {
                    this.state.showPhoto && (
                        <ImagePreview url={this.state.photoUrl} onClose={() => this.setState({showPhoto: false})}/>
                    )
                }
                {
                    show && (
                        <div className="b-l hidden-xs app-message">
                            <aside className="message-container">
                                <div className="close-arrow" onClick={e => this.close()}></div>
                                <div className="message-wrap">
                                    <ul className="app-message-list">
                                        {
                                            this.props.message.messageList.map(msg => {
                                                return (
                                                    <li key={msg.id} className={classnames('message-item', {'unread': msg.messageState == constants.messageState.unread})}>
                                                        <div>
                                                            新化验单
                                                            {
                                                                msg.readState == '2' && (
                                                                    <div className={classnames('message-state pull-right', {'unread': msg.messageState == constants.messageState.unread})}>
                                                                        {msg.readState}
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                        <div>患者名称： {msg.name}</div>
                                                        <div>手机号： {msg.mobile}</div>
                                                        <div>上传人： {msg.uploader}</div>
                                                        <div>上传时间： {msg.uploadDate}</div>
                                                        <div className="message-look-btn">
                                                            <button className="msg-btn full" onClick={e => this.setState({showPhoto: true, photoUrl: msg.url})}>查看</button>
                                                        </div>
                                                        <div className="clearfix">
                                                            <button className="msg-btn pull-left" onClick={e => this.markUnRead(msg)}>标为未读</button>
                                                            <button className="msg-btn pull-right" onClick={e => this.markHasRead(msg)}>标为已读</button>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    {
                                        this.loadedMessageCount < this.props.message.count && (
                                            <div><p className="load-more-message" onClick={e => this.loadMoreMessage()}>加载更多</p></div>
                                        )
                                    }
                                </div>
                            </aside>
                        </div>
                    )}
            </CssTransitionGroup>
        )
    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
        message: state.message
    }
}

function mapActionToProps(dispatch, ownProps) {
    return {
        markMessageState: markMessageState(dispatch),
        closeMessagePanel: () => dispatch(closeMessagePanel()),
        fetchMessageInfo: fetchMessageInfo(dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(Message)
