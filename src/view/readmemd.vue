<!--
  - SPDX-FileCopyrightText: Matthieu Le Corre <matthieu.lecorre@univ-nantes.fr>
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div v-if="fileName !== null && fileName!== undefined" :class="[ zone ]">
		<markdownEngine v-if='engineType == "markdown"'
			:content="content"
			:mode="mode"
			:path="path" />
		<htmlEngine v-if='engineType == "html"' :content='content' />
		<!--asciidocEngine v-if='engineType == "asciidoc"' :content='content' /-->
	</div>
</template>

<script>
import markdownEngine from '../components/markdownEngine.vue'
import htmlEngine from '../components/htmlEngine.vue'
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import logger from '../logger.js'

export default {
	name: 'readmemd',

	components: {
		markdownEngine,
        htmlEngine,
	},

	data() {
		return {
			config: {},
			fileName: null,
			fileTableView: {},
			path: null,
			content: null,
		}
	},

	computed: {
		engineType() {
			const ext = this.fileName.substr(this.fileName.lastIndexOf('.') + 1)
			if (ext === 'html' && this.config.show_html === 'true') { return 'html' }
			if (ext === 'adoc' && this.show_asciidoc === 'true') { return 'asciidoc' }
			if (ext === 'md' || ext === 'markdown') { return 'markdown' }
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
			logger.debug('[' + this.zone + '] FileList generated')
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
            document.querySelector(".files-list").style.setProperty('overflow','unset')
            document.querySelector(".files-list > table > tfoot").style.setProperty('min-height','unset')
            document.querySelector(".files-list > table > tfoot ").style.height = '65px'
            document.querySelector(".files-list > table > tfoot > tr").style.height = '65px'
		},
	},

	async created() {
		// grab the config
		this.config = await this.getConfig()
		logger.debug('[' + this.zone + '] Config loaded')
	},

	async mounted() {
		this.content = await this.fillContent()
        document.querySelector(".files-list").style.setProperty('overflow','unset')
        document.querySelector(".files-list > table > tfoot").style.setProperty('min-height','unset')
        document.querySelector(".files-list > table > tfoot ").style.height = '65px'
        document.querySelector(".files-list > table > tfoot > tr").style.height = '65px'
	},

	methods: {
		async fillContent() {
			// find a file in current dir that match one from filelist above
			this.fileName = null
			this.fileName = await this.getElectedFileName()
			logger.debug('[' + this.zone + '] File elected : ' + this.fileName + ' for path ' + this.path)
			// if we've got a candidate then let's use it
			if (this.fileName !== null && this.fileName !== undefined) {
				return await this.getFile()
			} else {
				return null
			}
		},

		async getConfig() {
			const response = await axios.get(generateUrl('apps/files_readmemd/config'))
			return response.data
		},

		async getElectedFileName() {
			// retreive folder listing
			// TODO check public mode
			const { contents } = await this.fileTableView.getContents(this.path)
			const FL = contents.map((file) => file.basename)

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
	padding: 2em ;
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
