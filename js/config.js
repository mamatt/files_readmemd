!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=26)}({26:function(e,n){
/**
 * @author Matthieu Le Corre <matthieu.lecorre@univ-nantes.fr>
 *
 * @license GNU AGPL version 3 or any later version
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
$(document).ready(function(){$("#readmeMD-appearance-txt").click(function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"show_title",value:e.target.checked}).success(function(e){console.log(e)})}),$("#readmeMD-appearance-color").click(function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"yellow_back",value:e.target.checked}).success(function(e){console.log(e)})}),$("#readmeMD-engine-asciidoc").click(function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"show_asciidoc",value:e.target.checked}).success(function(e){console.log(e)})}),$("#readmeMD-engine-html").click(function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"show_html",value:e.target.checked}).success(function(e){console.log(e)})})})}});
//# sourceMappingURL=config.js.map