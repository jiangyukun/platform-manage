/**
 * Created by jiangyukun on 2016/11/26.
 */
import constants from './constants'

/**
 * 获取FilterItem的item参数对象
 * @param typeCode
 * @param typeText
 * @param typeItemList
 * @returns {{typeCode: *, typeText: *, typeItemList: *}}
 */
export function getFilterItem(typeCode, typeText, typeItemList) {
  if (!typeItemList) {
    typeItemList = [
      {value: constants.yesOrNo.yes, text: '是'}, {value: constants.yesOrNo.no, text: '否'}
    ]
  }
  return {
    typeCode: typeCode,
    typeText: typeText,
    typeItemList: typeItemList
  }
}

export function getSession(key) {
  return sessionStorage.getItem(key)
}

/**
 * 将对象转化为地址栏参数
 * @param paramObj
 * @returns {string}
 */
export function urlParam(paramObj) {
  let paramUrl = ''
  let current = 0
  for (let param in paramObj) {
    if (paramObj.hasOwnProperty(param)) {
      if (paramObj[param]) {
        let prefix = ''
        if (current++ == 0) {
          prefix = '?'
        } else {
          prefix = '&'
        }
        paramUrl += prefix + param + '=' + paramObj[param];
      }
    }
  }
  return encodeURI(paramUrl)
}

/**
 * fetch请求 表单参数 body处理
 * @param paramObj
 * @returns {string}
 */
export function bodyParam(paramObj) {
  let paramUrl = ''
  let current = 0
  for (let param in paramObj) {
    if (paramObj.hasOwnProperty(param)) {
      if (paramObj[param]) {
        let prefix = ''
        if (current++ == 0) {
          prefix = ''
        } else {
          prefix = ','
        }
        paramUrl += prefix + param + '=' + paramObj[param]
      }
    }
  }
  return encodeURI(paramUrl)
}

export function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

/**
 * 上传图片文件前的校验
 * @param file
 * @returns {*}
 */
export function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJPG) {
    return {
      status: 1,
      message: '不支持的图片格式！'
    }
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    return {
      status: 1,
      message: '文件不能超过2MB！'
    }
  }
  return {
    status: 0
  }
}

/**
 * 分页当中，要显示的页数，返回长度为0-10的数组
 * @param pageTotal 总页数
 * @param currentPage 从1开始
 * @returns
 */
export function calculatePageIndex(pageTotal, currentPage) {
  let i, j, pageToShowLength = 5
  let beforeCount = 4, afterCount, current = currentPage
  let pages = []

  if (typeof pageTotal != 'number' || pageTotal < 1) {
    return []
  }
  else if (pageTotal == 1) {
    return [1]
  }
  pages.push(1)

  let start = current - beforeCount
  if (start < 2) {
    start = 2
    beforeCount = current - 2
    if (beforeCount < 0) {
      beforeCount = 0
    }
  } else if (start > 2) {
    pages.push('...')
  }
  for (i = start; i <= current; i++) {
    pages.push(i)
  }
  afterCount = pageToShowLength - beforeCount
  for (i = current + 1, j = 0; i < pageTotal; i++) {
    if (j > afterCount) {
      if (i != pageTotal - 1) {
        pages.push('...')
      }
      break
    }
    pages.push(i)
    j++
  }
  if (current != pageTotal) {
    pages.push(pageTotal)
  }
  return pages
}

/**
 * 各种环境下的路由前缀
 * @param page
 * @returns {string}
 */
export function getPath(page) {
  let path = ''
  let prefix = ''
  if (process.env.NODE_ENV == 'production') {
    prefix = 'platform/'
  }
  if (process.env.NODE_ENV == 'inline') {
    prefix = 'platform/'
    path = 'inline/'
  }
  if (process.env.NODE_ENV == 'dev') {
    path = 'dev/'
  }

  return prefix + path + page
}

/**
 * get请求下载文件
 * @param url 后台地址
 * @param param 参数对象
 */
export function exportExcel(url, param) {
  if (param) {
    location.href = url + urlParam(param)
  } else {
    location.href = url
  }
}

/**
 * 将字符串根据指定的子串切分成数组, getMatchTextList('abcad', a) 返回 ['a', 'bc', 'a', 'd']
 * @param str
 * @param part
 * @returns {*}
 */
export function getMatchTextList(str, part) {
  if (!str) {
    return []
  }
  if (!part) {
    return [str]
  }
  const index = str.indexOf(part)
  if (index == -1) {
    return [str]
  }
  let result = []
  if (str.substring(0, index) != '') {
    result.push(str.substring(0, index))
  }
  result.push(part)
  return result.concat(getMatchTextList(str.substr(index + part.length), part))
}

/**
 * 获取唯一id
 * @type {number}
 */
let uid = 1
export function getUUID() {
  return uid++
}

/**
 * 交换数组中2个元素的位置
 */
export function switchArrayPosition(list, index1, index2) {
  list.splice(index1, 0)
  list.splice(index2, 0)

}