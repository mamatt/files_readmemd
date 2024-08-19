<!--
  - SPDX-FileCopyrightText: Matthieu Le Corre <matthieu.lecorre@univ-nantes.fr>
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div v-if="fileName !== null && fileName!== undefined" :class="[ zone ]" :data-filename="fileName">
		<MarkdownEngine v-if="engineType == 'markdown'"
			:content="content"
			:mode="mode"
			:path="path" />
		<HtmlEngine v-if="engineType == 'html'" :content="content" />
		<AsciidocEngine v-if="engineType == 'asciidoc'" :content="content" />
	</div>
</template>

<script>
import MarkdownEngine from '../components/MarkdownEngine.vue'
import HtmlEngine from '../components/HtmlEngine.vue'
import AsciidocEngine from '../components/AsciidocEngine.vue'
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import logger from '../logger.js'
import { loadState } from '@nextcloud/initial-state'

export default {
	name: 'Readmemd',

	components: {
		MarkdownEngine,
		HtmlEngine,
		AsciidocEngine,
	},

	data() {
		return {
			config: loadState('files_readmemd', 'config'),
			fileName: null,
			fileTableView: {},
			path: null,
			content: null,
		}
	},

	computed: {
		engineType() {
			const ext = this.fileName.substr(this.fileName.lastIndexOf('.') + 1)
			if ((ext === 'html' || ext === 'htm') && this.config.show_html === 'true') { return 'html' }
			if ((ext === 'adoc' || ext === 'asciidoc') && this.config.show_asciidoc === 'true') { return 'asciidoc' }
			if (ext === 'md' || ext === 'markdown') { return 'markdown' }
			return 'Unsupported Engine'
		},

		fileList() {
			if (this.zone === 'footermd') {
				const FFNames = []
				this.config.fileslist_footer.forEach((fn) => {
					Array.prototype.push.apply(FFNames, [
						fn + '.md',
						fn + '.markdown',
						'.' + fn + '.md',
						'.' + fn + '.markdown',
					])

					if (this.config.show_asciidoc === 'true') {
						Array.prototype.push.apply(FFNames, [
							fn + '.adoc',
							fn + '.asciidoc',
							'.' + fn + '.adoc',
							'.' + fn + '.asciidoc',
						])
					}

					if (this.config.show_html === 'true') {
						Array.prototype.push.apply(FFNames, [
							fn + '.htm',
							fn + '.html',
							'.' + fn + '.htm',
							'.' + fn + '.html',
						])
					}
				})
				return FFNames
			} else {
				const HFNames = []
				this.config.fileslist_header.forEach((fn) => {
					Array.prototype.push.apply(HFNames, [
						fn + '.md',
						fn + '.markdown',
						'.' + fn + '.md',
						'.' + fn + '.markdown',
					])

					if (this.config.show_asciidoc === 'true') {
						Array.prototype.push.apply(HFNames, [
							fn + '.adoc',
							fn + '.asciidoc',
							'.' + fn + '.adoc',
							'.' + fn + '.asciidoc',
						])
					}

					if (this.config.show_html === 'true') {
						Array.prototype.push.apply(HFNames, [
							fn + '.htm',
							fn + '.html',
							'.' + fn + '.htm',
							'.' + fn + '.html',
						])
					}
				})
				return HFNames
			}
		},

		mode() {
			const IS_PUBLIC = !!(document.getElementById('isPublic'))

			if (IS_PUBLIC) {
				return 'public'
			} else {
				return 'private'
			}
		},

	},

	watch: {
		async path() {
			this.content = await this.fillContent()
			this.adjustCSS()
		},
	},

	async mounted() {
		this.content = await this.fillContent()
		this.adjustCSS()
	},

	methods: {
		adjustCSS() {

			let container

			if (this.mode === 'private') {
				container = '.files-list'
			} else {
				container = '#files-public-content > #preview'
			}
			document.querySelector(container).style.setProperty('overflow', 'unset')
			document.querySelector(container + ' > table > tbody').style.setProperty('min-height', 'unset')
			document.querySelector(container + ' > table > tfoot').style.setProperty('min-height', 'unset')
			document.querySelector(container + ' > table > tfoot').style.setProperty('height', '65px')
			document.querySelector(container + ' > table > tfoot > tr').style.setProperty('height', '65px')
		},

		async fillContent() {
			// find a file in current dir that match one from filelist above
			this.fileName = null
			this.fileName = await this.getElectedFileName()
			logger.debug('[' + this.zone + '] File elected : ' + this.fileName + ' for path ' + this.path)
			// if we've got a candidate then let's use it
			if (this.fileName !== null && this.fileName !== undefined) {
				logger.debug('[' + this.zone + '] File elected : ' + this.fileName + ' for path ' + this.path)
				return await this.getFile()
			} else {
				logger.debug('[' + this.zone + '] No File elected : for path ' + this.path)
				return null
			}
		},

		async getElectedFileName() {

			let FL

			if (this.mode === 'public') {
				logger.debug('Mode public')
				const contents = OCA.Sharing.PublicApp.fileList.files
				FL = contents.map((file) => { if (file.type === 'file') { return file.name } else { return undefined } })
			} else {
				logger.debug('Mode private')
				const { contents } = await this.fileTableView.getContents(this.path)
				FL = contents.map((file) => { if (file.type === 'file') { return file.basename } else { return undefined } })
			}

			let result

			for (const activFile in this.fileList) {
				for (const filenum in FL) {
					if (FL[filenum] === this.fileList[activFile]) {
						result = FL[filenum]
					}
				}
			}
			return result
		},

		async getFile() {
			let URL

			if (this.mode === 'public') {
				const token = document.getElementById('sharingToken').value

				URL = generateUrl('/s/{token}/download?path={path}&files={file}',
					{
						token,
						path: this.path,
						file: this.fileName,
					},
				)
			} else {
				const dir = this.path.replace('?', '%3F')
				const fname = this.fileName.replace('?', '%3F')
				URL = OC.linkToRemoteBase('files' + dir + '/' + fname)
			}

			const response = await axios.get(URL)
			return response.data
		},
	},
}

</script>

<style scoped>
.footermd {
	padding: 1em ;
	border-top: 1px solid silver ;
	margin-top: 1em ;
	text-align: initial ;
}

.headermd {
	padding: 1em ;
	border-bottom: 1px solid silver ;
	text-align: initial ;
	z-index: 59 ;
}

</style>
