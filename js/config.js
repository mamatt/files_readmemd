!function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=28)}({28:function(e,t){
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
$(document).ready((function(){$("#readmeMD-appearance-txt").click((function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"show_title",value:e.target.checked}).success((function(e){}))})),$("#readmeMD-appearance-color").click((function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"yellow_back",value:e.target.checked}).success((function(e){}))})),$("#readmeMD-appearance-refresh").click((function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"auto_refresh",value:e.target.checked}).success((function(e){}))})),$("#readmeMD-engine-asciidoc").click((function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"show_asciidoc",value:e.target.checked}).success((function(e){}))})),$("#readmeMD-engine-html").click((function(e){$.post(OC.generateUrl("apps/files_readmemd/config"),{key:"show_html",value:e.target.checked}).success((function(e){}))})),$(".readmeMD-filelist_delete").on("click",(function(e){var t=this,a=e.target.dataset.filename,n=e.target.dataset.zone;$.ajax({url:OC.generateUrl("apps/files_readmemd/config/filenames/"+n+"/"+a.replace("?","%3F")),type:"DELETE",success:function(e){$(t).parent().remove()}})})),$("#readmeMD-filelist_submit-footer").on("click",(function(e){var t=$("#readmeMD-filelist_name-footer")[0].value;$.ajax({url:OC.generateUrl("apps/files_readmemd/config/filenames/footer/"+t.replace("?","%3F")),type:"PUT",success:function(e){$("#readmeMD-filelist_footer").append('<li class="readmeMD-filelist" id="readmeMD-filelist-'+t+'"><a data-zone="footer" data-filename="'+t+'" class="readmeMD-filelist_delete icon-inline icon icon-delete"></a>'+t+"</li>")}})})),$("#readmeMD-filelist_submit-header").on("click",(function(e){var t=$("#readmeMD-filelist_name-header")[0].value;$.ajax({url:OC.generateUrl("apps/files_readmemd/config/filenames/header/"+t.replace("?","%3F")),type:"PUT",success:function(e){$("#readmeMD-filelist_header").append('<li class="readmeMD-filelist" id="readmeMD-filelist-'+t+'"><a data-zone="header" data-filename="'+t+'" class="readmeMD-filelist_delete icon-inline icon icon-delete"></a>'+t+"</li>")}})}))}))}});
//# sourceMappingURL=config.js.map