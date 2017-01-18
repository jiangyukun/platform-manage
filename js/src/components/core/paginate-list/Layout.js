/**
 * Created by jiangyukun on 2017/1/11.
 */
import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

import SmartList from '../list/SmartList'
import HeadContainer from '../list/HeadContainer'
import BodyContainer from '../list/BodyContainer'

class Layout extends Component {
    constructor() {
        super()
        this.state = {
            currentIndex: -1
        }
    }

    onRowClick(index) {
        this.setState({currentIndex: index})
        if (this.props.onRowClick) {
            this.props.onRowClick(index)
        }
    }

    render() {
        const {weight, head, list} = this.props.data
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
                                    <HeadItem key={index} weight={weight[index] || 1}>{text}</HeadItem>
                                )
                            })
                        }
                    </Head>
                </HeadContainer>
                <BodyContainer>
                    {
                        list.map((row, index) => {
                            return (
                                <Row key={index}
                                     selected={this.state.currentIndex == index}
                                     onClick={() => this.onRowClick(index)}
                                >
                                    {
                                        row.map((rowItem, index2) => {
                                            return (
                                                <RowItem key={index2} weight={weight[index2] || 1}>{rowItem}</RowItem>
                                            )
                                        })
                                    }
                                </Row>
                            )
                        })
                    }
                </BodyContainer>
            </SmartList>
        )
    }
}

Layout.propTypes = {
    data: PropTypes.object,
    onRowClick: PropTypes.func
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

class Row extends Component {
    render() {
        const {selected, ...props} = this.props
        return (
            <ul className={classnames('flex-list body', {'selected': selected})} {...props}>
                {this.props.children}
            </ul>
        )
    }
}

class RowItem extends Component {
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

export default Layout
