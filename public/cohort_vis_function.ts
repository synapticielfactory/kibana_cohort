/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ExpressionFunctionDefinition, Render, Datatable } from '../../../src/plugins/expressions/public';
import { CohortVisParams } from './types';
const name = 'cohort_vis';

export interface CohortVisRenderValue {
  visType: typeof name;
  visData: Datatable;
  visParams: CohortVisParams;
}

export type CohortVisExpressionFunctionDefinition = ExpressionFunctionDefinition<
  typeof name,
  Datatable,
  CohortVisParams,
  Render<CohortVisRenderValue>
>;

export const createCohortFn = (): CohortVisExpressionFunctionDefinition => ({
  name,
  type: 'render',
  inputTypes: ['datatable'],
  help: 'Cohort visualization',
  args: {
    percentual: {
      types: ['boolean'],
      default: false,
      help: ''
    },
    inverse: {
      types: ['boolean'],
      default: false,
      help: ''
    },
    cumulative: {
      types: ['boolean'],
      default: false,
      help: ''
    },
    table: {
      types: ['boolean'],
      default: false,
      help: ''
    },
    metric: {
      types: ['vis_dimension'],
      help: 'metric dimension configuration',
      required: true,
    },
    bucket: {
      types: ['vis_dimension'],
      help: 'bucket dimension configuration',
    }
  },
  fn(input, args, handlers) {
    
    const visParams = {
      percentual: args.percentual,
      inverse: args.inverse,
      cumulative: args.cumulative,
      table: args.table,
      metric: args.metric
    };
    

    
    if (args.bucket !== undefined) {
      visParams.bucket = args.bucket;
    }
    
    
    if (handlers?.inspectorAdapters?.tables) {
      handlers.inspectorAdapters.tables.logDatatable('default', input);
    }
    
    return {
      type: 'render',
      as: name,
      value: {
        visData: input,
        visType: name,
        visParams
      },
    };
  },
});