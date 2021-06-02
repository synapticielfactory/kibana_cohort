/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { PluginInitializer } from '../../../src/core/public';

import {
  CohortVisualizationsPublicPlugin,
  CohortVisualizationsSetup,
  CohortVisualizationsStart,
} from './plugin';





export { CohortVisualizationsPublicPlugin as Plugin };

export const plugin: PluginInitializer<CohortVisualizationsSetup, CohortVisualizationsStart> = () =>
  new CohortVisualizationsPublicPlugin();
