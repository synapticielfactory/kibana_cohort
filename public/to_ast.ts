/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  EsaggsExpressionFunctionDefinition,
  IndexPatternLoadExpressionFunctionDefinition,
} from '../../../src/plugins/data/public';
import { buildExpression, buildExpressionFunction } from '../../../src/plugins/expressions/public';
import { getVisSchemas, SchemaConfig, VisToExpressionAst } from '../../../src/plugins/visualizations/public';
import { CohortVisExpressionFunctionDefinition } from './cohort_vis_function';
import { CohortVisParams } from './types';

const prepareDimension = (params: SchemaConfig) => {
  const visdimension = buildExpressionFunction('visdimension', { accessor: params.accessor });

  if (params.format) {
    visdimension.addArgument('format', params.format.id);
    visdimension.addArgument('formatParams', JSON.stringify(params.format.params));
  }

  return buildExpression([visdimension]);
};

const getMetrics = (schemas: ReturnType<typeof getVisSchemas>, visParams: CohortVisParams) => {
  const metrics = [...schemas.metric];

  if (schemas.bucket) {
    // Handle case where user wants to see partial rows but not metrics at all levels.
    // This requires calculating how many metrics will come back in the tabified response,
    // and removing all metrics from the dimensions except the last set.
    const metricsPerBucket = metrics.length / schemas.bucket.length;
    metrics.splice(0, metricsPerBucket * schemas.bucket.length - metricsPerBucket);
  }

  return metrics;
};

export const toExpressionAst: VisToExpressionAst<CohortVisParams> = (vis, params) => {
  const esaggs = buildExpressionFunction<EsaggsExpressionFunctionDefinition>('esaggs', {
    index: buildExpression([
      buildExpressionFunction<IndexPatternLoadExpressionFunctionDefinition>('indexPatternLoad', {
        id: vis.data.indexPattern!.id!,
      }),
    ]),
    metricsAtAllLevels: vis.isHierarchical(),
    partialRows: false,
    aggs: vis.data.aggs!.aggs.map((agg) => buildExpression(agg.toExpressionAst())),
  });


  
 
  const schemas = getVisSchemas(vis, params);


  const { percentual, inverse, cumulative, table } = vis.params;

  const cohortVis = buildExpressionFunction<CohortVisExpressionFunctionDefinition>('cohort_vis', {
    percentual, inverse, cumulative, table,
    metric: prepareDimension(schemas.metric[0])
  });

  
  if (schemas.segment) {
    cohortVis.addArgument('bucket', prepareDimension(schemas.segment[0]));
  }
  

  const ast = buildExpression([esaggs, cohortVis]);

  return ast.toAst();
};
