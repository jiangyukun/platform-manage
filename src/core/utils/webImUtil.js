/**
 * Created by jiangyukun on 2017/2/27.
 */

const emoji = {
  path: 'res/images/faces/',
  map: {
    '[):]': 'ee_1.png',
    '[:D]': 'ee_2.png',
    '[)]': 'ee_3.png',
    '[:-o]': 'ee_4.png',
    '[:p]': 'ee_5.png',
    '[(H)]': 'ee_6.png',
    '[:@]': 'ee_7.png',
    '[:s]': 'ee_8.png',
    '[:$]': 'ee_9.png',
    '[:(]': 'ee_10.png',
    '[:\'(]': 'ee_11.png',
    '[:|]': 'ee_12.png',
    '[(a)]': 'ee_13.png',
    '[8o|]': 'ee_14.png',
    '[8-|]': 'ee_15.png',
    '[+o(]': 'ee_16.png',
    '[<o)]': 'ee_17.png',
    '[|-)]': 'ee_18.png',
    '[*-)]': 'ee_19.png',
    '[:-#]': 'ee_20.png',
    '[:-*]': 'ee_21.png',
    '[^o)]': 'ee_22.png',
    '[8-)]': 'ee_23.png',
    '[(|)]': 'ee_24.png',
    '[(u)]': 'ee_25.png',
    '[(S)]': 'ee_26.png',
    '[(*)]': 'ee_27.png',
    '[(#)]': 'ee_28.png',
    '[(R)]': 'ee_29.png',
    '[({)]': 'ee_30.png',
    '[(})]': 'ee_31.png',
    '[(k)]': 'ee_32.png',
    '[(F)]': 'ee_33.png',
    '[(W)]': 'ee_34.png',
    '[(D)]': 'ee_35.png'
  },
  title: {
    '[):]': '微笑',
    '[:D]': '开心',
    '[)]': '',
    '[:-o]': '',
    '[:p]': '吃',
    '[(H)]': '酷',
    '[:@]': '发火',
    '[:s]': '无奈',
    '[:$]': '委屈',
    '[:(]': '难过',
    '[:\'(]': '大哭',
    '[:|]': '尴尬',
    '[(a)]': '大笑',
    '[8o|]': '坏笑',
    '[8-|]': '',
    '[+o(]': '吐',
    '[<o)]': '睡觉',
    '[|-)]': '发呆',
    '[*-)]': '傲慢',
    '[:-#]': '闭嘴',
    '[:-*]': '偷笑',
    '[^o)]': '',
    '[8-)]': '',
    '[(|)]': '爱心',
    '[(u)]': '心碎',
    '[(S)]': '月亮',
    '[(*)]': '星星',
    '[(#)]': '太阳',
    '[(R)]': '彩虹',
    '[({)]': '色',
    '[(})]': '亲亲',
    '[(k)]': '示爱',
    '[(F)]': '玫瑰',
    '[(W)]': '凋谢',
    '[(D)]': '强'
  }
}

const path = emoji.path, map = emoji.map

export function parseTextMessage(message) {
  return _parseTextMessage(message, emoji).body
}

function _parseTextMessage(message, faces) {
  if (typeof message !== 'string') {
    return
  }
  if (Object.prototype.toString.call(faces) !== '[object Object]') {
    return {
      isemotion: false
      , body: [
        {
          type: "txt"
          , data: message
        }
      ]
    }
  }

  let receiveMsg = message
  let emessage = []
  let expr = /\[[^[\]]{2,3}\]/mg
  let emotions = receiveMsg.match(expr)

  if (!emotions || emotions.length < 1) {
    return {
      isemotion: false
      , body: [
        {
          type: "txt"
          , data: message
        }
      ]
    }
  }
  let isemotion = false
  for (let i = 0; i < emotions.length; i++) {
    let tmsg = receiveMsg.substring(0, receiveMsg.indexOf(emotions[i])),
      existEmotion = emoji.map[emotions[i]]

    if (tmsg) {
      emessage.push({
        type: "txt"
        , data: tmsg
      })
    }
    if (!existEmotion) {
      emessage.push({
        type: "txt"
        , data: emotions[i]
      })
      continue
    }
    let emotion = emoji.map ? emoji.path + existEmotion : null

    if (emotion) {
      isemotion = true
      emessage.push({
        type: 'emotion'
        , data: emotion
      })
    } else {
      emessage.push({
        type: 'txt'
        , data: emotions[i]
      })
    }
    let restMsgIndex = receiveMsg.indexOf(emotions[i]) + emotions[i].length
    receiveMsg = receiveMsg.substring(restMsgIndex)
  }
  if (receiveMsg) {
    emessage.push({
      type: 'txt'
      , data: receiveMsg
    })
  }
  if (isemotion) {
    return {
      isemotion: isemotion
      , body: emessage
    }
  }
  return {
    isemotion: false
    , body: [
      {
        type: "txt"
        , data: message
      }
    ]
  }
}
