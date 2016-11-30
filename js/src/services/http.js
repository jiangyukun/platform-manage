/**
 * Created by jiangyukun on 2016/11/26.
 */
export default function http(url, option) {
    //http://admin.vongihealth.com:85
    url = '/backend' + url
    option = option || {}
    let param = option.body
    if (param && param.length) {
        param.limit = param.length
    }
    option = {
        ...option,
        credentials: 'include',
        headers: {
            'Accept': 'application/json;charset=utf-8',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(option.body),
    }

    return fetch(url, option)
}
