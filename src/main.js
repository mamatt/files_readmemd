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

 
/**
* @namespace OCA.ReadmeMD
*/
OCA.ReadmeMD = {};

/**
 * @namespace OCA.ReadmeMD.App
 */
OCA.ReadmeMD.App = {
    
	/**
	 * Setup on page load
	 */
	initialize: function (header,footer,mode) {

		var self = this ;

		//public share or private view
		this.mode = mode ;

		// container creation
		this.header = header;
		this.footer = footer;
		
		this.createContainer(this.header) ;
		this.createContainer(this.footer) ;

		//get the config
		//then setup the trigger on filetable
		this.getConfig()
			.then(function() {
				$("#filestable").on('updated',function() { self.checkMD() ; }) ;
			}) ;

		// Mutation observer to toogle readme visibility on hide or show 
		var hideContainerOnHideObserver = new MutationObserver(function(mutations) { self.callBackToggleContainer(mutations,"hide") }) ;
		var hideContainerOnShowObserver = new MutationObserver(function(mutations) { self.callBackToggleContainer(mutations,"show") }) ;

		// only in private mode
		if (this.mode == 'private') {
			//hide on showing trash / favorite / recent  / share ...
			hideContainerOnHideObserver.observe($('#app-content-files')[0],{attributes: true}) ;

			// this is a different for search as we doesn't toogle on hide but on show		
			//hideContainerOnShowObserver.observe($('div.nofilterresults')[0],{attributes: true }) ;
			hideContainerOnShowObserver.observe($('#searchresults')[0],{attributes: true}) ;
		
			// this one is for mindmap or all other "fullscreen" apps
			hideContainerOnHideObserver.observe($('#filestable')[0],{attributes: true }) ;
		} ;

	},

	/**
	 *  get the config from DB
	 */
	getConfig() {
		var self = this ;
		return new Promise (function (resolve, reject) {
			$.get(OC.generateUrl("apps/files_readmemd/config"))
				.done(function (json) {					
					self.show_asciidoc = json.show_asciidoc ;
					self.show_html = json.show_html ;
					self.auto_refresh = json.auto_refresh ;

					if ( json.show_title == "false") {
						self.footer.container.addClass("no-before") ;
					} ;
					
					if ( json.yellow_back == "false") {
						self.footer.container.removeClass("yellowish") ;
					}  ;

					self.fileslist_header = json.fileslist_header ;
					self.fileslist_footer = json.fileslist_footer ;
					
					resolve() ;
				}) ;
		}) ;	
	},
	
  	/**
	 *  Mutation observer Callback
	 */
	callBackToggleContainer(mutations,mode) {
		var self = this ;
		mutations.forEach(function(mutation){
				if (mutation.attributeName === 'class') {
					if (mode === "hide") {
						//mode hide
						if ($(mutation.target).hasClass("hidden")  ) {
							self.header.container.addClass("hidden") ;
							self.footer.container.addClass("hidden") ;
							$("#filestable > tfoot > tr").height("250px") ;
						} else {
							if (self.header.content !== null && window.location.search.indexOf("view") == -1) { 
								self.header.container.removeClass("hidden") ;
								$("#filestable > tfoot > tr").height("auto") ;
							} ;
							if (self.footer.content !== null && window.location.search.indexOf("view") == -1) {
								self.footer.container.removeClass("hidden") ;
								$("#filestable > tfoot > tr").height("auto") ;
							} ;
						} ;
					} else {
						//mode show
						if ($(mutation.target).hasClass("hidden") && window.location.search.indexOf("view") == -1 ) {
							if (self.header.content !== null ) { 
								self.header.container.removeClass("hidden") ;
								$("#filestable > tfoot > tr").height("auto") ;
							} ;
							if (self.footer.content !== null) {
								self.footer.container.removeClass("hidden") ;
								$("#filestable > tfoot > tr").height("auto") ;
							} ;
						} else {
							self.header.container.addClass("hidden") ;
							self.footer.container.addClass("hidden") ;
							$("#filestable > tfoot > tr").height("250px") ;
						} ;
					}
				} ;
			}) ;
	},

	/** 
	* Generate FileNames lists corresponding to configs
	**/
	generateFileNames(zone) {

		var FFNames = [] ;

		var self = this ;

		this.fileslist_footer.forEach(function(fn){
			Array.prototype.push.apply(FFNames,[
				fn+".md",
				fn+".markdown",
				"."+fn+".md",
				"."+fn+".markdown"
			])

			if (self.show_asciidoc == "true"){
				Array.prototype.push.apply(FFNames,[
					fn+".adoc",
					fn+".asciidoc",
					"."+fn+".adoc",
					"."+fn+".asciidoc"
				])
			}

			if (self.show_html == "true") {
				Array.prototype.push.apply(FFNames,[
					fn+".htm",
					fn+".html",
					"."+fn+".htm",
					"."+fn+".html"
				])
			}
		})

		var HFNames = [] ;
		this.fileslist_header.forEach(function(fn){
			Array.prototype.push.apply(HFNames,[
				fn+".md",
				fn+".markdown",
				"."+fn+".md",
				"."+fn+".markdown"
			])

			if (self.show_asciidoc == "true"){
				Array.prototype.push.apply(HFNames,[
					fn+".adoc",
					fn+".asciidoc",
					"."+fn+".adoc",
					"."+fn+".asciidoc"
				])
			}

			if (self.show_html == "true") {
				Array.prototype.push.apply(HFNames,[
					fn+".htm",
					fn+".html",
					"."+fn+".htm",
					"."+fn+".html"
				])
			}
		})


		if (zone == "header") { return HFNames } ;
		if (zone == "footer") { return FFNames } ;
	},


	/**
	 * check MD handler
	 */
	checkMD: function() {

		var self = this ;

		//cleanup "old" MDs before checking for new ones
		this.header.container.addClass("hidden")  ;
		this.header.container.children().remove() ;
		this.header.content= null ;

		this.footer.container.addClass("hidden")  ;
		this.footer.container.children().remove() ;
		this.footer.content = null ;

		if (this.mode == "public") {
			var FL =  OCA.Sharing.PublicApp.fileList.files ;
		}else {
			var FL =  OCA.Files.App.fileList.files ;
		}

		this.header.filenames = this.generateFileNames("header") ;
		this.footer.filenames = this.generateFileNames("footer") ;

		//list files from current dir and check 
		this.header.filename = null ;
		this.footer.filename = null ;
	
		for (var activFile in this.header.filenames ) {
			for (var filenum in  FL) {
				if ( FL[filenum].name == this.header.filenames[activFile] ) {
					this.header.filename = FL[filenum].name ;
					this.header.mtime = FL[filenum].mtime ;
					this.header.filenum= filenum ;
					} ;
			} ;
		} ;

		for (var activFile in this.footer.filenames ) {
			for (var filenum in  FL) {
				if ( FL[filenum].name == this.footer.filenames[activFile] ) {
					this.footer.filename = FL[filenum].name ;
					this.footer.mtime = FL[filenum].mtime ;
					this.footer.filenum= filenum ;

				} ;
			} ;
		} ;

		
		if (this.header.filename !== null ) {
			this.header.container.removeClass("hidden") ;
			this.fillContainer(this.header) ;

			if (this.auto_refresh == "true") {
				// clear setInterval and force a new one 
				clearInterval(this.header.interval)
				this.header.interval = setInterval(function() { self.refreshContent(self.header) ; } ,1000) ;
			} ;
		} ;

		if (this.footer.filename !== null ) {
			this.footer.container.removeClass("hidden") ;
			this.fillContainer(this.footer) ;

			if (this.auto_refresh == "true") {
				// clear setInterval and force a new one 
				clearInterval(this.footer.interval)
				this.footer.interval = setInterval(function() { self.refreshContent(self.footer) ; } ,1000) ;
			} ;
		} ;	
	},

	/**
	 * 
	 *  auto refresh file content if enable     
	 */
	refreshContent: function(zone) {

		if (this.mode == "public") {
			var FL =  OCA.Sharing.PublicApp.fileList.files ;
		}else {
			var FL =  OCA.Files.App.fileList.files ;
		}

		if (zone.mtime != FL[zone.filenum].mtime) {
			zone.mtime = FL[zone.filenum].mtime ;
			this.fillContainer(zone) ;
		} ;
	},

	/**
	 * show contenair
	 */
	createContainer: function(zone) {
		
		if (zone.position == "before")
			{ $('#filestable').before(zone.container)  ; }

		if (zone.position == "after")
			{ if (this.mode == 'private') {
				$('#app-content-files').after(zone.container) ; 
			} else {
				$('#files-public-content').after(zone.container) ; 
			}
		}
	},

	/**
	 * fill container
	 */
	fillContainer: function(zone) {
		
		var self=this ;
		
		if (this.mode == 'public') {
			var token = $('#sharingToken').val()
			var dir = OCA.Sharing.PublicApp.fileList._currentDirectory ;
			var URL = OC.generateUrl('/s/{token}/download?path={path}&files={file}',
								{	token: token, 
									path: escape(dir),
									file: escape(zone.filename)
								}
						);
		}else{
			var dir = OCA.Files.App.fileList._currentDirectory.replace("?","%3F") ;
			var fname = zone.filename.replace("?","%3F") ;
			var URL = OC.linkToRemoteBase('files'+ dir + '/' + fname ) ;
		} ;
		//load header file via remote call apps
		$.get(URL)
			.done(function(data) {
				//promise solved -> render MarkDown
				zone.content=data ;
				self.render(zone) ;
		}) ;
	},

	/**
	 * Render Markdown
	 **/
	render: function(zone) {
		//render MD
		
		var self = this ;
		
		// check which engine to run
		var ext = zone.filename.substr(zone.filename.lastIndexOf(".") + 1) ;

		if (ext == "html" && this.show_html == "true" ) {
			zone.container.html(zone.content) ;
			$("#filestable > tfoot > tr").height("auto") ;
		}

		if (ext == "adoc" && this.show_asciidoc == "true") {
			import(/* webpackChunkName: "asciidoctor" */  'asciidoctor').then( Aconverter  => {
					console.log("ReadMeMD : asciidoctor loaded") ;
					converter = Aconverter.default() ;
					zone.container.html(converter.convert(zone.content)) ;
					$("#filestable > tfoot > tr").height("auto") ;
			});

		} ; 

		if (ext == "md" || ext == "markdown") {
			import(/* webpackChunkName: "markdown-it" */  'markdown-it').then( MDconverter => {
			var converter = MDconverter.default({
							replaceLink: function(link,env){
								if ( link.startsWith('mailto:') ||  link.startsWith('http://') ||  link.startsWith('https://') || link.startsWith(OC.generateUrl('core/preview')) ){ 
										return link ; 
									} else {
										if (self.mode == 'public') {
											var token = $('#sharingToken').val()
											var dir = OCA.Sharing.PublicApp.fileList._currentDirectory ;
											return  OC.generateUrl('/s/{token}/download?path={path}&files={file}', {token: token, path: dir, file: link}) ;
										} else {
											var dir = OCA.Files.App.fileList._currentDirectory ;
											return OC.linkToRemoteBase('files') + dir + '/' + link ;
										} ;
									}
							}
						})
					.use(require('markdown-it-task-lists'), {enabled: true} )
					.use(require('markdown-it-replace-link'))
					.use(require('markdown-it-imsize')) ;

					
			this.loadAdditionnalMDPlugins(zone,converter)
				.then(function() {
					zone.container.html(converter.render(zone.content)) ;
					$("#filestable > tfoot > tr").height("auto") ;
				})

			});
		};

	},


	/**
	 * 	load large MD plugins only when needed
	 */
	loadAdditionnalMDPlugins(zone,converter) {

			promiseList = []

			/** highlightjs*/
			if (zone.content.indexOf('```') !== -1 ) {
				promiseList.push(import(/* webpackChunkName: "m-it-highlightjs" */ 'markdown-it-highlightjs').then(module => {
					converter.use(module.default) ;
					console.log("ReadMeMD : highlightjs loaded") ;
				})) ; 
			} 

			/** Mermaid */
			if (zone.content.match(/(gantt|sequenceDiagram|graph (?:TB|BT|RL|LR|TD))/) !== null ) {
				promiseList.push(import(/* webpackChunkName: "m-it-mermaid" */ 'markdown-it-mermaid-plus').then(module => {
					converter.use(module.default) ;
					console.log("ReadMeMD : Mermaid loaded") ;
				})) 
			}

			/** Latex*/
			if (zone.content.indexOf('$') !== -1 ) {
				promiseList.push(import(/* webpackChunkName: "katex" */ 'katex')) ;
				promiseList.push(import(/* webpackChunkName: "m-it-katex" */ 'markdown-it-katex').then(module => {
					converter.use(module.default) ;
					console.log("ReadMeMD : Katex loaded") ;
				})) ;
			}


			return Promise.all(promiseList) ;

	}
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
		filenames : null,
		content  : null
	} ;

	var footer = {
		container: $('<div id="app-content-readmeMD" class="hidden markdown-body readmemd yellowish"></div>'),
		position : "after",
		filename: null,
		filenames : null,
		content  :  null
	} ;

	OCA.ReadmeMD.initialize(header,footer,mode);

});


// coerce webpack into loading scripts properly
__webpack_require__.p = OC.filePath('files_readmemd', 'src', '../js/');
const script = document.querySelector('[nonce]') ;
__webpack_require__.nc = script['nonce'] || script.getAttribute('nonce');


