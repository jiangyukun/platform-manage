/**
 * Created by jiangyukun on 2017/1/19.
 */
import React, {Component, PropTypes, cloneElement, Children} from 'react'
import classnames from 'classnames'

class Row extends Component {
    render() {
        const weight = this.context.weight

        const rowItems = []
        Children.forEach(this.props.children, (child, index) => {
            rowItems.push(cloneElement(child, {key: index, flex: weight[index]}))
        })

        const {selected, ...props} = this.props
        return (
            <ul className={classnames('flex-list body', {'selected': selected})} {...props}>
                {rowItems}
            </ul>
        )
    }
}

Row.contextTypes = {
    weight: PropTypes.array
}

export default Row
