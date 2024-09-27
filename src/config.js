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
import Vue from 'vue'
import Config from './view/Config.vue'
import logger from './logger.js'

Vue.prototype.t = t
Vue.prototype.OC = window.OC
Vue.prototype.OCA = window.OCA

const ConfigView = Vue.extend(Config)

__webpack_nonce__ = btoa(OC.requestToken) 			 		 // eslint-disable-line
__webpack_public_path__ = OC.linkTo('files_readmemd', 'js/') // eslint-disable-line

document.addEventListener('DOMContentLoaded', () => {

	logger.info('initializing config ...')
    new ConfigView().$mount('#readmemd-settings')

})