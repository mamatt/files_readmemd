/* eslint-env jquery */

/**
 * @author Matthieu Le Corre <matthieu.lecorre@univ-nantes.fr>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import { emit } from '@nextcloud/event-bus'
import { generateUrl } from '@nextcloud/router'
import axios from '@nextcloud/axios'

/**
 * @namespace OCA.ReadmeMD
 */
OCA.ReadmeMD = {}

/**
 * @namespace OCA.ReadmeMD.App
 */
OCA.ReadmeMD.App = {

	/**
	 * Setup on page load
	 *
	 * @param {object} header header container
	 * @param {object} footer container
	 * @param {string} mode public share or private view
	 * @param {string} contenairParent contenair to get attached
	 */
	initialize(header, footer, mode, contenairParent) {

		const self = this

		// public share or private view
		this.mode = mode

		// public or private don't get the contenair id anymore
		this.contenairParent = contenairParent

		// container creation
		this.header = header
		this.footer = footer

		this.createContainer(this.header)
		this.createContainer(this.footer)

		// get the config
		// then setup the trigger on filetable
		this.getConfig()
			.then(function() {

				if (self.disable_workspace === 'true') {
					emit('Text::hideRichWorkspace', '')
				}

				// jquery is kept here because NC files use jquery event "updated"
				$(self.contenairParent + ' .files-filestable').on('updated', function() {
					self.checkMD()
				})
			})

		// only in private mode
		if (this.mode === 'private') {

			// Mutation observer to toogle readme visibility on hide or show
			const hideContainerOnHideObserver = new MutationObserver(function(mutations) { self.callBackToggleContainer(mutations, 'hide') })
			const hideContainerOnShowObserver = new MutationObserver(function(mutations) { self.callBackToggleContainer(mutations, 'show') })

			// hide on showing trash / favorite / recent  / share ...
			hideContainerOnHideObserver.observe(document.querySelector(this.contenairParent), { attributes: true })

			// this is a different for search as we doesn't toogle on hide but on show
			// hideContainerOnShowObserver.observe($('div.nofilterresults')[0],{attributes: true }) ;
			hideContainerOnShowObserver.observe(document.getElementById('searchresults'), { attributes: true })

			// this one is for mindmap or all other "fullscreen" apps
			hideContainerOnHideObserver.observe(document.querySelector(this.contenairParent + ' .files-filestable'), { attributes: true })
		}

	},

	/**
	 *  get the config from DB
	 */
	getConfig() {
		const self = this
		return axios.get(generateUrl('apps/files_readmemd/config'))
			.then(function(json) {
				self.show_asciidoc = json.data.show_asciidoc
				self.show_html = json.data.show_html
				self.auto_refresh = json.data.auto_refresh
				self.disable_workspace = json.data.disable_workspace

				if (json.data.show_title === 'false') {
					self.footer.container.classList.add('no-before')
				}

				if (json.data.yellow_back === 'false') {
					self.footer.container.classList.remove('yellowish')
				}

				self.fileslist_header = json.data.fileslist_header
				self.fileslist_footer = json.data.fileslist_footer
			})

	},

	/**
	 *  Mutation observer Callback
	 *
	 * @param {MutationRecord[]} mutations mutation to listen to
	 * @param {string} mode hide or show
	 */
	callBackToggleContainer(mutations, mode) {
		const self = this
		mutations.forEach(function(mutation) {
			if (mutation.attributeName === 'class') {
				if (mode === 'hide') {
					// mode hide
					if (mutation.target.classList.contains('hidden')) {
						self.header.container.classList.add('hidden')
						self.footer.container.classList.add('hidden')
						document.querySelector(self.contenairParent + ' .files-filestable > tfoot > tr').style.height = '250px'
					} else {
						if (self.header.content !== null && window.location.search.indexOf('view') === -1) {
							self.header.container.classList.remove('hidden')
							document.querySelector(self.contenairParent + ' .files-filestable > tfoot > tr').style.height = 'auto'
						}
						if (self.footer.content !== null && window.location.search.indexOf('view') === -1) {
							self.footer.container.classList.remove('hidden')
							document.querySelector(self.contenairParent + ' .files-filestable > tfoot > tr').style.height = 'auto'
						}
					}
				} else {
					// mode show
					if (mutation.target.classList.contains('hidden') && window.location.search.indexOf('view') === -1) {
						if (self.header.content !== null) {
							self.header.container.classList.remove('hidden')
							document.querySelector(self.contenairParent + ' .files-filestable > tfoot > tr').style.height = 'auto'
						}
						if (self.footer.content !== null) {
							self.footer.container.classList.remove('hidden')
							document.querySelector(self.contenairParent + ' .files-filestable > tfoot > tr').style.height = 'auto'
						}
					} else {
						self.header.container.addClass('hidden')
						self.footer.container.addClass('hidden')
						document.querySelector(self.contenairParent + ' .files-filestable > tfoot > tr').style.height = '250px'
					}
				}
			}
		})
	},

	/**
	 * Generate FileNames lists corresponding to configs
	 *
	 * @param {string} zone footer or header
	 */
	generateFileNames(zone) {

		const FFNames = []

		const self = this

		this.fileslist_footer.forEach(function(fn) {
			Array.prototype.push.apply(FFNames, [
				fn + '.md',
				fn + '.markdown',
				'.' + fn + '.md',
				'.' + fn + '.markdown',
			])

			if (self.show_asciidoc === 'true') {
				Array.prototype.push.apply(FFNames, [
					fn + '.adoc',
					fn + '.asciidoc',
					'.' + fn + '.adoc',
					'.' + fn + '.asciidoc',
				])
			}

			if (self.show_html === 'true') {
				Array.prototype.push.apply(FFNames, [
					fn + '.htm',
					fn + '.html',
					'.' + fn + '.htm',
					'.' + fn + '.html',
				])
			}
		})

		const HFNames = []
		this.fileslist_header.forEach(function(fn) {
			Array.prototype.push.apply(HFNames, [
				fn + '.md',
				fn + '.markdown',
				'.' + fn + '.md',
				'.' + fn + '.markdown',
			])

			if (self.show_asciidoc === 'true') {
				Array.prototype.push.apply(HFNames, [
					fn + '.adoc',
					fn + '.asciidoc',
					'.' + fn + '.adoc',
					'.' + fn + '.asciidoc',
				])
			}

			if (self.show_html === 'true') {
				Array.prototype.push.apply(HFNames, [
					fn + '.htm',
					fn + '.html',
					'.' + fn + '.htm',
					'.' + fn + '.html',
				])
			}
		})

		if (zone === 'header') { return HFNames }
		if (zone === 'footer') { return FFNames }
	},

	/**
	 * check MD handler
	 */
	checkMD() {

		const self = this

		let FL

		// cleanup "old" MDs before checking for new ones
		this.header.container.classList.add('hidden')
		while (this.header.container.firstChild) {
			this.header.container.firstChild.remove()
		}
		this.header.content = null

		this.footer.container.classList.add('hidden')
		while (this.footer.container.firstChild) {
			this.footer.container.firstChild.remove()
		}
		this.footer.content = null

		if (this.mode === 'public') {
			FL = OCA.Sharing.PublicApp.fileList.files
		} else {
			FL = OCA.Files.App.fileList.files
		}

		this.header.filenames = this.generateFileNames('header')
		this.footer.filenames = this.generateFileNames('footer')

		// list files from current dir and check
		this.header.filename = null
		this.footer.filename = null

		for (const activFile in this.header.filenames) {
			for (const filenum in FL) {
				if (FL[filenum].name === this.header.filenames[activFile] && FL[filenum].type === 'file') {
					this.header.filename = FL[filenum].name
					this.header.mtime = FL[filenum].mtime
					this.header.filenum = filenum
				}
			}
		}

		for (const activFile in this.footer.filenames) {
			for (const filenum in FL) {
				if (FL[filenum].name === this.footer.filenames[activFile] && FL[filenum].type === 'file') {
					this.footer.filename = FL[filenum].name
					this.footer.mtime = FL[filenum].mtime
					this.footer.filenum = filenum

				}
			}
		}

		if (this.header.filename !== null) {
			this.header.container.classList.remove('hidden')
			this.fillContainer(this.header)

			if (this.auto_refresh === 'true') {
				// clear setInterval and force a new one
				clearInterval(this.header.interval)
				this.header.interval = setInterval(function() { self.refreshContent(self.header) }, 1000)
			}
		}

		if (this.footer.filename !== null) {
			this.footer.container.classList.remove('hidden')
			this.footer.container.dataset.filename = this.footer.filename
			this.fillContainer(this.footer)

			if (this.auto_refresh === 'true') {
				// clear setInterval and force a new one
				clearInterval(this.footer.interval)
				this.footer.interval = setInterval(function() { self.refreshContent(self.footer) }, 1000)
			}
		}
	},

	/**
	 *
	 *  auto refresh file content if enable
	 *
	 * @param {string} zone footer or header
	 */
	refreshContent(zone) {

		let FL

		if (this.mode === 'public') {
			FL = OCA.Sharing.PublicApp.fileList.files
		} else {
			FL = OCA.Files.App.fileList.files
		}

		if (zone.mtime !== FL[zone.filenum].mtime) {
			zone.mtime = FL[zone.filenum].mtime
			this.fillContainer(zone)
		}
	},

	/**
	 * show contenair
	 *
	 * @param {string} zone footer or header
	 */
	createContainer(zone) {

		const el = document.createElement('div')
		zone.container = el

		if (zone.position === 'before') {
			el.id = 'app-content-headerMD'
			el.classList.add('hidden')
			el.classList.add('markdown-body')
			el.classList.add('headermd')

			document.querySelector(this.contenairParent + ' .filelist-header').after(el)
		}

		if (zone.position === 'after') {
			el.id = 'app-content-readmeMD'
			el.classList.add('hidden')
			el.classList.add('markdown-body')
			el.classList.add('readmemd')
			el.classList.add('yellowish')

			document.querySelector(this.contenairParent + ' .filelist-footer').before(el)

		}
	},

	/**
	 * fill container
	 *
	 * @param {string} zone footer or header
	 */
	fillContainer(zone) {

		const self = this
		let dir
		let URL

		if (this.mode === 'public') {
			const token = document.getElementById('sharingToken').value
			dir = OCA.Sharing.PublicApp.fileList._currentDirectory
			URL = generateUrl('/s/{token}/download?path={path}&files={file}',
				{
					token,
				  path: dir,
				  file: zone.filename,
				},
			)
		} else {
			dir = OCA.Files.App.fileList._currentDirectory.replace('?', '%3F')
			const fname = zone.filename.replace('?', '%3F')
			URL = OC.linkToRemoteBase('files' + dir + '/' + fname)
		}
		// load header file via remote call apps
		axios.get(URL)
			.then(function(data) {
				// promise solved -> render MarkDown
				zone.content = data.data
				self.render(zone)
			})
	},

	/**
	 * Render Markdown
	 *
	 * @param {string} zone footer or header
	 */
	render(zone) {
		// render MD

		const self = this
		let dir

		// check which engine to run
		const ext = zone.filename.substr(zone.filename.lastIndexOf('.') + 1)

		if (ext === 'html' && this.show_html === 'true') {
			zone.container.innerHTML = zone.content
			document.querySelector(self.contenairParent + ' .files-filestable > tfoot > tr').style.height = 'auto'
		}

		if (ext === 'adoc' && this.show_asciidoc === 'true') {
			import(/* webpackChunkName: "asciidoctor" */ 'asciidoctor').then(Aconverter => {
				console.debug('ReadMeMD : asciidoctor loaded')
				const converter = Aconverter.default()
				zone.container.innerHTML = converter.convert(zone.content)
				document.querySelector(self.contenairParent + ' .files-filestable > tfoot > tr').style.height = 'auto'
			})

		}

		if (ext === 'md' || ext === 'markdown') {
			import(/* webpackChunkName: "markdown-it" */ 'markdown-it').then(MDconverter => {
				const converter = MDconverter.default({
					replaceLink(link, env) {
						if (link.startsWith('mailto:') || link.startsWith('http://') || link.startsWith('https://') || link.startsWith(generateUrl('core/preview'))) {
							return link
						} else {
							if (self.mode === 'public') {
								const token = document.getElementById('sharingToken').value
								dir = OCA.Sharing.PublicApp.fileList._currentDirectory
								return generateUrl('/s/{token}/download?path={path}&files={file}', { token, path: dir, file: link })
							} else {
								dir = OCA.Files.App.fileList._currentDirectory
								if (link.startsWith('/')) {
									dir = ''
								}
								return OC.linkToRemoteBase('files' + dir + '/' + link)
							}
						}
					},
				})
					.use(require('markdown-it-task-lists'), { enabled: true })
					.use(require('markdown-it-replace-link'))
					.use(require('markdown-it-imsize'))
					.use(require('markdown-it-anchor').default)
					.use(require('markdown-it-toc-done-right').default)

				// code from markdown-it documentation
				// Remember old renderer, if overridden, or proxy to default renderer
				const defaultRender = converter.renderer.rules.link_open || function(tokens, idx, options, env, self) {
					return self.renderToken(tokens, idx, options)
			  }

				converter.renderer.rules.link_open = function(tokens, idx, options, env, self) {
				// If you are sure other plugins can't add `target` - drop check below
					const aIndex = tokens[idx].attrIndex('target')

					if (aIndex < 0) {
						tokens[idx].attrPush(['target', '_blank']) // add new attribute
					} else {
						tokens[idx].attrs[aIndex][1] = '_blank' // replace value of existing attr
					}

					// pass token to default renderer.
					return defaultRender(tokens, idx, options, env, self)
			  }

				this.loadAdditionnalMDPlugins(zone, converter)
					.then(function() {
						zone.container.innerHTML = converter.render(zone.content)
						// Disabling checkboxs
						const checkboxs = zone.container.querySelectorAll('input[type=checkBox');
						[].forEach.call(checkboxs, (cb) => {
							cb.onclick = function() { return false }
						})
						document.querySelector(self.contenairParent + ' .files-filestable > tfoot > tr').style.height = 'auto'
					})

			})
		}

	},

	/**
	 * load large MD plugins only when needed
	 *
	 * @param {string} zone footer or header
	 * @param {object} converter MarkdownIt main renderer
	 */
	loadAdditionnalMDPlugins(zone, converter) {

		const promiseList = []

		/** highlightjs */
		if (zone.content.indexOf('```') !== -1) {
			promiseList.push(import(/* webpackChunkName: "m-it-highlightjs" */ 'markdown-it-highlightjs').then(module => {
				import(/* webpackChunkName: "m-it-highlightjs-css" */ 'highlight.js/styles/github.css')
				converter.use(module.default)
				console.debug('ReadMeMD : highlightjs loaded')
			}))
		}

		/** Mermaid */
		if (zone.content.match(/(gantt|sequenceDiagram|graph (?:TB|BT|RL|LR|TD))/) !== null) {
			promiseList.push(import(/* webpackChunkName: "m-it-mermaid" */ '@wekanteam/markdown-it-mermaid').then(module => {
				converter.use(module.default)
				console.debug('ReadMeMD : Mermaid loaded')
			}))
		}

		/** Latex */
		 if (zone.content.indexOf('$') !== -1) {
			promiseList.push(import(/* webpackChunkName: "katex" */ 'katex'))
			promiseList.push(import(/* webpackChunkName: "m-it-katex" */ '@vscode/markdown-it-katex').then(module => {
				converter.use(module.default)
				console.debug('ReadMeMD : Katex loaded')
			}))
		}

		return Promise.all(promiseList)

	},
}

OCA.ReadmeMD = OCA.ReadmeMD.App

__webpack_nonce__ = btoa(OC.requestToken) 			 // eslint-disable-line
__webpack_public_path__ = OC.linkTo('files_readmemd', 'js/') // eslint-disable-line

document.addEventListener('DOMContentLoaded', () => {

	let mode
	let contenairParent

	// Don't load if not in the files app
	const fileapp = document.getElementById('app-content-files')
	if (typeof (fileapp) !== 'undefined' && fileapp !== null) {
		mode = 'private'
		contenairParent = '#app-content-files'
	} else {
		const fileshare = document.getElementsByClassName('files-public-content')
		if (typeof (fileshare) !== 'undefined' && fileshare !== null) {
			mode = 'public'
			contenairParent = '#files-public-content'
		} else {
			return
		}
	}

	const header = {
		position: 'before',
		filename: null,
		filenames: null,
		content: null,
	}

	const footer = {
		position: 'after',
		filename: null,
		filenames: null,
		content: null,
	}

	console.debug('OCA.ReadmeMD initializing ' + mode + ' mode ...')

	OCA.ReadmeMD.initialize(header, footer, mode, contenairParent)

})
