/**
 * Created by jiangyukun on 2016/10/19.
 */


module.exports = function (app) {
    app.get('/fetchPatientList/:start/:length', function (req, res) {
        var start = req.params.start;
        var length = req.params.length;


        var result = [];
        for (var i = 0; i < length; i++) {
            result.push({
                id: start + '--' + length,
                patient_Phone: start * length + i,
                patient_Name: 'xxsg',
                hospital_Name: '',
                visit_Doctor: '',
                infection_Doctor: '',
                obstetrics_Doctor: '',
                pediatrics_Doctor : '',
                is_Hepatitis: '',
                is_Pregnant: '',
                is_Checked: '',
                regrist_Time: '',
                pregnancy_week: '',
                expected_Child_Birth_Date: '',
                antiviral_Record: '',
                blocking_Results: '',
                app_version: '',
                device_Model: '',
                visit_1_Liver_Function: '',
                visit_1_HBV_DNA: '',
                visit_1_Liver_Five: '',
                visit_1_Liver_B: '',
                pregnant_14_Weeks_Date: '',
                is_Pregnant_14_Weeks_Contact: '',
                pregnant_14_Weeks_Contact_Remark: '',
                visit_2_Liver_Function: '',
                visit_2_HBV_DNA: '',
                visit_2_Liver_Five: '',
                visit_2_Liver_B: '',
                pregnant_26_Weeks_Date: '',
                is_Pregnant_26_Weeks_Contact: '',
                pregnant_26_Weeks_Contact_Remark: '',
                visit_3_Liver_Function: '',
                visit_3_HBV_DNA: '',
                visit_3_Liver_Five: '',
                visit_3_Liver_B: '',
                pregnant_36_Weeks_Date: '',
                is_Pregnant_36_Weeks_Contact: '',
                pregnant_36_Weeks_Contact_Remark: '',
                visit_4_Liver_Function: '',
                visit_4_HBV_DNA: '',
                visit_4_Liver_Five: '',
                visit_4_Liver_B: ';',
                postpartum_6_Weeks_Date: '',
                is_Postpartum_6_Weeks_Contact: '',
                postpartum_6_Weeks_Contact_Remark: '',
                visit_5_Liver_Function: '',
                visit_5_HBV_DNA: '',
                visit_5_Liver_Five: '',
                visit_5_Liver_B: '',
                postpartum_8_Months_Date: '',
                is_Postpartum_8_Months_Contact: '',
                postpartum_8_Months_Contact_Remark: ''
            })
        }
        res.json({
            patientList: result,
            total: 56,
            status: 0
        })
    })

}
