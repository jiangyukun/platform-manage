/**
 * Created by jiangyukun on 2016/12/22.
 */

export function upload(file) {
  const form = new FormData()
  form.append('file', file)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('post', 'file/saveBackendTempFile', true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const result = eval('(' + xhr.responseText + ')')
        if (result.status == 0) {
          resolve(result['data'][0])
          return
        }
        reject(result['rspMsg'])
      }
    }
    // xhr.setRequestHeader('Accept', 'application/json;charset=utf-8')
    xhr.send(form)
  })

}
