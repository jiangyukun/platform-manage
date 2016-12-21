/**
 * Created by jiangyukun on 2016/12/15.
 */
import React, {Component, PropTypes} from 'react'
import BodyAdmin from './body/BodyAdmin'
import BodyCrc from './body/BodyCrc'

class Body extends Component {
    render() {
        if (this.context.role == 'admin') {
            return <BodyAdmin {...this.props}/>
        }
        if (this.context.role == 'crc') {
            return <BodyCrc {...this.props}/>
        }
        throw new Error('illegal role type')
    }
}

Body.contextTypes = {
    role: PropTypes.string
}

export default Body
