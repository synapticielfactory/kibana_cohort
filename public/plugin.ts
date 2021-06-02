/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CoreSetup, Plugin } from '../../../src/core/public';
import { DataPublicPluginSetup, DataPublicPluginStart } from '../../../src/plugins/data/public';
import { Plugin as ExpressionsPublicPlugin } from '../../../src/plugins/expressions/public';
import { VisualizationsSetup } from '../../../src/plugins/visualizations/public';
import { ChartsPluginSetup } from '../../../src/plugins/charts/public';

import { selfChangingVisRenderer } from './cohort_vis_renderer';
import { getCohortVisDefinition } from './cohort_vis_type';
import { createCohortFn } from './cohort_vis_function';

/** @internal */
export interface CohortVisPluginStartDependencies {
  data: DataPublicPluginStart;
}

/** @internal */
export interface CohortVisDependencies {
  charts: ChartsPluginSetup;
}

/** @internal */
export interface CohortPluginSetupDependencies {
  expressions: ReturnType<ExpressionsPublicPlugin['setup']>;
  visualizations: VisualizationsSetup;
}

export class CohortVisualizationsPublicPlugin
  implements Plugin<CohortVisualizationsSetup, CohortVisualizationsStart> {
  public setup(core: CoreSetup, { expressions, visualizations }: CohortPluginSetupDependencies) {
    /**
     * Register an expression function with type "render" for your visualization
     * register an expression function definition to handle your custom expression
     * using expressions.registerFunction( functionDefinition ), 
     * where the functionDefinition describes your expression parameters.
     */
    expressions.registerFunction(createCohortFn);

    /**
     * Register a renderer for your visualization
     * register an explicit renderer for your visualization using 
     * expressions.registerRenderer( rendererDefinition ),
     * where the rendererDefinition is type of ExpressionRenderDefinition.
     */

    expressions.registerRenderer(selfChangingVisRenderer());

    /**
     * Create the visualization type with definition
     * register a visualization type using visualizations.createBaseVisualization( config ) function, 
     * where the config should be a type of VisTypeDefinition. 
     * VisTypeDefinition is documented (see src/plugins/visualizations/public/vis_types/types.ts) 
     * for usability.
     */
     visualizations.createBaseVisualization(getCohortVisDefinition);
  }

  public start() {}
  public stop() {}
}

export type CohortVisualizationsSetup = ReturnType<CohortVisualizationsPublicPlugin['setup']>;
export type CohortVisualizationsStart = ReturnType<CohortVisualizationsPublicPlugin['start']>;
