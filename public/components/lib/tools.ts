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

import d3 from 'd3';

const formatTypes: any = {
  undefined: (d: any) => d,
  custom: d3.time.format('%Y-%m-%d %H:%M:%S'),
  auto: d3.time.format('%Y-%m-%d %H:%M:%S'),
  ms: d3.time.format('%Y-%m-%d %H:%M:%S,%L'),
  s: d3.time.format('%Y-%m-%d %H:%M:%S'),
  m: d3.time.format('%Y-%m-%d %H:%M'),
  h: d3.time.format('%Y-%m-%d %H:%M'),
  d: d3.time.format('%Y-%m-%d'),
  w: d3.time.format('%Y-%m-%d'),
  M: d3.time.format('%Y-%m'),
  y: d3.time.format('%Y'),
};

/**
 * @param {string} dateHistogram
 * @returns {function}
 */
export const getFormatTypes = (dateHistogram: any) => formatTypes[dateHistogram];

/**
 * @param {*} x
 * @returns {number}
 */
const parseNumber = (x: any) => {
  if (typeof x === 'number' && !isNaN(x)) return x;
  const n = parseFloat(x);
  return isNaN(n) ? 0 : n;
};

/**
 * @param visData
 * @returns {string|undefined}
 */
export function getDateHistogram(visData: any) {
  const schema = visData.columns.find((column: any) => column.meta.sourceParams.type === 'date_histogram');
  if (schema) {
    return schema.meta.sourceParams.params.interval;
  }
}

/**
 *
 * @param {object} esData
 * @param {string|undefined} dateHistogram
 * @param {function} formatTime
 * @returns {array}
 */
export function processData(esData: any, dateHistogram: any, formatTime: any) {
  console.log(esData)
  if (!(Array.isArray(esData.rows) && esData.rows.length)) {
    return [];
  }


  const data = esData.rows.map((row: any) => {
    return {
      date: dateHistogram ? formatTime(new Date(row['col-0-2'])) : row['col-0-2'],
      period: parseNumber(row['col-2-3']),
      value: parseNumber(row['col-3-1']),
      total: parseNumber(row['col-1-1'])
    };
  });

  const cumulativeData: any = {};
  return data.map((d: any) => {
    const lastValue = cumulativeData[d.date] || 0;
    d.cumulativeValue = lastValue + d.value;
    cumulativeData[d.date] = d.cumulativeValue;
    return d;
  });
}

// https://stackoverflow.com/questions/19757638/how-to-pivot-a-table-with-d3-js

/**
 *
 * @param {object} data
 * @param {string|undefined} dateHistogram
 * @param {function} formatTime
 * @returns {array}
 */
 export function pivotData(data: any, dateHistogram: any, formatTime: any) {
  const nester = d3
    .nest()
    .key(function (d: any) {
      return d.date;
    })
    .key(function (d: any) {
      return d.total;
    })
    .rollup(function (values) {
      const sortedValues = values.sort(function (x: any, y: any) {
        return x.period < y.period ? -1 : x.period > y.period ? 1 : 0;
      });
      const mkKey = function (c: any, v: any) {
        return {
          name: c,
          ...v,
        };
      };

      const pivotedX = sortedValues.map(function (d: any) {
        return mkKey(d.period, {
          value: d.value,
          total: d.total,
          cumulativeValue: d.cumulativeValue,
        });
      });

      return Array.prototype.concat.apply([], [pivotedX]);
    });

  const nestedData = nester.entries(data);
  const pivotedData: any = [];

  nestedData.forEach(function (kv1: any) {
    const a = kv1.key;
    kv1.values.forEach(function (kv2: any) {
      const b = kv2.key;
      const obj: any = {
        date: dateHistogram ? formatTime(new Date(Date.parse(a))) : a,
        Metric: b,
      };

      kv2.values.forEach(function (d: any) {
        obj[d.name] = d.value;
        // obj[d.name] = { value: d.value, total: d.total, cumulativeValue: d.cumulativeValue };
      });
      pivotedData.push(obj);
    });
  });
  return pivotedData;
}

/**
 * @param {number} value
 * @param {any} item
 * @param {boolean} percentual
 * @param {boolean} inverse
 * @returns {string} color
 */
export function perc2color(value: number, item: any, percentual: boolean, inverse: boolean) {
  if (!value) {
    return '';
  }
  if (parseNumber(value) === parseNumber(item.Metric)) {
    return '#D36086';
  } else {
    if (percentual || inverse) {
      if (value >= 75) {
        // 75% to 100%
        return '#6DCCB1';
      } else if (value >= 50 && value < 75) {
        // 50% to 75%
        return '#79AAD9';
      } else if (value >= 25 && value < 50) {
        // 25% to 50%
        return '#F5A35C';
      } else {
        // 0% to 25%
        return '#E7664C';
      }
    } else {
      // Values are not in %
      return '';
    }
  }
}