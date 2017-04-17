/**
 * Created by jiangyukun on 2017/3/7.
 */
export const all = '任意'

export function isEmpty(value) {
  if (value == null || value == '' || value == all) {
    return true
  }
  return false
}

export function checkNotEmpty(value) {
  if (value == null || value == '' || value == all) {
    return false
  }
  return true
}

export function checkAllEmpty(...arg) {
  let allEmpty = true
  arg.forEach(item => {
    if (checkNotEmpty(item)) {
      allEmpty = false
    }
  })
  return allEmpty
}

export function isMedicineNameDisabled(rule) {
  const allowRule = ['正在服用', '服用过', '没有服用过', '孕20周之前开始服用', '怀孕后、孕20周之前无服药记录，孕20周开始服用']
  return allowRule.indexOf(rule) == -1
}

export const hbvDNAOptions = [
  {value: '任意', text: '任意'},
  {value: '>', text: '>'},
  {value: '>=', text: '>='},
  {value: '=', text: '='},
  {value: '<', text: '<'},
  {value: '<=', text: '<='},
  {value: '阴性', text: '阴性'},
  {value: '阳性', text: '阳性'},
  {value: '无数据', text: '无数据'},
]

export const weightOptions = [
  {value: '任意', text: '任意'},
  {value: '>', text: '>'},
  {value: '>=', text: '>='},
  {value: '<=', text: '<='},
  {value: '<', text: '<'},
]

export const quantitativeResultOptions = [
  {value: '任意', text: '任意'},
  {value: '>', text: '>'},
  {value: '>=', text: '>='},
  {value: '<=', text: '<='},
  {value: '<', text: '<'},
]

export const altOptions = [
  {value: '任意', text: '任意'},
  {value: '>', text: '>'},
  {value: '>=', text: '>='},
  {value: '<', text: '<'},
  {value: '<=', text: '<='},
  {value: '无数据', text: '无数据'},
]

export const liverBOptions = [
  {value: '任意', text: '任意'},
  {value: '包含', text: '包含'},
  {value: '无异常', text: '无异常'},
  {value: '无数据', text: '无数据'},
]

export const takeMedicineOption = [
  {value: '任意', text: '任意'},
  {value: '正在服用', text: '正在服用'},
  {value: '服用过', text: '服用过'},
  {value: '没有服用过', text: '没有服用过'},
  {value: '未用药', text: '未用药'},
  {value: '无抗病毒记录', text: '无抗病毒记录'},
  {value: '有抗病毒记录', text: '有抗病毒记录'},
  {value: '无保肝记录', text: '无保肝记录'},
  {value: '有保肝记录', text: '有保肝记录'},
  {value: '孕20周之前开始服用', text: '孕20周之前开始服用'},
  {value: '孕期未抗病毒', text: '孕期未抗病毒'},
  {value: '怀孕后、孕20周之前无服药记录，孕20周开始服用', text: '怀孕后、孕20周之前无服药记录，孕20周开始服用'},
]
