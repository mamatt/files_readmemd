const webpackConfig = require('@nextcloud/webpack-vue-config')

webpackConfig.resolve['fallback']= {fs: false }

module.exports = webpackConfig