/**
 * Created by jiangyukun on 2016/12/5.
 */
import React, {Component, PropTypes} from 'react'

class FixLeft extends Component {
    constructor() {
        super()
        this.state = {show: false}
    }

    render() {
        return (
            <div className="js-fix-left-container" ref={c => this._fixLeftContainer = c}>
                <div className="fix-left" style={{display: this.state.show == true ? 'block' : 'none', width: this.firstColumnWidth}}>
                    {
                        this.props.leftItems && this.leftItems.map((item, index) => {
                            return <div key={index} className="fix-left-item" style={{height: item.height}}>{item.text}</div>
                        })
                    }
                </div>
            </div>
        )
    }
}

FixLeft.propTypes = {
    leftItems: PropTypes.array
}

export default FixLeft
