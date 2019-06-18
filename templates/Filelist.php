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

?>


<!--form id="readmeMD-filelist" class="section" data-readmeMD-filelist-id="">
    <h2> <?php p($l->t("Files list")) ; ?>
    </h2>

    <p class="settings-hint"><?php echo $l->t("Choose the name of the files which will be used as HEADER/FOOTER content") ;?></p>

	<input type="hidden" name="readmeMD-filelist" id="readmeMD-filelist" placeholder="<?php p($l->t('Select file …')); ?>" />

	<h3 id="readmeMD-filelist_create"><?php p($l->t('Add a new file name')); ?></h3>

	<div class="readmeMD-filelist-input">
		<input type="text" id="readmeMD-filelist_name" name="readmeMD-filelist_name" placeholder="<?php p($l->t('File Name')); ?>">

		<a id="readmeMD-filelist_delete" class="hidden button"><span><?php p($l->t('Delete')); ?></span></a>
		<a id="readmeMD-filelist_reset" class="button"><span><?php p($l->t('Reset')); ?></span></a>
		<a id="readmeMD-filelist_submit" class="button"><span><?php p($l->t('Add')); ?></span></a>
	</div>

</form-->