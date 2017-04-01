/**
 * Created by jiangyukun on 2017/3/6.
 */
import React, {Component, PropTypes, Children, cloneElement} from 'react'

class RowCategory extends Component {

  render() {
    const style = {}
    if (this.props.width) {
      style.width = this.props.width
    }
    if (this.props.flex) {
      style.flex = this.props.flex
    }

    const subCategoryItems = []
    Children.forEach(this.props.children, (child, index) => {
      // subCategoryItems.push(cloneElement(child, {key: index, width: weight[index]}))
      subCategoryItems.push(cloneElement(child, {key: index, flex: this.props.weight[index] || 1}))
    })

    return (
      <div className="row-category-item" style={style}>
        <div className="sub-row-category-items">{subCategoryItems}</div>
      </div>
    )
  }
}

RowCategory.defaultProps = {
  weight: []
}

RowCategory.propTypes = {
  weight: PropTypes.array
}

export default RowCategory
