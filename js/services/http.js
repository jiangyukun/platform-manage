/**
 * Created by jiangyukun on 2016/11/26.
 */
export default function http(url, info) {
    //http://admin.vongihealth.com:85
    url = '/backend' + url
    info = info || {}
    info = {
        ...info,
        credentials: 'include',
        // mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(info.body),
    }
    return fetch(url, info)
}
