<?php
$eventDispatcher = \OC::$server->getEventDispatcher();

$eventDispatcher->addListener('OCA\Files::loadAdditionalScripts',
    function() {

		OCP\Util::addscript('files_readmemd', 'script');
		OCP\Util::addStyle('files_readmemd','style') ;
});
