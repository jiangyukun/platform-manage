/**
 * Created by jiangyukun on 2017/3/31.
 */

export const RECORD_TYPE = {
  antiVirus: 1,
  babyBirthInfo: 2,
  inoculationInfo: 3,
  babyJulyInfo: 4,
}

export function getRecordTypeText(type) {
  switch (type) {
    case RECORD_TYPE.antiVirus:
      return '抗病毒'

    case RECORD_TYPE.babyBirthInfo:
      return '宝宝出生信息'

    case RECORD_TYPE.inoculationInfo:
      return '接种信息'

    case RECORD_TYPE.babyJulyInfo:
      return '宝宝7月信息'

    default:
      return type
  }
}
