/**
* @namespace OCA.IndexMD
*/
OCA.ReadmeMD = {};

/**
 * @namespace OCA.IndexMD.App
 */
OCA.ReadmeMD.App = {
    /**
     * Holds the MDs objects
     */
	header: null,
    	readme: null,
    
    /**
     * Setup on page load
     */
    initialize: function (header,readme) {
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
	this.header = header;
	this.readme = readme;
	
	this.createContainer(this.header) ;
	this.createContainer(this.readme) ;
    
    },


    /**
     * check MD handler
     */
    checkMD: function() {
	OCA.ReadmeMD.header.container.addClass("hidden") ;
	OCA.ReadmeMD.readme.container.addClass("hidden") ;

	for (var filenum in  OCA.Files.App.fileList.files) {
            
	    if ( OCA.Files.App.fileList.files[filenum].name == OCA.ReadmeMD.header.filename ) { 
		OCA.ReadmeMD.header.container.removeClass("hidden") ;
		OCA.ReadmeMD.fillContainer(OCA.ReadmeMD.header) ;
	    } ;

            if ( OCA.Files.App.fileList.files[filenum].name == OCA.ReadmeMD.readme.filename ) { 
		OCA.ReadmeMD.readme.container.removeClass("hidden") ;
		OCA.ReadmeMD.fillContainer(OCA.ReadmeMD.readme) ;
	    } ;
	   
	 } ;

    },

    /**
     * show contenair
     */
   createContainer: function(zone) {
	   
	 if (zone.position == "before")
	   { $('#filestable').before(zone.container)  ; }

	 if (zone.position == "after")
	   { $('#filestable').after(zone.container) ; }
   },


  /**
  * fill contant
  */
  fillContainer: function(zone) {

		dir=OCA.Files.App.fileList._currentDirectory ;i

	  	if (zone.position === "before" ) {
			$.get(
				OC.generateUrl('/apps/files_texteditor/ajax/loadfile'),
				{
					filename: zone.filename,
					dir: dir
				}
		    	).done(function(data,textStatus,jqXHR) {
				OCA.ReadmeMD.header.content=data.filecontents ;
				OCA.ReadmeMD.renderMD(OCA.ReadmeMD.header) ;
		    }) ;
		};

	  	if (zone.position === "after" ) {
			$.get(
				OC.generateUrl('/apps/files_texteditor/ajax/loadfile'),
				{
					filename: zone.filename,
					dir: dir
				}
		    	).done(function(data,textStatus,jqXHR) {
				OCA.ReadmeMD.readme.content=data.filecontents ;
				OCA.ReadmeMD.renderMD(OCA.ReadmeMD.readme) ;
		    }) ;
	};

  },

  /**
   * Render Markdown
   **/
  renderMD: function(zone) {
	//cleanup old content
	zone.container.children().remove();
	
	//render MD
	OCA.Files_Texteditor.previewPlugins["text/markdown"].renderer.renderText(
		zone.content,
		zone.container
	).done(function(data) {
		$("#filestable > tfoot > tr").height("auto") ;
	});
   }

};


OCA.ReadmeMD = OCA.ReadmeMD.App ;

$(document).ready(function () {
	var header = {
		container: $('<div id="headerMD" class="hidden text-markdown headermd"></div>'),
		position : "before",
		filename : "HEADER.md",
		content  : null
	} ;

	var footer = {
		container: $('<div id="readmeMD" class="hidden text-markdown readmemd"></div>'),
		position : "after",
		filename : "README.md",
		content  :  null
	} ;

	OCA.ReadmeMD.initialize(header,footer);
});


