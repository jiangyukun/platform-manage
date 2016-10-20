/**
 * Created by jiangyukun on 2016/10/19.
 */


module.exports = function (app) {
    app.get('/fetchMessageInfo/:start/:length', function (req, res) {
        var start = req.params.start;
        var length = req.params.length;


        var result = [];
        for (var i = 0; i < length; i++) {
            result.push({
                id: start + '--' + length,
                readState: 2,
                name: 'xxx',
                mobile: 18768105555,
                uploader: '莫莫莫',
                uploadDate: '2016-10-15',
            })
        }
        res.json({
            messageList: result,
            unreadTotal: 40,
            total: 56,
            status: 0
        })
    })

}
