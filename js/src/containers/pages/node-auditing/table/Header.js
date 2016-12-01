/**
 * Created by jiangyukun on 2016/12/1.
 */
import React, {Component, PropTypes} from 'react'

class Header extends Component {
    render() {
        return (
            <thead>
            <tr>
                <th className="th-left w-120">患者编号</th>
                <th className="th-left w-120">患者姓名</th>
                <th className="th-left w-120">手机号码</th>
                <th className="th-left w-150">医院</th>
                <th className="th-left w-120">主治医生
                    {
                        !this.props.open1 && (
                            <i className="fa fa-arrow-right" title="展开其他医生" onClick={e => this.props.updateOpenFlag({open1: true})}></i>
                        )
                    }
                    {
                        this.props.open1 && (
                            <i className="fa fa-arrow-left" title="收起其他医生" onClick={e => this.props.updateOpenFlag({open1: false})}></i>
                        )
                    }
                </th>
                { this.props.open1 && <th className="th-left w-120">感染科医生</th>}
                { this.props.open1 && <th className="th-left w-120">妇产科医生</th>}
                { this.props.open1 && <th className="th-left w-120">儿科医生</th> }
                <th className="th-left w-120">是否乙肝</th>
                <th className="th-left w-120">是否孕妇</th>
                <th className="th-left w-120">注册时间</th>
                <th className="th-left w-120">审核状态</th>

                <th className="th-left w-120">
                    孕周/月龄
                    {
                        !this.props.open2 && (
                            <i className="fa fa-arrow-right" title="展开其他"
                               onClick={e => this.props.updateOpenFlag({open2: true})}></i>
                        )
                    }
                    {
                        this.props.open2 && (
                            <i className="fa fa-arrow-left" title="收起其他"
                               onClick={e => this.props.updateOpenFlag({open2: false})}></i>
                        )
                    }

                </th>
                {this.props.open2 && <th className="th-left w-120">抗病毒情况</th>}
                {this.props.open2 && <th className="th-left w-120">阻断结果</th>}
                {this.props.open2 && <th className="th-left w-120">APP版本</th>}
                {this.props.open2 && <th className="th-left w-120">手机型号</th>}

                <th className="th-left w-120">随访卡</th>

                <th className="th-left w-140">是否完成随访</th>
                <th className="th-left w-140">联系情况备注</th>

                <th className="th-left w-175">检查项目</th>
                <th className="th-left w-120">妊娠12~24周</th>
                <th className="th-left w-120">孕14周日期</th>
                <th className="th-left w-140">是否完成随访</th>
                <th className="th-left w-140">联系情况备注</th>

                <th className="th-left w-120">妊娠24~32周</th>
                <th className="th-left w-140">是否接受随访</th>
                <th className="th-left w-120">孕26周日期</th>
                <th className="th-left w-140">是否完成随访</th>
                <th className="th-left w-140">联系情况备注</th>
                <th className="th-left w-120">孕33周日期</th>
                <th className="th-left w-140">是否完成随访</th>
                <th className="th-left w-140">联系情况备注</th>

                <th className="th-left w-120">分娩</th>
                <th className="th-left w-120">孕41周日期</th>
                <th className="th-left w-140">是否完成随访</th>
                <th className="th-left w-140">联系情况备注</th>

                <th className="th-left w-120">产后4~8周</th>
                <th className="th-left w-140">产后6周日期</th>
                <th className="th-left w-120">孕46周日期</th>
                <th className="th-left w-140">是否完成随访</th>
                <th className="th-left w-140">联系情况备注</th>
                <th className="th-left w-140">产后10周日期</th>
                <th className="th-left w-120">孕50周日期</th>
                <th className="th-left w-140">是否完成随访</th>
                <th className="th-left w-140">联系情况备注</th>

                <th className="th-left w-120">产后7~12月</th>
                <th className="th-left w-140">是否接受随访</th>
                <th className="th-left w-140">产后8月日期</th>
                <th className="th-left w-120">孕72周日期</th>
                <th className="th-left w-140">是否完成随访</th>
                <th className="th-left w-140">联系情况备注</th>
                <th className="th-left w-140">产后9月日期</th>
                <th className="th-left w-120">孕76周日期</th>
                <th className="th-left w-140">是否完成随访</th>
                <th className="th-left w-140">联系情况备注</th>

                <th className="th-left w-140">产后10月日期</th>
                <th className="th-left w-120">孕80周日期</th>
                <th className="th-left w-140">是否完成随访</th>
                <th className="th-left w-140">联系情况备注</th>
            </tr>
            </thead>
        )
    }
}

Header.propTypes = {
    open1: PropTypes.bool,
    open2: PropTypes.bool,
    updateOpenFlag: PropTypes.func
}

export default Header
