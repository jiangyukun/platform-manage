/**
 * Created by jiangyukun on 2016/11/29.
 */

const expect = require('chai').expect
import {ConditionResolver} from '../../src/core/busHelper'

describe('busHelper', function () {
    it('testConditionResolver', function () {
        let conditions = [
            {
                typeCode: 'a',
                typeItem: {value: 'a', text: 'A'}
            },
            {
                typeCode: 'date',
                typeItem: {value: '2016-10-10,2016-10-12', text: '2016-10-10 到 2016-10-12'}
            }
        ]
        let result = new ConditionResolver(conditions)
            .resolve('a', '_a')
            .resolveDate('date', 'start_date', 'end_date')
            .resolveCustom()
            .getCondition()

        expect(result).to.deep.equal({
            _a: 'a',
            start_date: '2016-10-10',
            end_date: '2016-10-12'
        })
    })
})
