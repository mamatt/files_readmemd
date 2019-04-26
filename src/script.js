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
			
		// trigger on hide filetable to prevent showing in trash favorite recent ...
		// we need mutationobserver for that !
		var checkForContentFiles = new MutationObserver(
			function(mutations) {				
				mutations.forEach(function(mutation){
						if (mutation.attributeName === 'class') {
								if ($(mutation.target).hasClass("hidden")) {
									self.header.container.addClass("hidden") ;
									self.readme.container.addClass("hidden") ;
								} else {
									self.header.container.removeClass("hidden") ;
									self.readme.container.removeClass("hidden") ;
								}
						}
				});
			}
		) ;

		checkForContentFiles.observe($('#app-content-files')[0],{
					attributes: true
		}) ;

		var checkForFilestable = new MutationObserver(
			function(mutations) {				
				mutations.forEach(function(mutation){
						if (mutation.attributeName === 'class') {
								if ($(mutation.target).hasClass("hidden")) {
									self.header.container.addClass("hidden") ;
									self.readme.container.addClass("hidden") ;
								} else {
									self.header.container.removeClass("hidden") ;
									self.readme.container.removeClass("hidden") ;
								}
						}
				});
			}
		) ;

		checkForFilestable.observe($('#app-content-files')[0],{
					attributes: true
		}) ;
		
			/* // trigger on data-mtime change for README & HEADER
					var checkForMtime = new MutationObserver(
						function(mutations) {
							//console.log(mutations) ;
							mutations.forEach(function(mutation){
								console.log(mutation) ;
								console.log(mutation.attributeName)
								if (mutation.attributName === 'data-mtime') 
								{
									console.log("Reload README") ;
								}
							})
						}
					) ;

				checkForMtime.observe($('#filestable')[0],{
					subtree: true,
					attributes: true,
					attributeFilter: ["data-mtime"]
				})  ;
	     */
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
		for (var filenum in  FL ) {
							
			if ( FL[filenum].name == this.header.filename ) { 
				this.header.container.removeClass("hidden") ;
				this.fillContainer(OCA.ReadmeMD.header) ;
			} ;

			if ( FL[filenum].name == this.readme.filename ) { 
				this.readme.container.removeClass("hidden") ;
				this.fillContainer(OCA.ReadmeMD.readme) ;
			} ;

			//also check for dot files an prefer them.
			if ( FL[filenum].name == "." + this.header.filename ) {
				this.header.filename = "." +this.header.filename ;
				this.header.container.removeClass("hidden") ;
				this.fillContainer(OCA.ReadmeMD.header) ;
			} ;

			if ( FL[filenum].name == "." + this.readme.filename ) {
				this.readme.filename = "." +this.readme.filename ;
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
		filename : "HEADER.md",
		content  : null
	} ;

	var footer = {
		container: $('<div id="app-content-readmeMD" class="hidden markdown-body readmemd"></div>'),
		position : "after",
		filename : "README.md",
		content  :  null
	} ;

	OCA.ReadmeMD.initialize(header,footer,mode);

});


