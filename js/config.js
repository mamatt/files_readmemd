!function(e){var t={};function n(r){if(t[r])return t[r].exports;var c=t[r]={i:r,l:!1,exports:{}};return e[r].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)n.d(r,c,function(t){return e[t]}.bind(null,c));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=26)}({26:function(e,t){
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
$(document).ready(function(){$("#readmeMD-appearance-txt").click(function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"show_title",value:e.target.checked}).success(function(e){})}),$("#readmeMD-appearance-color").click(function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"yellow_back",value:e.target.checked}).success(function(e){})}),$("#readmeMD-appearance-refresh").click(function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"auto_refresh",value:e.target.checked}).success(function(e){})}),$("#readmeMD-engine-asciidoc").click(function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"show_asciidoc",value:e.target.checked}).success(function(e){})}),$("#readmeMD-engine-html").click(function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"show_html",value:e.target.checked}).success(function(e){})})})}});
//# sourceMappingURL=config.js.map