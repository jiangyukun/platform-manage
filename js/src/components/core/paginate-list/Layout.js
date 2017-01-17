/**
 * Created by jiangyukun on 2017/1/11.
 */
import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

import SmartList from '../list/SmartList'
import HeadContainer from '../list/HeadContainer'
import BodyContainer from '../list/BodyContainer'

class Layout extends Component {

    render() {
        const {weight, head, selected, list} = this.props.data
        return (
            <SmartList fixHead={this.props.fixHead}
                       fixLeft={this.props.fixLeft}
                       loading={this.props.loading}
                       minWidth={this.props.minWidth}
                       width={this.props.width}>

                <HeadContainer>
                    <Head>
                        {
                            head.map((text, index) => {
                                return (
                                    <HeadItem key={index} weight={weight[index]}>{text}</HeadItem>
                                )
                            })
                        }
                    </Head>
                </HeadContainer>
                <BodyContainer>
                    {
                        list.map((row, index) => {
                            return (
                                <Body selected={selected == index}>
                                {
                                    row.map(rowItem => {
                                        return (
                                            <BodyItem>{rowItem}</BodyItem>
                                        )
                                    })
                                }
                                </Body>
                            )
                        })
                    }
                </BodyContainer>
            </SmartList>
        )
    }
}

Layout.propTypes = {
    data: PropTypes.object
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
        return (
            <ul className={classnames('flex-list body', {'selected': this.props.selected})}
                style={{minHeight: '60px'}}
                onClick={e => this.setState({currentIndex: index})}
            >
                {this.props.children}
            </ul>
        )
    }
}

class BodyItem extends Component {
    render() {
        return (
            <li className="item">
                {this.props.children}
            </li>
        )
    }
}

export default Layout
