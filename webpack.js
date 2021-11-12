const webpackConfig = require('@nextcloud/webpack-vue-config')
const path = require('path')

webpackConfig.resolve['fallback']= {fs: false }

webpackConfig.entry['main'] = path.join(__dirname, 'src', 'main.js'),
webpackConfig.entry['config'] = path.join(__dirname, 'src', 'config.js')

module.exports = webpackConfig