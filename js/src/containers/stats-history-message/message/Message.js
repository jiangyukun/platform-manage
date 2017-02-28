/**
 * Created by jiangyukun on 2017/2/24.
 */
import React, {PropTypes} from 'react'

import LoadMoreAndHighLight from '../../../components/txt/LoadMoreAndHighLight'
import AudioUrl from '../../../components/media/AudioUrl'
import {parseTextMessage} from '../../../core/utils/webImUtil'

const Message = ({previewImage, type, data, match}) => {
  if (type == 'txt') {
    let hasEmoji = false
    let handledTxtMessage = parseTextMessage(data).reduce((result, item) => {
      if (item.type == 'txt') {
        return result + item.data
      } else if (item.type == 'emotion') {
        hasEmoji = true
        return result + `<img class="emotion" src="${item.data}"/>`
      } else {
        return result + `<span data-key="unknown-type">${item.data}</span>`
      }
    }, '')
    if (hasEmoji) {
      return (
        <span dangerouslySetInnerHTML={{__html: handledTxtMessage}}></span>
      )
    }
    return (
      <LoadMoreAndHighLight match={match}>{data}</LoadMoreAndHighLight>
    )
  } else if (type == 'img') {
    return (
      <a onClick={() => previewImage(data)}>
        <img src={data} style={{maxHeight: '75px'}}/>
      </a>
    )
  } else if (type == 'audio') {
    return <AudioUrl url={data}/>
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
