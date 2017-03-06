/**
 * Created by jiangyukun on 2017/1/11.
 */
import React, {Component, PropTypes, Children} from 'react'

import SmartList from '../list/SmartList'
import HeadContainer from '../list/HeadContainer'
import BodyContainer from '../list/BodyContainer'
import Head from './Head'
import HeadItem from './HeadItem'
import Row from './Row'
import RowItem from './RowItem'

class Layout extends Component {
  render() {
    let header, row
    Children.forEach(this.props.children, child => {
      if (child.type == Head) {
        header = child
      } else {
        row = child
      }
    })

    if (!header && !row) {
      return null
    }

    return (
      <SmartList fixHead={this.props.fixHead}
                 fixLeft={this.props.fixLeft}
                 loading={this.props.loading}
                 minWidth={this.props.minWidth}
                 width={this.props.width}>

        <HeadContainer>
          {header && header}
        </HeadContainer>
        <BodyContainer>
          {row && row}
        </BodyContainer>
      </SmartList>
    )
  }

  getChildContext() {
    return {
      weight: this.props.weight
    }
  }
}

Layout.childContextTypes = {
  weight: PropTypes.array
}

Layout.propTypes = {
  data: PropTypes.object,
  onRowClick: PropTypes.func
}

Layout.Head = Head
Layout.HeadItem = HeadItem
Layout.Row = Row
Layout.RowItem = RowItem

export default Layout
