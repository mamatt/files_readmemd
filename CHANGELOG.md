## 3.0.1 XX-XX-2024
### Added
  - Provide date-file dataset
  [#160](https://github.com/mamatt/files_readmemd/issues/160)
  
## 3.0.0 28-06-2024
### Added
  - Compat with NC 28 & 29
  [#1124](https://github.com/mamatt/files_readmemd/issues/124)
  [#134](https://github.com/mamatt/files_readmemd/issues/134)

### Removed
  - Compat with pre-Vue.js versions (NC < 28)
### Changed
  - Massive rewrite to switch to Vue.js
### Fixed
  - Automatically generated ID of headers might collide with NextCloud styling rules
  [#106](https://github.com/mamatt/files_readmemd/issues/110)
## 2.0.1 15-01-2024
### Added
  - Compat with NC 26 & 27
   [#110](https://github.com/mamatt/files_readmemd/issues/110)
### Fixed
  - Multiple vulnerabilities in dependancies
### Changed
  - Update markdown CSS to handle dark mode
  
## 2.0.0 15-03-2023
### Added
 - Compat with NC 25
   [#78](https://github.com/mamatt/files_readmemd/issues/78)

### Remove
  - Compat with NC < 25

### Fixed
  - Multiple vulnerabilities in dependancies

### Changed
  - Move repository to github 

## 1.2.2 21-02-2022
### Added
 - Compat with NC 23
  [#72](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/72#)

### Fixed
 - Header/Readme not shown on public shared folder with NC 22
  [#70](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/70#)
 - Images not showing in the workspace if positioned in a different folder
  [#71](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/71#)

## 1.2.1 12-11-2021

### Added
 - Compat with NC 21 and NC 22
 [#68](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/68#)
 - Update Katex to new version
 [#61](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/61#)
 - Massive update of all libs

### Fixed
 - HEADER blocks file creation drop-down in (publicly) shared folder
 [#62](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/62#)

## 1.2.0 19-10-2020

### Added
 - Checkboxs are now readonly to avoid confusion
 [#59](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/59#)
 - Hyperlinks in Footer or Header are now opened within a new tab
 [#56](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/56#)
 - NextCloud 19 & 20 compatibility

### Changed
  - Massive JS lint
  - Remove all Jquery calls 

## 1.1.4 10-04-2020
### Fixed
 - Incorrect file name displayed
 [#44](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/44#)
 - if a folder's named as an expected filename (ie. readme.md) it triggers the plugin with an unexpected result
 [#45](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/45#)
 - Doesn't work in public shared folder
 [#48](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/48#)


### Added
 - Option to disable Nextcloud native rich workspaces
  [#41](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/41#)
 - Anchor links do not work
  [#43](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/43#)
 - Update plugins list in README.md
 - NC 18 compatibility 

## 1.1.3 25-11-2019
### Fixed
  - Folder or file name with UTf-8 characters not displaying
  [#36](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/36#)
  [#35](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/35#)
  - Image not loading when using url rewrite
  [#33](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/33#)
  - Mailto-Links aren't rendered correctly
￼  [#34](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/34#)
### Added
  - Mermaid rendering
  [#39](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/39#)
  - Latex Rendering
  [#38](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/38#)
  - Support Dark Theme
  [#37](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/37#)

## 1.1.2 18-10-2019
### Fixed
  - Image not loading when using MD produced by the new text editor
  [#33](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/33#)
  - Special characters in sharename (?) results in not found
  [#31](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/32#)
### Added
  - Compatibility with NC 17

## 1.1.1 26-07-2019
### Fixed
  - HTML and asciidoc rendering not working
  [#29](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/29#)
  - Fix Config defaults
  [#28](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/28#)

## 1.1.0 02-07-2019
### Fixed
  - Search result issue when result match both current and another folder
  [#20](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/20#)
  - NextCloud log error spamming
  [#21](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/21#)
  - Error in public page breaks edition and menu
  [#22](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/22#)
  - Fix config is not readable if not admin
  [#24](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/24#)
  [#26](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/26#)

### Added
  - New Admin section to configure some styling option, engines and fileslist
  - New AsciiDoc Engine
  - Allow HTML direct rendering (dangerous option, mind the consequences)
  - Dynamic loading of plugins via webpack
  - Ability to choose the names of the file to be rendered.
  - Auto-refresh option to refresh the content of HEADER / FOOTER whenever the files changes.
  [#5](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/5#)

## 1.0.4 03-05-2019
### Fixed
 - Fix header and footer collision with searching
   [#14](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/14#)
 - Fix Header/Footer not always hidden if there is no HEADER/README file
   [#16](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/16#)
 - Fix README or ".README" md files will not display images
   [#15](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/15#)
 - Fix public view failed to show images in 1.0.3 

### Added
 - Allow for both `.md` and `.markdown` file extensions
   [#17](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/17#)
 - Add Markdown-it plugins to handle image size, task list ...
   [#13](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/13#)

## 1.0.3 26-04-2019
### Fixed
 - Fix scroll problem with long file list
   [#12](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/12#)
 - Fix Mindmap navigation break
   [#10](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/10#)
 - Fix ui bug when using table and selecting files
   [#9](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/9#)

### Changed
 - Do not hide HEADER.md anymore when selecting file.   

## 1.0.2 09-04-2019
### Added
 - check for dot file, and prefer them ( .HEADER.md & .README.md) 
   [#4](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/4)
 - Improve CSS default
   [#7](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/7)
 - Use of webpack to minimise the apps size, and handle dependancy
 - Now render in public share
   [#8](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/8)

### Removed
 - remove all reference to markdown editor app

### Changed
 - Switched from Showdown to Markdown-it renderer to better fit to the actual markdown editor apps. 


## 1.0.1 25-01-2019
### Added
 - added a content.css file to permit an easy template usage
   [#1](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/1)
 - add a alternate markdown renderer in case Markdown app is not present
   [#2](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/2)

### Fixed
 - fix race condition when loading markdown Apps

## 1.0.0 Initial public release
