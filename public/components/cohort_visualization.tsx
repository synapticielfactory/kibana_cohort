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

import React from 'react';
import { EuiPanel } from '@elastic/eui';
import { useKibana } from '../../../../src/plugins/kibana_react/public';
import { processData, getDateHistogram, pivotData, getFormatTypes } from './lib/tools';
import { CohortPivotTable } from './pivot_table';
import { CohortPivotChart } from './pivot_chart';
import { CohortVisComponentProp } from '../types';
import { CohortPluginSetupDependencies } from '../plugin';

/**
 * The CohortVisComponent renders the form.
 */
class CohortVisComponent extends React.Component<CohortVisComponentProp> {
  /**
   * Will be called after the first render when the component is present in the DOM.
   * We call renderComplete here, to signal, that we are done with rendering.
   */
  componentDidMount() {
    this.props.renderComplete();
  }

  /**
   * Will be called after the component has been updated and the changes has been
   * flushed into the DOM.
   *
   * We will use this to signal that we are done rendering by calling the
   * renderComplete property.
   */
  componentDidUpdate() {
    this.props.renderComplete();
  }

  constructor(props: CohortVisComponentProp) {
    super(props);
    // console.log(props);
    // Check https://kobelb.github.io/kibana-rbac-docs/development-visualize-index.html
  }

  /**
   * Render the actual HTML.
   */
  render() {
    const { visData, visParams, vis, config, services }: any = this.props;
    const { table, percentual, inverse, cumulative }: any = visParams;
    const dateHistogram = getDateHistogram(visData);
    const formatTimeFn = getFormatTypes(dateHistogram);
    const dataRaw = processData(visData, dateHistogram, formatTimeFn);
    const dataRows = dataRaw.map((item: any) => ({
      date: item.date,
      period: item.period,
      total: item.total,
      cumulativeValue: item.cumulativeValue,
      value: percentual
        ? Math.round((item.value / item.total) * 100)
        : cumulative
        ? item.cumulativeValue
        : inverse
        ? Math.round(100 - (item.value / item.total) * 100)
        : item.value,
    }));
    const dataPivoted = pivotData(dataRows, dateHistogram, formatTimeFn);

    // @ts-ignore
    if (table) {
      return (
        <EuiPanel paddingSize="l" hasShadow>
          <CohortPivotTable
            deps={{
              data: dataPivoted,
              percentual,
              inverse,
            }}
          />
        </EuiPanel>
      );
    } else {
      return (
        <EuiPanel paddingSize="l" hasShadow>
          <CohortPivotChart
            deps={{
              data: dataRows,
              services,
            }}
          />
        </EuiPanel>
      );
    }
  }
}

/**
 * This is a wrapper component, that is actually used as the visualization.
 * The sole purpose of this component is to extract all required parameters from
 * the properties and pass them down as separate properties to the actual component.
 * That way the actual (CohortVisComponent) will properly trigger it's prop update
 * callback (componentWillReceiveProps) if one of these params change. It wouldn't
 * trigger otherwise (e.g. it doesn't for this wrapper), since it only triggers
 * if the reference to the prop changes (in this case the reference to vis).
 *
 * The way React works, this wrapper nearly brings no overhead, but allows us
 * to use proper lifecycle methods in the actual component.
 */

export function CohortVisComponentWraper(props: CohortVisComponentProp) {
  const kibana = useKibana<CohortPluginSetupDependencies>();
  return (
    <CohortVisComponent
      renderComplete={props.renderComplete}
      percentual={props.visParams.percentual}
      inverse={props.visParams.inverse}
      cumulative={props.visParams.cumulative}
      table={props.visParams.table}
      mapColors={props.visParams.mapColors}
      services={kibana.services}
      config={props.config}
      vis={props.vis}
      visData={props.visData}
      visParams={props.visParams}
    />
  );
}
