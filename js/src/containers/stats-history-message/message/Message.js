/**
 * Created by jiangyukun on 2017/2/24.
 */
import React, {PropTypes} from 'react'
import HighLight from '../../../components/txt/HighLight'

const Message = ({previewImage, type, data, match}) => {
  if (type == 'txt') {
    return (
      <HighLight match={match}>{data}</HighLight>
    )
  }
  else if (type == 'img') {
    return (
      <a onClick={() => previewImage(data)}>
        <img src={data} style={{maxHeight: '75px'}}/>
      </a>
    )
  }
  return (
    <span>{`消息类型【${type}】`}</span>
  )
}

Message.propTypes = {
  type: PropTypes.string,
  data: PropTypes.string,
  match: PropTypes.string,
  previewImage: PropTypes.func
}

export default Message
