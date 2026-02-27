/**
 *  - SPDX-FileCopyrightText: Matthieu Le Corre <matthieu.lecorre@univ-nantes.fr>
 *  - SPDX-License-Identifier: AGPL-3.0-or-later
 */

import Vue from 'vue'
import Readmemd from './view/Readmemd.vue'
import logger from './logger.js'

const ReadmemdView = Vue.extend(Readmemd)

__webpack_nonce__ = btoa(OC.requestToken) 			 		 // eslint-disable-line
__webpack_public_path__ = OC.linkTo('files_readmemd', 'js/') // eslint-disable-line

document.addEventListener('DOMContentLoaded', () => {
	logger.info('Initializing for public page ...')
	const waitForPublicFileList = () => new Promise((resolve, reject) => {
		let retries = 0
		const maxRetries = 30
		const interval = setInterval(() => {
			const publicApp = window.OCA?.Sharing?.PublicApp
			const fileList = publicApp?.fileList
			const isReady = Array.isArray(fileList?.files)
			if (isReady) {
				clearInterval(interval)
				resolve(fileList)
				return
			}
			retries += 1
			if (retries >= maxRetries) {
				clearInterval(interval)
				reject(new Error('Public file list is not available'))
			}
		}, 500)
	})

	waitForPublicFileList().then((fileList) => {
		logger.info('File table is ready')
		let headerElement
		if (!document.querySelector('.headermd')) {
			headerElement = document.createElement('div')
			document.querySelector('.filelist-header')?.append(headerElement)
		} else {
			headerElement = document.querySelector('.headermd')
		}

		const HeaderView = new ReadmemdView({
			data: {
				name: 'readmemd-header',
				zone: 'headermd',
				path: fileList._currentDirectory || '/',
			},
		})

		let footerElement
		if (!document.querySelector('.footermd')) {
			footerElement = document.createElement('div')
			document.querySelector('.filelist-footer')?.append(footerElement)
		} else {
			footerElement = document.querySelector('.footermd')
		}

		const FooterView = new ReadmemdView({
			data: {
				name: 'readmemd-footer',
				zone: 'footermd',
				path: fileList._currentDirectory || '/',
			},
		})

		if (headerElement) {
			HeaderView.$mount(headerElement)
		}
		if (footerElement) {
			FooterView.$mount(footerElement)
		}
	}).catch((error) => {
		logger.error('Could not initialize public view rendering', { error })
	})
})
