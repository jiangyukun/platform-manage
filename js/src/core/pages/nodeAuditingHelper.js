/**
 * Created by jiangyukun on 2016/12/2.
 */
export function toRemarkTypeResponseKey(remarkType) {
    let key
    switch (remarkType) {
        case 1:
            key = 'first_Contact_Remark'
            break;
        case 2:
            key = 'pregnant_14_Weeks_Contact_Remark'
            break;
        case 3:
            key = 'pregnant_26_Weeks_Contact_Remark'
            break;
        case 4:
            key = 'pregnant_33_Weeks_Contact_Remark'
            break;
        case 5:
            key = 'pregnant_41_Weeks_Contact_Remark'
            break;
        case 6:
            key = 'pregnant_46_Weeks_Contact_Remark'
            break;
        case 7:
            key = 'pregnant_50_Weeks_Contact_Remark'
            break;
        case 8:
            key = 'pregnant_72_Weeks_Contact_Remark'
            break;
        case 9:
            key = 'pregnant_76_Weeks_Contact_Remark'
            break;
        case 10:
            key = 'pregnant_80_Weeks_Contact_Remark'
            break;
        default:
            throw new Error('illegal remarkType')
    }
    return key
}

export function toRemarkTypeRequestKey(remarkType) {
    let remarkKey
    switch (remarkType) {
        case 1:
            remarkKey = 'first_Contact_Remark'
            break
        case 2:
            remarkKey = 'pregnant_14_Weeks_Contact_Remark'
            break
        case 3:
            remarkKey = 'pregnant_26_Weeks_Contact_Remark'
            break
        case 4:
            remarkKey = 'pregnant_33_Weeks_Contact_Remark'
            break
        case 5:
            remarkKey = 'pregnant_41_Weeks_Contact_Remark'
            break
        case 6:
            remarkKey = 'pregnant_46_Weeks_Contact_Remark'
            break
        case 7:
            remarkKey = 'pregnant_50_Weeks_Contact_Remark'
            break
        case 8:
            remarkKey = 'pregnant_72_Weeks_Contact_Remark'
            break
        case 9:
            remarkKey = 'pregnant_76_Weeks_Contact_Remark'
            break
        case 10:
            remarkKey = 'pregnant_80_Weeks_Contact_Remark'
            break
        default:
            throw new Error('illegal remarkKey')
    }
    return remarkKey
}

export function toCompleteVisitTypeResponseKey(completeVisitType) {
    let key
    switch (completeVisitType) {
        case 1:
            key = 'is_First_Complete_Visit'
            break
        case 2:
            key = 'is_Pregnant_14_Weeks_Complete_Visit'
            break
        case 3:
            key = 'is_Pregnant_26_Weeks_Complete_Visit'
            break
        case 4:
            key = 'is_Pregnant_33_Weeks_Complete_Visit'
            break
        case 5:
            key = 'is_Pregnant_41_Weeks_Complete_Visit'
            break
        case 6:
            key = 'is_Pregnant_46_Weeks_Complete_Visit'
            break
        case 7:
            key = 'is_Pregnant_50_Weeks_Complete_Visit'
            break
        case 8:
            key = 'is_Pregnant_72_Weeks_Complete_Visit'
            break
        case 9:
            key = 'is_Pregnant_76_Weeks_Complete_Visit'
            break
        case 10:
            key = 'is_Pregnant_80_Weeks_Complete_Visit'
            break
        default:
            throw new Error('illegal visitCardType')
    }
    return key
}

export function toCompleteVisitTypeRequestKey(completeVisitType) {
    let key
    switch (completeVisitType) {
        case 1:
            key = 'is_First_Complete_Visit'
            break
        case 2:
            key = 'is_Pregnant_14_Weeks_Complete_Visit'
            break
        case 3:
            key = 'is_Pregnant_26_Weeks_Complete_Visit'
            break
        case 4:
            key = 'is_Pregnant_33_Weeks_Complete_Visit'
            break
        case 5:
            key = 'is_Pregnant_41_Weeks_Complete_Visit'
            break
        case 6:
            key = 'is_Pregnant_46_Weeks_Complete_Visit'
            break
        case 7:
            key = 'is_Pregnant_50_Weeks_Complete_Visit'
            break
        case 8:
            key = 'is_Pregnant_72_Weeks_Complete_Visit'
            break
        case 9:
            key = 'is_Pregnant_76_Weeks_Complete_Visit'
            break;
        case 10:
            key = 'is_Pregnant_80_Weeks_Complete_Visit'
            break
        default:
            throw new Error('illegal visitCardType')
    }
    return key
}
