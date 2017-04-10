/**
 * Created by jiangyukun on 2016/11/26.
 */
export default {
  yesOrNo: {
    yes: '1',
    no: '0'
  },
  auditingState: {
    auditing: 1, //审核中
    auditingPass: 2,
    auditingUnPass: 3
  },
  visitState: {
    UN_COMPLETE: 0, //未完成
    COMPLETE: 1, //已完成
    UN_CONTACT: 2 //未联系
  },
  messageState: {
    read: 1,
    unread: 2
  },
  laboratoryState: {
    UN_RECORDED: 3,
    INVALID: 2,
    RECORDED: 1
  },

  remarkFlag: {
    DOCTOR_AUDITING: 1,
    PATIENT_EDIT: 2,
    SLIDER_CONFIG: 3,
    SCORE_STATISTICS: 4,
    KNOWLEDGE_BASE: 5
  },
  appSystemType: {
    ios: 1,
    android: 2
  },
  userType: {
    patient: 1,
    doctor: 2
  }
}
