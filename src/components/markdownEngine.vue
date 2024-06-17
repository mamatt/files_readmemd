<!--
  - SPDX-FileCopyrightText: Matthieu Le Corre <matthieu.lecorre@univ-nantes.fr>
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div ref="container" class="markdown-bod" v-html="renderedContent" />
</template>

<script>
import { generateUrl } from '@nextcloud/router'
import logger from '../logger.js'
import markdownit from 'markdown-it'
import markdownitcontainer from 'markdown-it-container'
import markdownittasklist from 'markdown-it-task-lists'
import implicitFigures from 'markdown-it-image-figures'
import markdownitMentions from 'markdown-it-mentions'
import markdownitimsize from 'markdown-it-imsize'
import markdownitanchor from 'markdown-it-anchor'
import markdownittocdoneright from 'markdown-it-toc-done-right'
import markdownitreplacelink from 'markdown-it-replace-link'

export default {
	name: 'MarkdownEngine',
	props: {
		content: String,
		mode: String,
		path: String,
	},

	data() {
		return {
			renderedContent: '',
		}
	},

	watch: {
		async content() {
			this.renderedContent = await this.renderMD()
		},
	},

	created() {
		this.converter = markdownit('commonmark', { html: false, breaks: true, linkify: true, typographer: true })
        	.enable('strikethrough')
	        .enable('table')
			.use(markdownitcontainer)
			.use(markdownittasklist, { enabled: true })
			.use(markdownitMentions)
	        .use(implicitFigures)
			.use(markdownitimsize)
			.use(markdownitanchor)
			.use(markdownittocdoneright)
			.use(markdownitreplacelink, {
				replaceLink(link, env) {
					if (link.startsWith('mailto:') || link.startsWith('http://') || link.startsWith('https://') || link.startsWith(generateUrl('core/preview'))) {
						return link
					} else {
						if (this.mode === 'public') {
							const token = document.getElementById('sharingToken').value
							return generateUrl('/s/{token}/download?path={path}&files={file}', { token, path: this.path, file: link })
						} else {
							let dir
							dir = this.path
							if (link.startsWith('/')) {
								dir = ''
							}
							return OC.linkToRemoteBase('files' + dir + '/' + link)
						}
					}
				},
			})

		const defaultRender = this.converter.renderer.rules.link_open || function(tokens, idx, options, env, self) {
			return self.renderToken(tokens, idx, options)
		}

		// force open to new tabs
		this.converter.renderer.rules.link_open = function(tokens, idx, options, env, self) {
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

	},

	methods: {

		async renderMD() {

			await this.loadAdditionnalMDPlugins(this.converter)

			// Disabling checkboxs
			const checkboxs = this.$refs.container.querySelectorAll('input[type=checkBox]');
			[].forEach.call(checkboxs, (cb) => {
				cb.onclick = function() { return false }
			})

			return this.converter.render(this.content)
		},

		async loadAdditionnalMDPlugins(converter) {

			const promiseList = []

			/** highlightjs */
			if (this.content.indexOf('```') !== -1) {
				promiseList.push(import(/* webpackChunkName: "m-it-highlightjs" */ 'markdown-it-highlightjs').then(module => {
					import(/* webpackChunkName: "m-it-highlightjs-css" */ 'highlight.js/styles/github.css')
					converter.use(module.default)
					logger.debug('highlightjs loaded')
				}))
			}

			/** Mermaid */
			if (this.content.match(/(gantt|sequenceDiagram|graph (?:TB|BT|RL|LR|TD))/) !== null) {
				promiseList.push(import(/* webpackChunkName: "m-it-mermaid" */ '@wekanteam/markdown-it-mermaid').then(module => {
					converter.use(module.default)
					logger.debug('Mermaid loaded')
				}))
			}

			/** Latex */
			if (this.content.indexOf('$') !== -1) {
				promiseList.push(import(/* webpackChunkName: "katex" */ 'katex'))
				promiseList.push(import(/* webpackChunkName: "m-it-katex" */ '@vscode/markdown-it-katex').then(module => {
					converter.use(module.default)
					logger.debug('Katex loaded')
				}))
			}

			return Promise.all(promiseList)

		},
	},

}
</script>
<style scoped>
.headermd ul,
.footermd ul
{
	list-style: initial ;
}

.headermd thead,
.footermd thead
{
	position: initial !important;
}

.markdown-body em {
	font-style:italic ;
}

.markdown-body {
    background-color: transparent ;
}

@import './../../css/content.css';
</style>
