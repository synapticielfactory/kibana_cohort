/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { PluginInitializerContext, CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import { DataPublicPluginSetup, DataPublicPluginStart } from '../../../src/plugins/data/public';
import { Plugin as ExpressionsPublicPlugin } from '../../../src/plugins/expressions/public';
import { VisualizationsSetup } from '../../../src/plugins/visualizations/public';
import { ConfigSchema } from '../config';
import { getCohortVisDefinition } from './cohort_vis_type';
import { setFormatService } from './services';
import { ChartsPluginSetup } from '../../../src/plugins/charts/public';

/** @internal */
export interface CohortVisPluginStartDependencies {
  data: DataPublicPluginStart;
}

/** @internal */
export interface CohortPluginSetupDependencies {
  expressions: ReturnType<ExpressionsPublicPlugin['setup']>;
  visualizations: VisualizationsSetup;
  data: DataPublicPluginSetup;
  charts: ChartsPluginSetup;
}

/** @internal */
export class CohortVisPlugin implements Plugin<void, void> {
  initializerContext: PluginInitializerContext<ConfigSchema>;

  constructor(initializerContext: PluginInitializerContext<ConfigSchema>) {
    this.initializerContext = initializerContext;
  }

  public setup(
    coreSetup: CoreSetup,
    { expressions, visualizations, data, charts }: CohortPluginSetupDependencies
  ) {
    const deps: CohortPluginSetupDependencies = {
      expressions,
      visualizations,
      data,
      charts,
    };
    // React Visualization Type
    visualizations.createReactVisualization(getCohortVisDefinition(deps));
  }
  public start(core: CoreStart, { data }: CohortVisPluginStartDependencies) {
    setFormatService(data.fieldFormats);
  }
}
