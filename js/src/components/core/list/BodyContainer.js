/**
 * Created by jiangyukun on 2016/12/5.
 */
import React, {Component, PropTypes} from 'react'

class BodyContainer extends Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default BodyContainer
