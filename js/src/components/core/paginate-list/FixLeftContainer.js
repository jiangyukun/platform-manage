/**
 * Created by jiangyu2016 on 2016/12/5.
 */
import React, {Component, PropTypes} from 'react'

class FixLeftContainer extends Component {
    componentDidUpdate() {
        this._fixLeftContainer.scrollTop = this.props.scrollTop
    }

    render() {
        return (
            <div className="js-fix-left-container" ref={c => this._fixLeftContainer = c}>
                {this.props.children}
            </div>
        )
    }
}

FixLeftContainer.propTypes = {
    scrollTop: PropTypes.number
}

export default FixLeftContainer
