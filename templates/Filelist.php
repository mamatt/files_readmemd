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


style("files_readmemd","admin") ;
?>


<form id="readmeMD-filelist" class="section" >
    <h2> <?php p($l->t("Files list")) ; ?>
    </h2>

    <p class="settings-hint">
		<?php p($l->t("Choose the name of the files which will be used as HEADER/FOOTER content,")) ;?>
		<br>
		<?php p($l->t("Enter basename without file extensions :")) ;?>
	</p>

	<h3 id="readmeMD-filelist_create-header"><?php p($l->t('HEADER base filenames : ')); ?></h3>

	<ul id=readmeMD-filelist_header>
	<?php
		foreach($_["fileslist_header"] as $HFN) { ?>
			<li class="readmeMD-filelist" id="readmeMD-filelist-<?php p($HFN); ?>">
			<a data-zone="header" data-filename="<?php p($HFN); ?>" class="readmeMD-filelist_delete icon-inline icon icon-delete"></a><?php p($HFN); ?>
			</li>
		<?php } ;
	?>
	</ul>

	<div class="readmeMD-filelist-input-header">
		<input type="text" id="readmeMD-filelist_name-header" name="readmeMD-filelist_name-header" placeholder="<?php p($l->t('HEADER base Name')); ?>">

		<a id="readmeMD-filelist_submit-header" class="button"><span><?php p($l->t('Add')); ?></span></a>
	</div>

	<h3 id="readmeMD-filelist_create-footer"><?php p($l->t('FOOTER base filenames : ')); ?></h3>

	<ul id=readmeMD-filelist_footer>
	<?php
		foreach($_["fileslist_footer"] as $FFN) { ?>
			<li class="readmeMD-filelist" id="<?php p($FFN); ?>">
				<a data-zone="footer" data-filename="<?php p($FFN); ?>" class="readmeMD-filelist_delete icon-inline icon icon-delete"></a><?php p($FFN); ?>
			</li>
		<?php } ;
	?>
	</ul>

	<div class="readmeMD-filelist-input-footer">
		<input type="text" id="readmeMD-filelist_name-footer" name="readmeMD-filelist_name-footer" placeholder="<?php p($l->t('FOOTER Base Name')); ?>">

		<a id="readmeMD-filelist_submit-footer" class="button"><span><?php p($l->t('Add')); ?></span></a>
	</div>

</form>