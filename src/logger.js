/**
 *  - SPDX-FileCopyrightText: Matthieu Le Corre <matthieu.lecorre@univ-nantes.fr>
 *  - SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getLoggerBuilder } from '@nextcloud/logger'

export default getLoggerBuilder()
	.setApp('readmemd')
	.detectUser()
	.build()
