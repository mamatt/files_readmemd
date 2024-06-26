const path = require('path')
const webpackConfig = require('@nextcloud/webpack-vue-config')

webpackConfig.resolve['fallback']= {fs: false }
webpackConfig.stats = {
	colors: true,
	modules: false,
}

webpackConfig.module.rules.RULE_SCSS = {
	test: /\.scss$/,
	use: [
	  'vue-style-loader',
	  'css-loader',
	  'sass-loader'
	]
  }

//webpackConfig.module.rules = Object.values(webpackRules)

webpackConfig.entry['main'] = path.join(__dirname, 'src', 'main.js'),
webpackConfig.entry['public'] = path.join(__dirname, 'src', 'public.js'),
webpackConfig.entry['config'] = path.join(__dirname, 'src', 'config.js')

module.exports = webpackConfig