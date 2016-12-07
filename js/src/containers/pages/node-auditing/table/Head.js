/**
 * Created by jiangyukun on 2016/12/1.
 */
import React, {Component, PropTypes} from 'react'
import {contextMenu} from '../../../../components/contextMenu'

class Head extends Component {
    handleContextMenu(e) {
        e.preventDefault()
        let target = e.target

        // let info = target.getBoundingClientRect()
        contextMenu.show(e.clientY, e.clientX)
    }

    render() {
        return (
            <ul className="list-header clearfix" onContextMenu={e => this.handleContextMenu(e)}>
                <li className="list-header-item w-120">患者编号</li>
                <li className="list-header-item w-120">患者姓名</li>
                <li className="list-header-item w-120">手机号码</li>
                <li className="list-header-item w-120">医院</li>

                <li className="list-header-item w-120">主治医生
                    {!this.props.open1 && <i className="fa fa-arrow-right" title="展开其他医生" onClick={e => this.props.updateOpenFlag({open1: true})}></i>}
                    {this.props.open1 && <i className="fa fa-arrow-left" title="收起其他医生" onClick={e => this.props.updateOpenFlag({open1: false})}></i>}
                </li>
                {this.props.open1 && <li className="list-header-item w-120">感染科医生</li>}
                {this.props.open1 && <li className="list-header-item w-120">妇产科医生</li>}
                {this.props.open1 && <li className="list-header-item w-120">儿科医生</li>}

                <li className="list-header-item w-120">是否乙肝</li>
                <li className="list-header-item w-120">是否孕妇</li>
                <li className="list-header-item w-120">注册时间</li>
                <li className="list-header-item w-120">审核状态</li>

                <li className="list-header-item w-120">
                    孕周/月龄
                    {!this.props.open2 && <i className="fa fa-arrow-right" title="展开其他" onClick={e => this.props.updateOpenFlag({open2: true})}></i>}
                    {this.props.open2 && <i className="fa fa-arrow-left" title="收起其他" onClick={e => this.props.updateOpenFlag({open2: false})}></i>}
                </li>
                {this.props.open2 && <li className="list-header-item w-120">抗病毒情况</li>}
                {this.props.open2 && <li className="list-header-item w-120">阻断结果</li>}
                {this.props.open2 && <li className="list-header-item w-120">APP版本</li>}
                {this.props.open2 && <li className="list-header-item w-120">手机型号</li>}

                <li className="list-header-item w-120">随访卡</li>
                <li className="list-header-item w-140">是否完成随访</li>
                <li className="list-header-item w-120">联系情况备注</li>

                <li className="list-header-item w-175">检查项目</li>

                {/*访视1*/}
                <li className="list-header-item w-120">妊娠12~24周</li>
                <li className="list-header-item w-120">孕14周日期</li>
                <li className="list-header-item w-140">是否完成随访</li>
                <li className="list-header-item w-120">联系情况备注</li>

                {/*访视2*/}
                <li className="list-header-item w-120">妊娠24~32周</li>
                <li className="list-header-item w-140">是否接受随访</li>
                <li className="list-header-item w-120">孕26周日期</li>
                <li className="list-header-item w-140">是否完成随访</li>
                <li className="list-header-item w-120">联系情况备注</li>
                <li className="list-header-item w-120">孕33周日期</li>
                <li className="list-header-item w-140">是否完成随访</li>
                <li className="list-header-item w-120">联系情况备注</li>

                {/*访视3*/}
                <li className="list-header-item w-120">分娩</li>
                <li className="list-header-item w-120">孕41周日期</li>
                <li className="list-header-item w-140">是否完成随访</li>
                <li className="list-header-item w-120">联系情况备注</li>

                {/*访视4*/}
                <li className="list-header-item w-120">产后4~8周</li>
                <li className="list-header-item w-140">产后6周日期</li>
                <li className="list-header-item w-120">孕46周日期</li>
                <li className="list-header-item w-140">是否完成随访</li>
                <li className="list-header-item w-120">联系情况备注</li>
                <li className="list-header-item w-140">产后10周日期</li>
                <li className="list-header-item w-120">孕50周日期</li>
                <li className="list-header-item w-140">是否完成随访</li>
                <li className="list-header-item w-120">联系情况备注</li>

                {/*访视5*/}
                <li className="list-header-item w-120">产后7~12月</li>
                <li className="list-header-item w-140">是否接受随访</li>
                <li className="list-header-item w-140">产后8月日期</li>
                <li className="list-header-item w-120">孕72周日期</li>
                <li className="list-header-item w-140">是否完成随访</li>
                <li className="list-header-item w-120">联系情况备注</li>
                <li className="list-header-item w-140">产后9月日期</li>
                <li className="list-header-item w-120">孕76周日期</li>
                <li className="list-header-item w-140">是否完成随访</li>
                <li className="list-header-item w-120">联系情况备注</li>

                <li className="list-header-item w-140">产后10月日期</li>
                <li className="list-header-item w-120">孕80周日期</li>
                <li className="list-header-item w-140">是否完成随访</li>
                <li className="list-header-item w-120">联系情况备注</li>
            </ul>
        )
    }
}

Head.propTypes = {
    open1: PropTypes.bool,
    open2: PropTypes.bool,
    updateOpenFlag: PropTypes.func
}

export default Head
