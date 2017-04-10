/**
 * Created by jiangyukun on 2017/4/10.
 */

export function updateList(curIState, listItemKey, id, callback) {
  const list = curIState.get('list')
  const match = list.find(item => item.get(listItemKey) == id)
  if (!match) {
    console.warn('no match ' + listItemKey)
    return curIState
  }
  return curIState.update('list', list => list.update(list.indexOf(match), item => callback(item)))
}
