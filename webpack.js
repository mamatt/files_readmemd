const path = require('path')
const webpackConfig = require('@nextcloud/webpack-vue-config')

webpackConfig.resolve['fallback']= {fs: false }
webpackConfig.stats = {
	colors: true,
	modules: false,
}

webpackConfig.entry['main'] = path.join(__dirname, 'src', 'main.js'),
webpackConfig.entry['config'] = path.join(__dirname, 'src', 'config.js')

module.exports = webpackConfig