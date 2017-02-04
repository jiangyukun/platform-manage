/**
 * Created by jiangyukun on 2016/12/5.
 */
import React, {Component, PropTypes, Children} from 'react'

class BodyContainer extends Component {

    render() {
        if (!this.props.children) {
            return null
        }
        if (Children.count(this.props.children) != 1) {
            return (
                <div>
                    {this.props.children}
                </div>
            )
        }
        return this.props.children
    }
}

export default BodyContainer
