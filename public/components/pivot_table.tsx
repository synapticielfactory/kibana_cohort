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
import _ from 'lodash';
import { EuiInMemoryTable, EuiLink, EuiCode } from '@elastic/eui';
import { perc2color } from './lib/tools';

export const CohortPivotTable = (props: any) => {
  const { data, percentual, inverse } = props.deps;
  const columns: any = [
    {
      field: 'date',
      name: 'Cohort',
      sortable: true,
      width: '10%',
    },
  ];

  const keys = data.reduce(function (arr: any, o: any) {
    return Object.keys(o).reduce(function (a, k) {
      if (a.indexOf(k) === -1) a.push(k);
      return a;
    }, arr);
  }, []);
  const i: any = _.uniq(keys.filter((item: any) => item !== 'date' && item !== 'Metric')).sort(
    function (a: any, b: any) {
      return a - b;
    }
  );

  i.unshift('Metric');

  i.forEach((e: any) => {
    columns.push({
      field: e,
      name: e,
      sortable: true,
      render: (value: any, item: any) => {
        return (
          <div
            style={{
              width: 100,
              padding: 1,
              background: perc2color(value, item, percentual, inverse),
              // background: perc2color(value, 0, 100),
              /* background: `rgba(0, 179, 164, ${
                value && value !== item.Metric ? value * 0.001 : 0
              })`,*/
            }}
            className="eui-textNoWrap"
          >
            {value ? value : null}
          </div>
        );
      },
    });
  });

  const sorting: any = {
    sort: {
      field: 'date',
      direction: 'asc',
    },
  };

  return (
    <EuiInMemoryTable
      items={data}
      columns={columns}
      sorting={sorting}
      compressed={true}
      pagination={true}
    />
  );
};
