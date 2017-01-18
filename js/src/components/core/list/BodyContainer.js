/**
 * Created by jiangyukun on 2016/12/5.
 */
import React, {Component, PropTypes} from 'react'

class BodyContainer extends Component {

    render() {
        if (this.props.children.length == 0) {
            return null
        }
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default BodyContainer
