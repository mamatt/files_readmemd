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

/** @var $l \OCP\IL10N */
/** @var $_ array */

script("files_readmemd","config") ;


?>

<div id="readmeMD-appearance" class="section">
    <h2> <?php p($l->t("Appearance")) ; ?></h2>
    <p>
    
        <input id="readmeMD-appearance-txt" name="readmeMD-appearance-txt"
            type="checkbox" class="checkbox " value="1" <?php if ($_['show_title'] === 'true'): ?> checked="checked"<?php endif; ?>
        />
        <label for="readmeMD-appearance-txt"><?php p($l->t("Show filename before content")) ; ?></label>
    </p>
    
    <p>
        <input id="readmeMD-appearance-color" name="readmeMD-appearance-color"
            type="checkbox" class="checkbox " value="1" <?php if ($_['yellow_back'] === 'true'): ?> checked="checked"<?php endif; ?>
        />
        <label for="readmeMD-appearance-color"><?php p($l->t("Show yellow background for README.md")) ; ?></label> 
    </p>

    <p>
        <input id="readmeMD-appearance-refresh" name="readmeMD-appearance-refresh"
            type="checkbox" class="checkbox " value="1" <?php if ($_['auto_refresh'] === 'true'): ?> checked="checked"<?php endif; ?>
        />
        <label for="readmeMD-appearance-refresh"><?php p($l->t("Auto refresh (check every 1 sec.) of HEADER/FOOTER content whenever files contents change (maybe lower general performance)")) ; ?></label> 
    </p>

</div>