## 1.0.2 09-04-2019
### Added
 - check for dot file, and prefer them ( .HEADER.md & .README.md) 
   [#4](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/4)
 - Improve CSS default
   [#7](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/7)
 - Use of webpack to minimise the apps size, and handle dependancy
 - Now render in public share
   [#8](https://gitlab.univ-nantes.fr/uncloud/files_readmemd/issues/7)

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
