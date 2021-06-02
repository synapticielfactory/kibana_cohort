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


import { CohortOptionsParams } from './cohort_vis_options';
import { AggGroupNames } from '../../../src/plugins/data/public';
import { VisTypeDefinition } from '../../../src/plugins/visualizations/public/vis_types/types';
import { VIS_EVENT_TO_TRIGGER } from '../../../src/plugins/visualizations/public';
import { toExpressionAst } from './to_ast';

// @ts-ignore
export const getCohortVisDefinition: VisTypeDefinition = {
    name: 'cohort',
    title: 'Cohort',
    icon: 'stats',
    description: 'Cohort behavioral analytics Plugin',
    getSupportedTriggers: () => {
      return [VIS_EVENT_TO_TRIGGER.filter];
    },
    options: {
      hierarchicalData: true,
      showFilterBar: true,
      showIndexSelection: true,
      showQueryBar: true,
      showTimePicker: true,
    },
    visConfig: {
      defaults: {
        percentual: true, // Show percentual values
        inverse: false, // Show inverse values
        cumulative: false, // Show cumulative values
        table: true, // Show values as table
        mapColors: 'heatmap', // Show heatmap colors
      },
    },
    toExpressionAst,
    editorConfig: {
      optionsTemplate: CohortOptionsParams,
      // Data Schema for Metrics & Buckets
      schemas: [
        {
          group: AggGroupNames.Metrics,
          name: 'metric',
          title: 'Metrics',
          max: 1, // Remove this if you require more metrics
          min: 1,
          aggFilter: ['count', 'sum', 'avg', 'cardinality'],
          defaults: [{ type: 'count', schema: 'metric' }],
        },
        {
          group: AggGroupNames.Buckets,
          name: 'cohort_date',
          title: 'Cohort Date',
          min: 1,
          max: 1,
          aggFilter: ['date_histogram', 'terms'],
          defaults: [
            {
              type: 'date_histogram',
              schema: 'cohort_date',
              params: {
                interval: 'M',
                orderBy: '_term',
              },
            },
          ],
        },
        {
          group: AggGroupNames.Buckets,
          name: 'cohort_period',
          title: 'Cohort Period',
          min: 1,
          max: 1,
          aggFilter: ['histogram'],
          defaults: [
            {
              type: 'histogram',
              schema: 'cohort_period',
              params: {
                interval: 30,
              },
            },
          ],
        },
      ],
    },
    requiresSearch: true,
    hierarchicalData: true
};