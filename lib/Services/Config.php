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

namespace OCA\ReadmeMD\Services ;

use \OCP\IConfig;


class Config {

    private $config;
    private $appName;

    public function __construct(IConfig $config, $appName){
        $this->config = $config;
        $this->appName = $appName;

        $this->setDefaults() ;
    }

    private function setDefaults() {
        
        if (null == $this->getAppValue('show_asciidoc') ) { 
            $this->setAppValue('show_asciidoc','false') ;
        }

        if (null == $this->getAppValue('show_html') ) { 
            $this->setAppValue('show_html','false') ;
        }

        if (null == $this->getAppValue('show_title') ) { 
            $this->setAppValue('show_title','true') ;
        }

        if (null == $this->getAppValue('yellow_back') ) { 
            $this->setAppValue('yellow_back','true') ;
        }

    }

    public function getAppValue($key) {
        return $this->config->getAppValue($this->appName, $key);
    }

    public function setAppValue($key, $value) {
        $this->config->setAppValue($this->appName, $key, $value);
    }

    public function getFilesList() {
        return $this->config->getAppValue($this->appName,"fileslist") ;
    }




}