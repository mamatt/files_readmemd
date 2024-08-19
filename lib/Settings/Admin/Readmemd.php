<?php
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

namespace OCA\ReadmeMD\Settings\Admin ;


use OCP\Settings\ISettings;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Services\IInitialState;
use OCA\ReadmeMD\Services\ConfigService ;


class Readmemd implements ISettings {

    public function __construct(ConfigService $config, private IInitialState $initialState) {
        $this->initialState = $initialState;
        $this->config = $config ;
    }

    /**
     * @return string the section ID, e.g. 'sharing'
     */
    public function getSection() {
        return 'files_readmemd';
    }

    /**
     * @return int whether the form should be rather on the top or bottom of
     * the admin section. The forms are arranged in ascending order of the
     * priority values. It is required to return a value between 0 and 100.
     */
    public function getPriority() {
            return 50;
    }

    /**
     * @return TemplateResponse
     */
    public function getForm() {

        $result = $this->config-> getAllAppValue() ;
        $this->initialState->provideInitialState('config',$result);

        return new TemplateResponse('files_readmemd', 'Readmemd');
    }

}