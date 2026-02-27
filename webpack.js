const path = require('path')
const packageJson = require('./package.json')

if (!process.env.npm_package_name) {
	process.env.npm_package_name = packageJson.name
}
if (!process.env.npm_package_version) {
	process.env.npm_package_version = packageJson.version
}
if (!process.env.NODE_ENV) {
	const modeIndex = process.argv.indexOf('--mode')
	if (modeIndex > -1 && process.argv[modeIndex + 1]) {
		process.env.NODE_ENV = process.argv[modeIndex + 1]
	}
}

const webpackConfig = require('@nextcloud/webpack-vue-config')

webpackConfig.resolve['fallback']= {fs: false }
webpackConfig.stats = {
	colors: true,
	modules: false,
}

webpackConfig.entry['main'] = path.join(__dirname, 'src', 'main.js'),
webpackConfig.entry['public'] = path.join(__dirname, 'src', 'public.js'),
webpackConfig.entry['config'] = path.join(__dirname, 'src', 'config.js')

module.exports = webpackConfig
