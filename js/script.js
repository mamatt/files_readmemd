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

	var self = this ;

        // Don't load if not in the files app
        if (!$('#content.app-files').length) {
            return;
        }

	//Don't load if the markdown apps is not present
	if (! OCA.Files_Texteditor.previewPlugins["text/markdown"]) {
	    console.error('MarkDown Apps not available !') ;
	    return;
	}

	// container creation
	this.header = header;
	this.readme = readme;
	
	this.createContainer(this.header) ;
	this.createContainer(this.readme) ;

	//initialise MD renderer
	this.PromiseMDinit = OCA.Files_Texteditor.previewPlugins["text/markdown"].init()

	// then trigger on filetable to check if README/HEADER are present
        $("#filestable") .on('updated',function() { self.checkMD() ; })	    
	    
	    
	//trigger on multiselect to handle the infamous fixed position toolsbar
	$("#filestable").on('updated',function() {	
		$("#filestable input:checkbox").change(function() {
				self.handleMultiselect() ;
		});

	});

    },


    /**
     * check MD handler
     */
    checkMD: function() {

	//cleanup "old" MDs before checking for new ones
	this.header.container.addClass("hidden")  ;
	this.header.container.children().remove() ;
	this.header.content= null ;
	
        this.readme.container.addClass("hidden")  ;
        this.readme.container.children().remove() ;
	this.readme.content = null ;

	//list file from current dir and check     
	for (var filenum in  OCA.Files.App.fileList.files) {
            
	    if ( OCA.Files.App.fileList.files[filenum].name == this.header.filename ) { 
		this.header.container.removeClass("hidden") ;
		this.fillContainer(OCA.ReadmeMD.header) ;
	    } ;

            if ( OCA.Files.App.fileList.files[filenum].name == this.readme.filename ) { 
		this.readme.container.removeClass("hidden") ;
		this.fillContainer(OCA.ReadmeMD.readme) ;
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
	
	var self=this ;

	dir=OCA.Files.App.fileList._currentDirectory ;
	//load header file via texteditor apps 
		$.get(
			OC.generateUrl('/apps/files_texteditor/ajax/loadfile'),
			{
				filename: zone.filename,
				dir: dir
			}
	    	).done(function(data) {
			//promise solved -> render MarkDown
			zone.content=data.filecontents ;
			self.renderMD(zone) ;
	        }) ;
  },

  /**
   * Render Markdown
   **/
  renderMD: function(zone) {
	//render MD
		OCA.Files_Texteditor.previewPlugins["text/markdown"].renderer.renderText(
			zone.content,
			zone.container
		).done(function(data) {
			$("#filestable > tfoot > tr").height("auto") ;
		});
   },

  /**
   * Handle Multiselect
   **/
  handleMultiselect: function() {
	  // on checkbox change on filestable, check the multiselect class to hide header
	  // and move footer 70px down, see css
	  if ($("#filestable input:checked").size() > 0 ) {
		  this.header.container.addClass("hidden") ;
		  this.readme.container.addClass("down")   ;
	  } else {
		 if (this.header.content != null) {
		 	this.header.container.removeClass("hidden") ;
		 }
		 this.readme.container.removeClass("down") ;
	  }
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


