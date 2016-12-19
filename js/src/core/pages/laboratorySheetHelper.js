/**
 * Created by jiangyukun on 2016/12/19.
 */
export function convertTitle(sheetType) {
    let title = ''
    switch (sheetType) {
        case 1:
            title = '随访医生上传';
            break;
        case 2:
            title = '患者上传';
            break;
        case 3:
            title = '已录入';
            break;
        case 4:
            title = '未录入';
            break;
        case 5:
            title = '无效';
            break;
        case 6:
            title = '已删除';
            break;
        default:
            break;
    }

    return title
}
