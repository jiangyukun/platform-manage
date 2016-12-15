/**
 * Created by jiangyukun on 2016/11/26.
 */
import constants from './constants'

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

export function getStartEndDate(typeCode, typeText, typeItemList) {
    return []
}

export function getSession(key) {
    return sessionStorage.getItem(key)
}

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
    return encodeURI(paramUrl);
}
