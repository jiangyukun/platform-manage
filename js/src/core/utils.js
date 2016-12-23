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


export function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
}

export function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJPG) {
        return {
            status: 1,
            message: '不支持的图片格式！'
        }

    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        return {
            status: 1,
            message: '文件不能超过2MB！'
        }
    }
    return {
        status: 0
    }
}
