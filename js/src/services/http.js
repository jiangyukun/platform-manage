/**
 * Created by jiangyukun on 2016/11/26.
 */

function preHandle(url, option) {
    if (process.env.NODE_ENV != 'dev') {
        url = '/backend' + url
    }
    option = option || {}
    const body = option.body

    option = {
        ...option,
        credentials: 'include',
        headers: {
            'Accept': 'application/json;charset=utf-8',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body),
    }

    return {url, option}
}

function method(type) {
    return function (url, option) {
        option = option || {}
        option.method = type
        let handleArg = preHandle(url, option)

        return new Promise((resolve, reject) => {
            fetch(handleArg.url, handleArg.option).then(response => {
                if (response.status == 200) {
                    return response.json()
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

export default function http(url, option) {
    //http://admin.vongihealth.com:85
    let handleArg = preHandle(url, option)

    return fetch(handleArg.url, handleArg.option)
}
