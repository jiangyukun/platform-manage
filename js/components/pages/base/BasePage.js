/**
 * Created by jiangyu2016 on 16/10/16.
 */


import React, {Component} from 'react'

export default class BasePage extends Component {


    handleFilterCondition(typeCode, valueType) {
        for (let i = 0; i < this.filterConditions.length; i++) {
            let filterCondition = this.filterConditions[i]
            if (filterCondition.typeCode == typeCode) {
                if (valueType == 'value') {
                    return filterCondition.typeItem.value
                }
                return filterCondition.typeItem.text
            }
        }
    }
}
