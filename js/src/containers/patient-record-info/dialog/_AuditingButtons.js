/**
 * Created by jiangyukun on 2017/3/31.
 */
import React, {PropTypes} from 'react'

class _AuditingButtons extends React.Component {

  render() {
    return (
      <div className="record-info-check-area">
        <div>
          <button className="btn">未录入</button>
        </div>
        <div className="mt-5">
          <button className="btn">已录入</button>
        </div>
        <div className="mt-5">
          <button className="btn">无效</button>
        </div>
      </div>
    )
  }
}

export default _AuditingButtons
