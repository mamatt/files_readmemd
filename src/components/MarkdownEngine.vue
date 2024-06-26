<!--
  - SPDX-FileCopyrightText: Matthieu Le Corre <matthieu.lecorre@univ-nantes.fr>
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div ref="container" class="markdown-body" v-html="renderedContent" /> <!-- eslint-disable-line -->
</template>

<script>
import { generateUrl } from '@nextcloud/router'
import logger from '../logger.js'
import markdownit from 'markdown-it'
import markdownitcontainer from 'markdown-it-container'
import markdownittasklist from 'markdown-it-task-lists'
import implicitFigures from 'markdown-it-image-figures'
import markdownitimsize from 'markdown-it-imsize'
import markdownitanchor from 'markdown-it-anchor'
import markdownittocdoneright from 'markdown-it-toc-done-right'
import markdownitreplacelink from 'markdown-it-replace-link'
import { full as markdownitemoji } from 'markdown-it-emoji'

export default {
	name: 'MarkdownEngine',
	props: {
		content: {
			type: String,
			default: '',
		},
		mode: {
			type: String,
			default: 'private',
		},
		path: {
			type: String,
			default: '',
		},
	},

	computer: {
		isDarkTheme() {
			import('github-markdown-css/github-markdown-dark.css')
			return document.body.dataset.themes.startsWith('dark')
		},
		isDefaultTheme() {
			import('github-markdown-css/github-markdown.css')
			return document.body.dataset.themes === 'default'
		},

		isLightTheme() {

		},
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

		const slugify = (s) => 'md-' + encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'))

		this.converter = markdownit({ html: false, breaks: true, linkify: true, typographer: true })
			.enable('strikethrough')
	        .enable('table')
			.use(markdownitcontainer, 'info')
			.use(markdownitcontainer, 'warn')
			.use(markdownitcontainer, 'error')
			.use(markdownitcontainer, 'success')
			.use(markdownittasklist, { enabled: true })
	        .use(implicitFigures)
			.use(markdownitimsize)
			.use(markdownitemoji)
			.use(markdownitanchor, { slugify })
			.use(markdownittocdoneright)
			.use(markdownitreplacelink, {
				 replaceLink: (link, env) => {
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

		// now choose the right CSS
		if (this.mode === "private") {
			if (document.body.dataset.themes.startsWith('dark')) {
				import('github-markdown-css/github-markdown-dark.css')
			}

			if (document.body.dataset.themes.startsWith('light')) {
				import('github-markdown-css/github-markdown-light.css')
			}

			if (document.body.dataset.themes === 'default') {
				import('github-markdown-css/github-markdown.css')
			}
		} else {
			import('github-markdown-css/github-markdown.css')
		}

		logger.debug('Markdown engine loaded')

	},

	updated() {
		this.forceCheckBox()
	},

	methods: {

		async renderMD() {

			await this.loadAdditionnalMDPlugins(this.converter)
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

		forceCheckBox() {
			const checkboxs = this.$refs.container.querySelectorAll('input[type=checkbox]');
			[].forEach.call(checkboxs, (cb) => {
				cb.onclick = function() { return false }
			})
		},
	},

}
</script>

<style>
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

.markdown-body .info {
    background-color: var(--callout-background, var(--color-background-hover));
    border-left: 10px solid var(--color-info) ;
    padding: 1em ;
    margin: 1em ;
    border-radius: var(--border-radius)
}

.markdown-body .warn {
    background-color: var(--callout-background, var(--color-background-hover));
    border-left: 10px solid var(--color-warning) ;
    padding: 1em ;
    margin: 1em ;
    border-radius: var(--border-radius)
}

.markdown-body .error {
    background-color: var(--callout-background, var(--color-background-hover));
    border-left: 10px solid var(--color-error) ;
    padding: 1em ;
    margin: 1em ;
    border-radius: var(--border-radius)
}

.markdown-body .success {
    background-color: var(--callout-background, var(--color-background-hover));
    border-left: 10px solid var(--color-success) ;
    padding: 1em ;
    margin: 1em ;
    border-radius: var(--border-radius)
}

</style>
