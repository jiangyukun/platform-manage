/**
 * Created by jiangyukun on 2017/3/6.
 */
import React, {Component, PropTypes, Children, cloneElement} from 'react'

class HeadCategory extends Component {

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
      <div className="head-category-item" style={style}>
        <header className="head-category-title">{this.props.categoryName}</header>
        <div className="sub-category-items">{subCategoryItems}</div>
      </div>
    )
  }
}

HeadCategory.defaultProps = {
  weight: []
}

HeadCategory.propTypes = {
  categoryName: PropTypes.string,
  weight: PropTypes.array
}

export default HeadCategory
