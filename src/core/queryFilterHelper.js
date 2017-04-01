/**
 * Created by jiangyukun on 2016/11/27.
 */

export function getFilterCondition(queryConditions, typeCode, useText) {
  for (let i = 0; i < queryConditions.length; i++) {
    let filterCondition = queryConditions[i]
    if (filterCondition.typeCode == typeCode) {
      return filterCondition.typeItem
    }
  }
}

export function getFilterConditionValue(queryConditions, typeCode, useText) {
  for (let i = 0; i < queryConditions.length; i++) {
    let filterCondition = queryConditions[i]
    if (filterCondition.typeCode == typeCode) {
      if (useText) {
        return filterCondition.typeItem.text
      } else {
        return filterCondition.typeItem.value
      }
    }
  }
}

function _handleFilterCondition(queryConditions, options, typeCode, optionName, useText) {
  let conditionValue = getFilterConditionValue(queryConditions, typeCode, useText)
  if (conditionValue) {
    options[optionName] = conditionValue
  }
}

export class ConditionResolver {
  constructor(conditions) {
    this.conditions = conditions
    this.options = {}
  }

  resolve(typeCode, optionName, useText) {
    _handleFilterCondition(this.conditions, this.options, typeCode, optionName, useText)
    return this
  }

  resolveDate(typeCode, startDate, endDate) {
    let value = getFilterConditionValue(this.conditions, typeCode)
    if (!value) return this
    let date = value.split(',')
    if (date) {
      this.options[startDate] = date[0] || null
      this.options[endDate] = date[1] || null
    }
    return this
  }

  resolveCustom(typeCode, optionName, subOptionName) {
    let value = getFilterConditionValue(this.conditions, typeCode)
    if (typeof value != 'object') {
      this.option[optionName] = value
    } else {
      this.option[optionName] = value.main
      if (value.custom) {
        this.option[subOptionName] = value.custom
      }
    }
    return this
  }

  getCondition() {
    return this.options
  }
}
