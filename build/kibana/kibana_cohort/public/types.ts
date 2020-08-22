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
import { ExprVis, VisParams } from '../../../src/plugins/visualizations/public';

export interface CohortVisParams {
  percentual: boolean; // Show percentual values
  inverse: boolean; // Show inverse values
  cumulative: boolean; // Show cumulative values
  table: boolean; // Show values as table
  mapColors: any; // Show heatmap colors
}

export interface CohortVisComponentProp extends CohortVisParams {
  renderComplete: () => {};
  config: any;
  vis: ExprVis;
  visData: any;
  visParams: VisParams;
  services: any;
}
