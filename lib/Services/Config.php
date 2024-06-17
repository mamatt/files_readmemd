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

use OCP\IConfig;


class Config {

    private IConfig $config;
    private string $appName;

    public function __construct(IConfig $config, string $appName){
        $this->config = $config;
        $this->appName = $appName;

        $this->setDefaults() ;
    }

    private function setDefaults() {
        
        if (empty($this->getAppValue('show_asciidoc')) ) { 
            $this->setAppValue('show_asciidoc','false') ;
        }

        if (empty($this->getAppValue('show_html')) ) { 
            $this->setAppValue('show_html','false') ;
        }

        if (empty($this->getAppValue('show_title')) ) { 
            $this->setAppValue('show_title','true') ;
        }

        if (empty($this->getAppValue('yellow_back')) ) { 
            $this->setAppValue('yellow_back','true') ;
        }

        if (empty($this->getAppValue('auto_refresh')) ) { 
            $this->setAppValue('auto_refresh','false') ;
        }

        if (empty($this->getAppValue('disable_workspace')) ) { 
            $this->setAppValue('disable_workspace','true') ;
        }

        if (null === json_decode($this->getAppValue('fileslist_header')) ){
            $this->setAppValue('fileslist_header',json_encode(array('HEADER'))) ;
        }

        if (null === json_decode($this->getAppValue('fileslist_footer')) ){
            $this->setAppValue('fileslist_footer',json_encode(array('README'))) ;
        }

    }

    public function getAppValue($key) {
        return $this->config->getAppValue($this->appName, $key);
    }

    public function setAppValue($key, $value) {
        $this->config->setAppValue($this->appName, $key, $value);
    }

}