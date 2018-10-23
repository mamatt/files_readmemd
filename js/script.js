/**
* @namespace OCA.IndexMD
*/
OCA.ReadmeMD = {};

/**
 * @namespace OCA.IndexMD.App
 */
OCA.ReadmeMD.App = {
    /**
     * Holds the MD container and content
     */
    container: null,
    content: null,
    
    /**
     * Setup on page load
     */
    initialize: function (container) {
        // Don't load if not in the files app
        if (!$('#content.app-files').length) {
            return;
        }

	//Don't load if the markdown apps is not present
	if (! OCA.Files_Texteditor.previewPlugins["text/markdown"]) {
	    console.error('MarkDown Apps not available !') ;
	    return;
	}

	//initialise MD renderer
	OCA.Files_Texteditor.previewPlugins["text/markdown"].init() ;

	// trigger on filetable
	$("#filestable").on('updated',this.checkMD);

	// container creation
	this.container = container;
	this.createContainer() ;
    
    },


    /**
     * check MD handler
     */
    checkMD: function() {
	OCA.ReadmeMD.container.addClass("hidden") ;

	for (var filenum in  OCA.Files.App.fileList.files) {
            if ( OCA.Files.App.fileList.files[filenum].name == "README.md") { 
		OCA.ReadmeMD.container.removeClass("hidden") ;
		OCA.ReadmeMD.fillContainer() ;
	    } ;
	 } ;

    },

    /**
     * show contenair
     */
   createContainer: function() {
	$('#filestable').after(this.container)  ;
	
   },


  /**
  * fill contant
  */
  fillContainer: function() {

		dir=OCA.Files.App.fileList._currentDirectory ;
		filename ="README.md" ;

		$.get(
			OC.generateUrl('/apps/files_texteditor/ajax/loadfile'),
			{
				filename: filename,
				dir: dir
			}
		    ).done(function(data) {
					OCA.ReadmeMD.content=data.filecontents ;
					OCA.ReadmeMD.renderMD() ;
		    }) ;

  },

  /**
   * Render Markdown
   **/
  renderMD: function() {
	OCA.ReadmeMD.container
	     .addClass('icon-loading')
             .children().remove();

	OCA.Files_Texteditor.previewPlugins["text/markdown"].renderer.renderText(
		OCA.ReadmeMD.content,
		OCA.ReadmeMD.container
	).done(function(data) {
		$("#filestable > tfoot > tr").height("auto") ;
		OCA.ReadmeMD.container.removeClass('icon-loading') ;
	});

   }

};


OCA.ReadmeMD = OCA.ReadmeMD.App ;

$(document).ready(function () {
	OCA.ReadmeMD.initialize($('<div id="preview" class="hidden text-markdown readmemd"></div>') );
});


