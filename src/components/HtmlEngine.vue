<!--
  - SPDX-FileCopyrightText: Matthieu Le Corre <matthieu.lecorre@univ-nantes.fr>
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div ref="container" class="html-body" v-html="content" /> <!-- eslint-disable-line -->
</template>

<script>

export default {
	name: 'HtmlEngine',
	props: {
		content: {
			type: String,
			default: '',
		},
	},
}
</script>
