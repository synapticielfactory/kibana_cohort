/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
// @ts-ignore
import React, { useEffect } from 'react';
import { EuiPanel } from '@elastic/eui';
import { processData, getDateHistogram, pivotData, getFormatTypes } from './lib/tools';
import { CohortPivotTable } from './pivot_table';
import { CohortPivotChart } from './pivot_chart';
import { CohortVisDependencies } from '../plugin';
import { CohortVisRenderValue } from '../cohort_vis_function';

type CohortVisComponentProps = CohortVisDependencies &
CohortVisRenderValue & {
    renderComplete: () => void;
  };

export function CohortComponent(props: CohortVisComponentProps) {
  useEffect(() => {
    props.renderComplete();
  });

    const { visData, visParams } = props;
    const { table, percentual, inverse, cumulative }: any = visParams;
    const dateHistogram = getDateHistogram(visData);
    const formatTimeFn = getFormatTypes(dateHistogram);
    const dataRaw = processData(visData, dateHistogram, formatTimeFn);
    console.log(dataRaw)
    
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
    console.log(dataRows)
    
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
              data: dataRows
            }}
          />
        </EuiPanel>
      );
    }
  }
