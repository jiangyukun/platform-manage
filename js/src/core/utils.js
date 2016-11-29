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
