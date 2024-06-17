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

 namespace OCA\ReadmeMD\Appinfo ;

 
 use OCP\AppFramework\App;
 use OCP\AppFramework\Bootstrap\IBootstrap;
 use OCP\AppFramework\Bootstrap\IBootContext;
 use OCP\AppFramework\Bootstrap\IRegistrationContext;
 use OCP\IConfig;
 use OCA\Files\Event\LoadAdditionalScriptsEvent;
 use OCA\ReadmeMD\Services\Config ;
 use OCA\ReadmeMD\Listeners\LoadAdditionalScriptsListener;

 class Application extends App implements IBootstrap {
    public const APP_ID = 'files_readmemd';
    public const APP_NAME = 'ReadmeMD';

    public function __construct(array $params = []) {
        parent::__construct(self::APP_ID, $params);
    }

    public function boot(IBootContext $context): void {
	}

    public function register(IRegistrationContext $context): void {

        $context->registerService(Config::class, function($c) : Config {
            return new Config(
                $c->query(IConfig::class),
                $c->query('AppName')
            );
        });

        $context->registerEventListener(LoadAdditionalScriptsEvent::class, LoadAdditionalScriptsListener::class);
        $context->registerEventListener(OCA\Files_Sharing\Event\loadAdditionalScripts::class,LoadAdditionalScriptsListener::class);

    }

}