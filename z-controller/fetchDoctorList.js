/**
 * Created by jiangyukun on 2016/10/19.
 */


module.exports = function (app) {
    app.get('/fetchDoctorList/:start/:length', function (req, res) {
        var start = req.params.start;
        var length = req.params.length;

        var result = [];
        for (var i = 0; i < length; i++) {
            result.push({
                id: start + '--' + length,
                phone: start * length + i,
                doctor_Name: start + '-' + i,
                hospital_Id: 'abc',
                department_Id: 'ddd',
                title_Id: 'sdf',
                doctor_Photo: 'http://www.4j4j.cn/upload/pic/20121031/261e39e216.jpg',
                doctor_Practicing_Photo: 'http://pic.4j4j.cn/upload/pic/20130815/31e652fe2d.jpg',
                doctor_Practicing_Number: '3308022239248238',
                doctor_Major: 'english',
                doctor_Is_Checked: '0',
                doctor_Info_Remark: 'remark',
                doctor_Info_Creat_Time: '2016-10-10'
            })
        }
        res.json({
            doctorList: result,
            total: 56,
            status: 0
        })
    })

}
