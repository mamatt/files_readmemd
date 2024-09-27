<!--
  - SPDX-FileCopyrightText: Matthieu Le Corre <matthieu.lecorre@univ-nantes.fr>
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
    <div>
    <!--NcSettingsSection :name="t('files_readmemd', 'Defaults')" >
    </NcSettingsSection--> 

    <NcSettingsSection :name="t('files_readmemd', 'Engines')" >

            <NcCheckboxRadioSwitch :disabled="true" :checked="true"  type="switch">
                {{ t('files_readmemd', "Rendering Markdown content can't be disabled (.md & .markdown extentions).") }}
            </NcCheckboxRadioSwitch>
           
            <NcCheckboxRadioSwitch :checked.sync="config.show_asciidoc" type="switch" @update:checked="saveChanges">
                {{ t('files_readmemd', "Render Asciidoc content (.adoc & .asciidoc extentions).") }}
            </NcCheckboxRadioSwitch>

            <NcNoteCard type="warning">

                Enabling direct HTML rendering is DANGEROUS. You should activate it only if you know what you are doing.
                This can easily break the whole page and add potential leaks. You have been warned.
            </NcNoteCard>         

            <NcCheckboxRadioSwitch :checked.sync="config.show_html" type="switch" @update:checked="saveChanges">
                {{ t('files_readmemd', "Render HTML content (.htm & .html extentions).") }}
            </NcCheckboxRadioSwitch>


    </NcSettingsSection>

    <NcSettingsSection :name="t('files_readmemd', 'Files List')" 
        :description="t('files_readmemd','Choose the name of the files which will be used as HEADER/FOOTER content. Enter basename without file extensions :')" 
        >
        <h3>HEADER base filenames :</h3>
        <ul>
            <NcListItemIcon v-for="basename in config.fileslist_header" :name="basename" :key="basename" :compact="true" >
                <template>
                    <NcActions>
                        <NcActionButton  v-if="config.fileslist_header.length > 1" @click="deleteHeader(basename)">
			                <template #icon>
				                <Delete :size="20" />
			                </template>
		                </NcActionButton>
                    </NcActions>
                </template>
            </NcListItemIcon>
        </ul>
        <NcSettingsInputText :value.sync="newHeaderFile" label="Add"  @submit="addHeader"/>

        <h3>FOOTER base filenames :</h3>
        <ul>
            <NcListItemIcon v-for="basename in config.fileslist_footer" :name="basename" :key="basename" :compact="true" >
                <template>
                    <NcActions>
                        <NcActionButton  v-if="config.fileslist_footer.length > 1" @click="deleteFooter(basename)">
			                <template #icon>
				                <Delete :size="20" />
			                </template>
		                </NcActionButton>
                    </NcActions>
                </template>
            </NcListItemIcon>
        </ul>
        <NcSettingsInputText :value.sync="newFooterFile"  label="Add"  @submit="addFooter"/>

    </NcSettingsSection>


   
    </div>
</template>

<script>
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import { loadState } from '@nextcloud/initial-state'
import NcActions from '@nextcloud/vue/dist/Components/NcActions.js'
import NcSettingsSection from '@nextcloud/vue/dist/Components/NcSettingsSection.js'
import NcCheckboxRadioSwitch from '@nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.js'
import NcListItemIcon from '@nextcloud/vue/dist/Components/NcListItemIcon.js'
import NcActionButton from '@nextcloud/vue/dist/Components/NcActionButton.js'
import NcSettingsInputText from '@nextcloud/vue/dist/Components/NcSettingsInputText.js'
import Delete from 'vue-material-design-icons/Delete.vue'
import logger from '../logger'


export default {
    name: 'Config',
    components: {
        NcSettingsSection,
        NcCheckboxRadioSwitch,
        NcListItemIcon,
        NcActionButton,
        NcActions,
        NcSettingsInputText,
        Delete,
    },
    data() {
        return {
			config: loadState('files_readmemd', 'config'),
            newHeaderFile: '',
            newFooterFile: '',
        }
    },

    methods: {
        async saveChanges() {
            try {
				await axios.put(generateUrl('/apps/files_readmemd/config'), this.config)
			} catch (err) {
				logger.error('could not save config', err)
			}

        },

        addHeader() {
            this.config.fileslist_header.push(this.newHeaderFile)
            this.newHeaderFile = ''
            this.saveChanges()
        },

        addFooter() {
            this.config.fileslist_footer.push(this.newFooterFile)
            this.newFooterFile = ''
            this.saveChanges()
        },

        deleteHeader(basename) {
            const index = this.config.fileslist_header.indexOf(basename)
            this.config.fileslist_header.splice(index,1)
            console.debug(basename)
        },

        deleteFooter(basename) {
            console.debug(basename)

        }
    }

}
</script>
<style scoped>
    .icon-inline {
        display: inline-flex;
        margin-right: 5px ;
        float: right ;
    }

    .readmeMD-filelist {
        border-bottom: 1px solid silver ;
        margin-bottom: 4px ;
        width: 20em ;
    }

    #readmeMD-filelist input {
        width: 200px ;
    }
</style>
