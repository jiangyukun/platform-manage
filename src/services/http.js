/**
 * Created by jiangyukun on 2016/11/26.
 */
import 'isomorphic-fetch'
import {bodyParam} from '../core/utils'

function preHandle(url, option) {
  if (process.env.NODE_ENV != 'dev') {
    url = '/backend' + url
  }
  option = option || {}
  if (!option.type) {
    option.type = 'json'
  }
  if (!option.method) {
    option.method = 'GET'
  }
  const body = option.body

  let contentType = 'application/x-www-form-urlencoded'
  if (option.body && option.type == 'json') {
    contentType = 'application/json;charset=utf-8'
  }

  const request = {
    method: option.method,
    credentials: 'include',
    headers: {
      'ajax': 'ajax',
      'Accept': 'application/json;charset=utf-8',
      'Content-Type': contentType
    }
  }

  if (body) {
    if (option.type == 'text') {
      request.body = bodyParam(body)
    } else {
      request.body = JSON.stringify(body)
    }
  }
  return {url, request}
}

function method(type) {
  return function (url, option) {
    option = option || {}
    option.method = type
    let handleArg = preHandle(url, option)

    return new Promise((resolve, reject) => {
      fetch(handleArg.url, handleArg.request).then(response => {
        if (response.status == 200) {
          return response.json()
        }
        if (response.status == 404) {
          return Promise.resolve({
            status: -1, rspMsg: '未找到指定接口，请联系开发人员'
          })
        }
        return Promise.resolve({
          status: -1, rspMsg: 'HTTP: ' + response.status
        })
      }).then(result => {
        try {
          if (result.status == 0) {
            resolve(result['data'])
          } else {
            reject(result['rspMsg'])
          }
        } catch (err) {
          throw err
        }
      }).catch(err => reject(err))
    })
  }
}

export let GET = method('GET')
export let POST = method('POST')
export let PUT = method('PUT')
export let PATCH = method('PATCH')
export let DELETE = method('DELETE')
export let HEAD = method('HEAD')

export let _get = GET
export let _post = POST
export let _put = PUT
export let _patch = PATCH
export let _delete = DELETE
export let _head = HEAD

export default function http(url, option) {
  let handleArg = preHandle(url, option)

  return fetch(handleArg.url, handleArg.option)
}
