<?php
/**
 * @author 2019 Matthieu Le Corre <matthieu.lecorre@univ-nantes.fr>
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

namespace OCA\ReadmeMD\Controller ;

use OCP\AppFramework\Controller  ;
use OCA\ReadmeMD\Services\Config ;
use OCP\IRequest;

class ConfigController extends Controller {

    public function __construct($AppName, IRequest $request, Config $config ) {
        parent::__construct($AppName, $request);

        $this->config = $config;
    }
    
    /**
     * @NoAdminRequired
     * @PublicPage
    */
    public function getConfig() {
        $params = [
                "show_asciidoc" => $this->config->getAppValue("show_asciidoc"),
                    "show_html" => $this->config->getAppValue("show_html")    ,
                  "yellow_back" => $this->config->getAppValue("yellow_back")  ,
                   "show_title" => $this->config->getAppValue("show_title")   ,
                 "auto_refresh" => $this->config->getAppValue("auto_refresh") ,
            "disable_workspace" => $this->config->getAppValue("disable_workspace") ,
             "fileslist_header" => json_decode($this->config->getAppValue('fileslist_header')),
             "fileslist_footer" => json_decode($this->config->getAppValue('fileslist_footer'))
        ];
        return $params ;
    }

    public function setConfig($key,$value) {
        $this->config->setAppValue($key,$value)  ;

        return  $this->config->getAppValue($key) ;
    }

    public function removeFileName($file,$zone) {
        
        if ($zone === "header") {
            $FL = json_decode($this->config->getAppValue('fileslist_header')) ;
            $idx = array_search($file,$FL) ;
            if ($idx !== false) {
                array_splice($FL,$idx,1) ;
                $resultat = $this->config->setAppValue('fileslist_header',json_encode($FL)) ;
            }
        }

        if ($zone === "footer") {
            $FL = json_decode($this->config->getAppValue('fileslist_footer')) ;
            $idx = array_search($file,$FL) ;
            if ($idx !== false) {
                array_splice($FL,$idx,1) ;
                $resultat = $this->config->setAppValue('fileslist_footer',json_encode($FL)) ;
                return $resultat ;
            }
        }
        
    }

    public function addFileName ($file,$zone) {

        if ($zone === "header") {
            $FL = json_decode($this->config->getAppValue('fileslist_header')) ;
            array_push($FL,$file) ;
            $this->setConfig('fileslist_header',json_encode($FL)) ;
        }

        if ($zone === "footer") {
            $FL = json_decode($this->config->getAppValue('fileslist_footer')) ;
            array_push($FL,$file) ;
            $this->setConfig('fileslist_footer',json_encode($FL)) ;
            return "success" ;
        }

    } 

}