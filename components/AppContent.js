/**
 * Created by jiangyu2016 on 16/10/15.
 */

import React, {Component} from 'react'

import DoctorAuditing from './pages/doctor-auditing/DoctorAuditing'

export default class AppContent extends Component {

    render() {
        return (
            <div className="app-content">
                <div ui-butterbar></div>
                <a href className="off-screen-toggle hide" ui-toggle-class="off-screen" data-target=".app-aside"></a>
                <div className="app-content-body fade-in-up">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
