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
    
    public function getConfig() {
        $params = [
                "show_asciidoc" => $this->config->getAppValue("show_asciidoc"),
                    "show_html" => $this->config->getAppValue("show_html")    ,
                  "yellow_back" => $this->config->getAppValue("yellow_back")  ,
                   "show_title" => $this->config->getAppValue("show_title")   ,
                 "auto_refresh" => $this->config->getAppValue("auto_refresh")   ,
        ];
        return $params ;
    }

    public function setConfig($key,$value) {
        $this->config->setAppValue($key,$value)  ;

        return  $this->config->getAppValue($key) ;
    }

}