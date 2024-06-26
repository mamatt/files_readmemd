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

import { generateUrl } from '@nextcloud/router'
import axios from '@nextcloud/axios'

document.addEventListener('DOMContentLoaded', () => {

	// Engines

	document.getElementById('readmeMD-engine-asciidoc').onclick = function(Event) {
		const params = new URLSearchParams() // eslint-disable-line
		params.append('key', 'show_asciidoc')
		params.append('value', Event.target.checked)

		axios.post(
			generateUrl('apps/files_readmemd/config'),
			params,
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				},
			},
		)
			.success(function(json) {
			// console.log(json) ;
			})
	}

	document.getElementById('readmeMD-engine-html').onclick = function(Event) {
		const params = new URLSearchParams() // eslint-disable-line
		params.append('key', 'show_html')
		params.append('value', Event.target.checked)

		axios.post(
			generateUrl('apps/files_readmemd/config'),
			params,
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				},
			},
		)
			.success(function(json) {
			// console.log(json) ;
			})
	}

	// Fileslists

	// DELETE
	const els = document.getElementsByClassName('readmeMD-filelist_delete');
	[].forEach.call(els, (el) => {
		el.onclick = function(Event) {

			const fn = Event.target.dataset.filename
			const zone = Event.target.dataset.zone

			axios.delete(generateUrl('apps/files_readmemd/config/filenames/' + zone + '/' + fn.replace('?', '%3F')))
				.then(function(data) {
					const parentElement = Event.target.parentNode
					parentElement.parentNode.removeChild(parentElement)
				})
		}
	})

	// ADD

	document.getElementById('readmeMD-filelist_submit-footer').onclick = function(Event) {

		const fn = document.getElementById('readmeMD-filelist_name-footer').value
		const zone = 'footer'

		axios.put(generateUrl('apps/files_readmemd/config/filenames/' + zone + '/' + fn.replace('?', '%3F')))
			.then(function(data) {
				document.getElementById('readmeMD-filelist_footer').insertAdjacentHTML('beforeend',
					'<li class="readmeMD-filelist" id="readmeMD-filelist-' + fn + '">'
                    + '<a data-zone="footer" data-filename="' + fn + '" class="readmeMD-filelist_delete icon-inline icon icon-delete"></a>'
                    + fn + '</li>')
			})
	}

	document.getElementById('readmeMD-filelist_submit-header').onclick = function(Event) {

		const fn = document.getElementById('readmeMD-filelist_name-header').value
		const zone = 'header'

		axios.put(generateUrl('apps/files_readmemd/config/filenames/' + zone + '/' + fn.replace('?', '%3F')))
			.then(function(data) {
				document.getElementById('readmeMD-filelist_header').insertAdjacentHTML('beforeend',
					'<li class="readmeMD-filelist" id="readmeMD-filelist-' + fn + '">'
                    + '<a data-zone="header" data-filename="' + fn + '" class="readmeMD-filelist_delete icon-inline icon icon-delete"></a>'
                    + fn + '</li>')
			})
	}

})
