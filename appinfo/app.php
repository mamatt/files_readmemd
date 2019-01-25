<?php
$eventDispatcher = \OC::$server->getEventDispatcher();

$eventDispatcher->addListener('OCA\Files::loadAdditionalScripts',
    function() {

	    	OCP\Util::addscript('files_readmemd', 'script');
	    	OCP\Util::addscript('files_readmemd', 'vendor/showdown.min');

		OCP\Util::addStyle('files_readmemd','style') ;
		OCP\Util::addStyle('files_readmemd','content') ;
});
