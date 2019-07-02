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

    //Appearance

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


    //Engines


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


    // Fileslists

    // DELETE
    $(".readmeMD-filelist_delete").on("click",function(Event){
        var self =this ;

       var fn = Event.target.dataset.filename ;
       var zone = Event.target.dataset.zone ;

       //console.log( "Deleting " + zone + " -> " + fn ) ;

       $.ajax({
           url:OC.generateUrl("apps/files_readmemd/config/filenames/" + zone + "/" + fn ),
           type: 'DELETE',
           success: function(data) {
               $(self).parent().remove() ;
           }
       })

    }) ;

    //ADD

    $("#readmeMD-filelist_submit-footer").on("click",function(Event){
        
        var fn = $("#readmeMD-filelist_name-footer")[0].value ;
        var zone = "footer" ;

        $.ajax({
            url:OC.generateUrl("apps/files_readmemd/config/filenames/" + zone + "/" + fn ),
            type: 'PUT',
            success: function(data) {             
                $("#readmeMD-filelist_footer").append(
                    '<li class="readmeMD-filelist" id="readmeMD-filelist-'+fn+'">'
                    +'<a data-zone="footer" data-filename="'+fn+'" class="readmeMD-filelist_delete icon-inline icon icon-delete"></a>'
                    +fn+'</li>')
            }
        })

    }) ;

    $("#readmeMD-filelist_submit-header").on("click",function(Event){
        
        var fn = $("#readmeMD-filelist_name-header")[0].value ;
        var zone = "header" ;

        $.ajax({
            url:OC.generateUrl("apps/files_readmemd/config/filenames/" + zone + "/" + fn ),
            type: 'PUT',
            success: function(data) {             
                $("#readmeMD-filelist_header").append(
                    '<li class="readmeMD-filelist" id="readmeMD-filelist-'+fn+'">'
                    +'<a data-zone="header" data-filename="'+fn+'" class="readmeMD-filelist_delete icon-inline icon icon-delete"></a>'
                    +fn+'</li>')
            }
        })

    }) ;

 }); 