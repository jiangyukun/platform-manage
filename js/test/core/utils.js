/**
 * Created by jiangyukun on 2017/2/23.
 */

function getMatchList(str, part) {
  if (!str) {
    return []
  }
  if (!part) {
    return str
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
  return result.concat(getMatchList(str.substr(index + part.length), part))
}

let r = getMatchList('abcdaa', 'a')
console.log(r)