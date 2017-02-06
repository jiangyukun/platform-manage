/**
 * Created by jiangyukun on 2016/12/9.
 */
if (process.env.NODE_ENV === 'dev') {
  module.exports = require('./routes_dev')
} else if (process.env.NODE_ENV === 'inline') {
  module.exports = require('./routes_inline')
} else if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  module.exports = require('./routes_prod')
}
