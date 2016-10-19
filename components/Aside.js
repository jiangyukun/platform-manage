/**
 * Created by jiangyu2016 on 16/10/15.
 */

import React, {Component} from 'react'
import Nav from './Nav'

export default class Aside extends Component {
    render() {
        return (
            <div className="app-aside hidden-xs bg-black">
                <div className="aside-wrap">

                    <div className="navi-wrap">

                        <Nav />
                    </div>
                </div>
            </div>
        )
    }
}
