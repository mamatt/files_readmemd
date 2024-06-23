<?php
/**
 * @author 2024 Matthieu Le Corre <matthieu.lecorre@univ-nantes.fr>
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

 namespace OCA\ReadmeMD\Listeners;

 use OCP\EventDispatcher\Event;
 use OCP\EventDispatcher\IEventListener;
 use OCP\Util;
 use OCA\ReadmeMD\Services\Config ;
 use OCP\AppFramework\Services\IInitialState;

 class LoadAdditionalScriptsListener implements IEventListener {
    
    protected InitialStateProvider $initialStateProvider;

    public function __construct(Config $config, IInitialState $initialState) {
		$this->initialState = $initialState;
        $this->config = $config ;
	}
    
    public function handle(Event $event): void {

        Util::addscript('files_readmemd', 'files_readmemd-main');
        $result = $this->config-> getAllAppValue() ;
        $this->initialState->provideInitialState('config',$result);

    }

    


}