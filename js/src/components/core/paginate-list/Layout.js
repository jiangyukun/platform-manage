/**
 * Created by jiangyukun on 2017/1/11.
 */
import React, {Component, PropTypes} from 'react'

import SmartList from '../list/SmartList'
import HeadContainer from '../list/HeadContainer'
import BodyContainer from '../list/BodyContainer'

class Layout extends Component {

    render() {
        return (
            <SmartList fixHead={this.props.fixHead}
                       fixLeft={this.props.fixLeft}
                       loading={this.props.loading}
                       minWidth={this.props.minWidth}
                       width={this.props.width}>

                <HeadContainer>
                    {this.props.head}
                </HeadContainer>
                <BodyContainer>
                    {this.props.body}
                </BodyContainer>

            </SmartList>
        )
    }
}

Layout.propTypes = {
    head: PropTypes.element,
    body: PropTypes.element
}

class Head extends Component {
    render() {
        return (
            <ul className="flex-list header">
                {this.props.children}
            </ul>
        )
    }
}

class HeadItem extends Component {
    render() {
        const style = {}
        if (this.props.width) {
            style.width = this.props.width
        }
        if (this.props.weight) {
            style.flex = this.props.weight
        }

        return (
            <li className="item" style={style}>
                {this.props.children}
            </li>
        )
    }
}

HeadItem.propTypes = {
    width: PropTypes.number,
    weight: PropTypes.number
}

class Body extends Component {
    render() {

    }
}

Head.Item = HeadItem

Layout.Head = Head
Layout.Body = Body

export default Layout
