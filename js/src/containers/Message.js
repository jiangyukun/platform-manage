/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'

import {fetchMessageInfo} from '../actions/message'
import {closeMessagePanel} from '../actions/header'

class Message extends Component {
    constructor(props) {
        super(props)

        this.loadedMessageCount = 0
        this.start = 0
        this.state = {loading: false}
        this.fetch()
    }

    fetch() {
        this.props.fetchMessageInfo({start: this.start, length: 10})
    }

    close() {
        this.props.closeMessagePanel()
    }

    lookMessage() {

    }

    markUnRead() {

    }

    markHasRead() {

    }

    loadMoreMessage() {
        this.start += 1
        this.fetch()
    }

    render() {
        return this.props.app.settings.asideMessage == false && (
                <div className={classnames('app-message', 'hidden-xs', 'b-l')}>
                    <aside className="message-container">
                        <div className="close-arrow" onClick={e=>this.close()}></div>
                        <div className="message-wrap">
                            <ul className="app-message-list">
                                {
                                    this.props.message.messageList.map((msg, index)=> {
                                        return (
                                            <li key={index} className={classnames('message-item', {'unread': msg.readState == '2'})}>
                                                <div>
                                                    新化验单
                                                    {
                                                        msg.readState == '2' && (
                                                            <div className={classnames('message-state', 'pull-right', {'unread': msg.readState == '2'})}>
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
                                                    <button className="msg-btn full" onClick={e=>this.lookMessage(msg)}>查看</button>
                                                </div>
                                                <div className="clearfix">
                                                    <button className="msg-btn pull-left" onClick={e=>this.markUnRead(msg)}>标为未读</button>
                                                    <button className="msg-btn pull-right" onClick={e=>this.markHasRead(msg)}>标为已读</button>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            {
                                this.loadedMessageCount < this.props.message.total && (
                                    <div><p className="load-more-message" onClick={e=>this.loadMoreMessage()}>加载更多</p></div>
                                )
                            }
                        </div>
                    </aside>
                </div>
            )
    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
        message: state.message
    }
}

export default connect(mapStateToProps, {closeMessagePanel, fetchMessageInfo})(Message)
