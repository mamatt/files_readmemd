/**
* @namespace OCA.ReadmeMD
*/
OCA.ReadmeMD = {};

/**
 * @namespace OCA.ReadmeMD.App
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
	initialize: function (header,readme,mode) {

		var self = this ;

		//public share or private view
		this.mode = mode ;

		// container creation
		this.header = header;
		this.readme = readme;
		
		this.createContainer(this.header) ;
		this.createContainer(this.readme) ;

		// trigger on filetable to check if README/HEADER are present
		$("#filestable").on('updated',function() { self.checkMD() ; })
			
		// Mutation observer to toogle readme visibility on hide or show 
		var hideContainerOnHideObserver = new MutationObserver(function(mutations) { self._callBackToggleContainer(mutations,"hide") }) ;
		var hideContainerOnShowObserver = new MutationObserver(function(mutations) { self._callBackToggleContainer(mutations,"show") }) ;

		//hide on showing trash / favorite / recent  / share ...
		hideContainerOnHideObserver.observe($('#app-content-files')[0],{attributes: true}) ;

		// this one is for mindmap or all other "fullscreen" apps
		hideContainerOnHideObserver.observe($('#filestable')[0],{attributes: true }) ;

		// this is a different for search as we doesn't toogle on hide but on show
		hideContainerOnShowObserver.observe($('#searchresults')[0],{attributes: true}) ;

	},
	
  /**
	 *  Mutation observer Callback
	 */
	_callBackToggleContainer(mutations,mode) {
		var self = this ;
		mutations.forEach(function(mutation){
				if (mutation.attributeName === 'class') {
					if (mode === "hide") {
						//mode hide
						if ($(mutation.target).hasClass("hidden")) {
							self.header.container.addClass("hidden") ;
							self.readme.container.addClass("hidden") ;
						} else {
							if (self.header.content !== null ) { 
								self.header.container.removeClass("hidden") ;
							} ;
							if (self.readme.content !== null) {
								self.readme.container.removeClass("hidden") ;
							} ;
						} ;
					} else {
						//mode show
						if ($(mutation.target).hasClass("hidden")) {
							if (self.header.content !== null ) { 
								self.header.container.removeClass("hidden") ;
							} ;
							if (self.readme.content !== null) {
								self.readme.container.removeClass("hidden") ;
							} ;
						} else {
							self.header.container.addClass("hidden") ;
							self.readme.container.addClass("hidden") ;
						} ;
					}
				} ;
			}) ;
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

		if (this.mode == "public") {
			var FL =  OCA.Sharing.PublicApp.fileList.files ;
		}else {
			var FL =  OCA.Files.App.fileList.files ;
		}

		//list file from current dir and check 
		var foundHD = null ;
		var foundRM = null ; 
	
		for (var activFile in this.header.filenames ) {
			for (var filenum in  FL) {
				if ( FL[filenum].name == this.header.filenames[activFile] ) {
						foundHD = FL[filenum].name ;
					} ;
			} ;
		} ;

		for (var activFile in this.readme.filenames ) {
			for (var filenum in  FL) {
				if ( FL[filenum].name == this.readme.filenames[activFile] ) {
					foundRM = FL[filenum].name ;
				} ;
			} ;
		} ;

		if (foundHD !== null ) {
					this.header.filename = foundHD ;
					this.header.container.removeClass("hidden") ;
					this.fillContainer(OCA.ReadmeMD.header) ;
				}

		if (foundRM !== null ) {
			this.readme.filename = foundRM ;
			this.readme.container.removeClass("hidden") ;
			this.fillContainer(OCA.ReadmeMD.readme) ;
		} ;
		
	},

	/**
	 * show contenair
	 */
	createContainer: function(zone) {
		
	if (zone.position == "before")
		{ $('#filestable').before(zone.container)  ; }

	if (zone.position == "after")
		{ $('#app-content-files').after(zone.container) ; }
	},

  /**
  * fill container
  */
  fillContainer: function(zone) {
	
	var self=this ;
	
	if (this.mode == 'public') {
		var token = $('#sharingToken').val()
		var dir = OCA.Sharing.PublicApp.fileList._currentDirectory ;
		var URL = OC.generateUrl('/s/{token}/download?path={path}&files={file}', {token: token, path: dir, file: zone.filename});
	}else{
		var dir = OCA.Files.App.fileList._currentDirectory ;
		var URL = OC.linkToRemoteBase('files'+ dir +"/" +zone.filename)
	} ;
	//load header file via remote call apps
	$.get(URL)
		.done(function(data) {
			//promise solved -> render MarkDown
			zone.content=data ;
			self.renderMD(zone) ;
	 }) ;
  },

	/**
	 * Render Markdown
	 **/
	renderMD: function(zone) {
	//render MD
	var converter = require('markdown-it')() ;
	zone.container.html(converter.render(zone.content)) ;
	$("#filestable > tfoot > tr").height("auto") ;
	},

};

OCA.ReadmeMD = OCA.ReadmeMD.App ;

$(document).ready(function () {
 	// Don't load if not in the files app
        if ($('#content.app-files').length) {
            var mode = 'private';
        } else {
		if ($('#content.app-files_sharing').length) {
            		var mode = 'public';
        	} else {
			return ;
		}
	} ;

	var header = {
		container: $('<div id="app-content-headerMD" class="hidden markdown-body headermd"></div>'),
		position : "before",
		filename: null,
		filenames : [
			"HEADER.md",
			"HEADER.markdown",
			".HEADER.md",
			".HEADER.markdown"
		],
		content  : null
	} ;

	var footer = {
		container: $('<div id="app-content-readmeMD" class="hidden markdown-body readmemd"></div>'),
		position : "after",
		filename: null,
		filenames : [
			"README.md",
			"README.markdown",
			".README.md",
			".README.markdown"
		],
		content  :  null
	} ;

	OCA.ReadmeMD.initialize(header,footer,mode);

});


