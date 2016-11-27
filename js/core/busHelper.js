/**
 * Created by jiangyukun on 2016/11/27.
 */

export function handleFilterCondition(queryConditions, options, typeCode, optionName, useText) {
    for (let i = 0; i < queryConditions.length; i++) {
        let filterCondition = queryConditions[i]
        if (filterCondition.typeCode == typeCode) {
            if (useText) {
                options[optionName] = filterCondition.typeItem.text
            }
            options[optionName] = filterCondition.typeItem.value
        }
    }
}

export class ConditionResolver {
    constructor(conditions) {
        this.conditions = conditions
        this.options = {}
    }

    resolve(typeCode, optionName, useText) {
        handleFilterCondition(this.conditions, this.options, typeCode, optionName, useText)
        return this
    }

    getCondition() {
        return this.options
    }
}
