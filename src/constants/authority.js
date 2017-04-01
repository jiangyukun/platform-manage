/**
 * Created by jiangyukun on 2017/3/15.
 */
export const EDIT_AUTHORITY = '1'
export const LOOK_AUTHORITY = '2'

export function getIsCanEdit(pageList, currentPageName) {
  if (!pageList || pageList.length == 0) {
    return false
  }
  let page = pageList.find(page => page['page_Name'] == currentPageName)
  return page && page['permission'] == EDIT_AUTHORITY
}

export function getIsCanExport(pageList, currentPageName) {
  if (!pageList || pageList.length == 0) {
    return false
  }
  let page = pageList.find(page => page['page_Name'] == currentPageName)
  return page && page['export'] == true
}
