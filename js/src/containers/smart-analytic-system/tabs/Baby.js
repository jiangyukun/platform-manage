/**
 * Created by jiangyukun on 2017/3/3.
 */
import React, {Component, PropTypes} from 'react'

import Select1 from '../../../components/core/Select1'
import CheckItem from '../check/CheckItem'
import FiveHepatitisBSituation from '../check/FiveHepatitisBSituation'

class Baby extends Component {

  render() {
    return (
      <div className="baby-situation">
        <CheckItem label="是否是早产儿" btnName="添加早产儿条件">

        </CheckItem>

        <CheckItem label="宝宝体重" btnName="添加体重条件">

        </CheckItem>

        <FiveHepatitisBSituation/>

        <CheckItem label="HBsAb滴度" btnName="添加HBsAb滴度条件">

        </CheckItem>
      </div>
    )
  }
}

export default Baby
