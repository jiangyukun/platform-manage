/**
 * Created by jiangyu2016 on 2016/12/5.
 */
import React, {Component, PropTypes} from 'react'

class FixLeftContainer extends Component {
    componentDidUpdate() {
        this._fixLeftContainer.scrollTop = this.props.scrollTop
    }

    render() {
        console.log(this.props.leftHeadItems)
        return (
            <div className="fix-left-container" ref={c => this._fixLeftContainer = c}>
                <div className="fix-left-head">
                    {
                        this.props.leftHeadItems.map((leftHeadItem, index) => {
                            return (
                                <div key={index} className="fix-left-head-item">
                                    {leftHeadItem.text}
                                </div>
                            )
                        })
                    }
                </div>
                {this.props.children}
            </div>
        )
    }
}

FixLeftContainer.propTypes = {
    leftHeadItems: PropTypes.array,
    scrollTop: PropTypes.number
}

export default FixLeftContainer
