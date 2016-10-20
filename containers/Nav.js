/**
 * Created by jiangyu2016 on 16/10/15.
 */

import React, {Component} from 'react'
import {Link} from 'react-router'

export default class Nav extends Component {
    render() {
        return (
            <nav ui-nav className="navi">
                <ul className="nav">
                    <li className="hidden-folded padder m-t m-b-sm text-muted text-xs">
                        <span>导航</span>
                    </li>

                    <li ui-sref-active="active">
                        <Link className="auto" to="/app/patient-auditing">
                            <i className="fa fa-wheelchair icon text-primary-dker"></i>
                            <span className="font-bold">病人审核</span>
                        </Link>
                    </li>

                    <li ui-sref-active="active">
                        <Link className="auto" to="/app/patient-edit">
                            <i className="fa fa-wheelchair-alt icon text-primary-dker"></i>
                            <span className="font-bold">病人修改</span>
                        </Link>
                    </li>

                    <li ui-sref-active="active">
                        <Link className="auto" to="/app/laboratory-sheet">
                            <i className="glyphicon glyphicon-file icon text-primary-dker"></i>
                            <span className="font-bold">化验单查看</span>
                        </Link>
                    </li>

                    <li ui-sref-active="active">
                        <Link className="auto" to="/app/doctor-auditing">
                            <i className="fa fa-fire icon text-info-dker"></i>
                            <span className="font-bold">医生审核</span>
                        </Link>
                    </li>

                    <li ui-sref-active="active">
                        <Link className="auto" to="/app/slider-config">
                            <i className="fa fa-columns icon text-info-lter"></i>
                            <span className="font-bold">轮播图维护</span>
                        </Link>
                    </li>

                    <li ui-sref-active="active">
                        <Link className="auto" to="/app/knowledge-base">
                            <i className="fa fa-file-text icon text-info-lter"></i>
                            <span className="font-bold">知识库维护</span>
                        </Link>
                    </li>

                    <li ui-sref-active="active">
                        <Link href="../chat-system/chat.html" target="_blank">
                            <i className="glyphicon glyphicon-comment icon text-success"></i>
                            <span className="font-bold">聊天系统</span>
                        </Link>
                    </li>

                    <li ui-sref-active="active">
                        <Link className="auto" to="/app/score-statistics">
                            <i className="glyphicon glyphicon-list icon text-success"></i>
                            <span className="font-bold">评分统计</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }
}
