/**
 * Created by jiangyukun on 2017/3/3.
 */
import React, {Component, PropTypes} from 'react'
import Radio from 'antd/lib/Radio'

import Select1 from '../../../components/core/Select1'
import CheckItem from '../check/CheckItem'
import FiveHepatitisBSituation from '../check/FiveHepatitisBSituation'

const option = [
  {value: 'all', text: '任意'},
  {value: '>', text: '>'},
  {value: '>=', text: '>='},
  {value: '<=', text: '<='},
  {value: '<', text: '<'},
]

class EditBaby extends Component {
  render() {
    return (
      <div className="baby-situation">
        <CheckItem label="是否是早产儿" btnName="添加早产儿条件">
          <Radio.Group>
            <Radio value={1} className="positive">是</Radio>
            <Radio value={2} className="negative">否</Radio>
            <Radio value={3} className="all">任意</Radio>
          </Radio.Group>
        </CheckItem>

        <CheckItem label="宝宝体重" btnName="添加体重条件">
          <div className="baby-weight">
            <Select1 selectItems={option}/>
          </div>
          <input placeholder="输入数值" className="input"/>
          <span className="unit-txt">g</span>
        </CheckItem>

        <FiveHepatitisBSituation/>

        <CheckItem label="HBsAb滴度" btnName="添加HBsAb滴度条件">
          <div className="HBsAb">
            <Select1 selectItems={option}/>
          </div>
          <input placeholder="输入数值" className="input"/>
        </CheckItem>
      </div>
    )
  }
}

export default EditBaby
