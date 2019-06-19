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

 $(document).ready(function () {

    $("#readmeMD-appearance-txt").click(function(Event){
        $.post(OC.generateUrl("apps/files_readmemd/config"),{key: "show_title", value: Event.target.checked})
            .success(function (json) {
                        //console.log(json) ;
                })
    }) ;

    $("#readmeMD-appearance-color").click(function(Event){
        $.post(OC.generateUrl("apps/files_readmemd/config"),{key: "yellow_back", value: Event.target.checked})
            .success(function (json) {
                        //console.log(json) ;
                })
    }) ;

    $("#readmeMD-appearance-refresh").click(function(Event){
        $.post(OC.generateUrl("apps/files_readmemd/config"),{key: "auto_refresh", value: Event.target.checked})
            .success(function (json) {
                        //console.log(json) ;
                })
    }) ;

    $("#readmeMD-engine-asciidoc").click(function(Event){
        $.post(OC.generateUrl("apps/files_readmemd/config"),{key: "show_asciidoc", value: Event.target.checked})
            .success(function (json) {
                        //console.log(json) ;
                })
    }) ;

    $("#readmeMD-engine-html").click(function(Event){
        $.post(OC.generateUrl("apps/files_readmemd/config"),{key: "show_html", value: Event.target.checked})
            .success(function (json) {
                        //console.log(json) ;
                })
    }) ;

 }) ;