!function(e){var a={};function t(n){if(a[n])return a[n].exports;var r=a[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=a,t.d=function(e,a,n){t.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,a){if(1&a&&(e=t(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var r in e)t.d(n,r,function(a){return e[a]}.bind(null,r));return n},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},t.p="",t(t.s=132)}({132:function(e,a){
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
$(document).ready((function(){$("#readmeMD-appearance-txt").click((function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"show_title",value:e.target.checked}).success((function(e){}))})),$("#readmeMD-appearance-color").click((function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"yellow_back",value:e.target.checked}).success((function(e){}))})),$("#readmeMD-appearance-refresh").click((function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"auto_refresh",value:e.target.checked}).success((function(e){}))})),$("#readmeMD-appearance-workspace").click((function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"disable_workspace",value:e.target.checked}).success((function(e){}))})),$("#readmeMD-engine-asciidoc").click((function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"show_asciidoc",value:e.target.checked}).success((function(e){}))})),$("#readmeMD-engine-html").click((function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"show_html",value:e.target.checked}).success((function(e){}))})),$(".readmeMD-filelist_delete").on("click",(function(e){var a=this,t=e.target.dataset.filename,n=e.target.dataset.zone;$.ajax({url:OC.generateUrl("apps/files_readmemd/config/filenames/"+n+"/"+t.replace("?","%3F")),type:"DELETE",success:function(e){$(a).parent().remove()}})})),$("#readmeMD-filelist_submit-footer").on("click",(function(e){var a=$("#readmeMD-filelist_name-footer")[0].value;$.ajax({url:OC.generateUrl("apps/files_readmemd/config/filenames/footer/"+a.replace("?","%3F")),type:"PUT",success:function(e){$("#readmeMD-filelist_footer").append('<li class="readmeMD-filelist" id="readmeMD-filelist-'+a+'"><a data-zone="footer" data-filename="'+a+'" class="readmeMD-filelist_delete icon-inline icon icon-delete"></a>'+a+"</li>")}})})),$("#readmeMD-filelist_submit-header").on("click",(function(e){var a=$("#readmeMD-filelist_name-header")[0].value;$.ajax({url:OC.generateUrl("apps/files_readmemd/config/filenames/header/"+a.replace("?","%3F")),type:"PUT",success:function(e){$("#readmeMD-filelist_header").append('<li class="readmeMD-filelist" id="readmeMD-filelist-'+a+'"><a data-zone="header" data-filename="'+a+'" class="readmeMD-filelist_delete icon-inline icon icon-delete"></a>'+a+"</li>")}})}))}))}});
//# sourceMappingURL=config.js.map