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

import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { EuiDataGrid } from '@elastic/eui';
import _ from 'lodash';

export const CohortPivotGrid = (props: any) => {
  const { data } = props.deps;

  const columns: any = [
    {
      id: 'date',
      displayAsText: 'Group',
      defaultSortDirection: 'asc',
    },
  ];

  const keys = data.reduce(function (arr: any, o: any) {
    return Object.keys(o).reduce(function (a, k) {
      if (a.indexOf(k) === -1) a.push(k);
      return a;
    }, arr);
  }, []);

  const i: any = _.uniq(keys.filter((item: any) => item !== 'date')).sort();

  i.forEach((e: any) => {
    columns.push({
      id: e,
    });
  });

  // ** Pagination config
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const onChangeItemsPerPage = useCallback(
    // eslint-disable-next-line no-shadow
    (pageSize) => setPagination((pagination) => ({ ...pagination, pageSize, pageIndex: 0 })),
    [setPagination]
  );
  const onChangePage = useCallback(
    // eslint-disable-next-line no-shadow
    (pageIndex) => setPagination((pagination) => ({ ...pagination, pageIndex })),
    [setPagination]
  );

  // ** Sorting config
  const [sortingColumns, setSortingColumns] = useState([]);
  const onSort = useCallback(
    // eslint-disable-next-line no-shadow
    (sortingColumns) => {
      setSortingColumns(sortingColumns);
    },
    [setSortingColumns]
  );

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(() => columns.map(({ id }: any) => id));
  // initialize to the full set of columns

  const renderCellValue = useMemo(() => {
    return ({ rowIndex, columnId, setCellProps }: any) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        if (data.hasOwnProperty(rowIndex)) {
          if (data[rowIndex][columnId]) {
            // const numeric = parseFloat(data[rowIndex][columnId].match(/\d+\.\d+/)[0]);
            setCellProps({
              style: {
                backgroundColor: `rgba(0, 255, 0, ${10 * 0.0002})`,
              },
            });
          }
        }
      }, [rowIndex, columnId, setCellProps]);

      return data.hasOwnProperty(rowIndex) && data[rowIndex][columnId]
        ? data[rowIndex][columnId]
        : null;
    };
  }, [data]);

  return (
    <EuiDataGrid
      aria-label="Cohort Analysis Grid"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={data.length}
      // renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
      renderCellValue={renderCellValue}
      inMemory={{ level: 'sorting' }}
      sorting={{ columns: sortingColumns, onSort }}
      pagination={{
        ...pagination,
        pageSizeOptions: [5, 10, 15, 20, 25, 50],
        onChangeItemsPerPage,
        onChangePage,
      }}
      // Optional. Allows you to configure what features the toolbar shows.
      // The prop also accepts a boolean if you want to toggle the entire toolbar on/off.
      toolbarVisibility={{
        showColumnSelector: true,
        showStyleSelector: true,
        showSortSelector: true,
        showFullScreenSelector: false,
      }}
      // Optional. Change the initial style of the grid.
      gridStyle={{
        border: 'all',
        fontSize: 's',
        cellPadding: 's',
        stripes: true,
        rowHover: 'highlight',
        header: 'underline',
      }}
    />
  );
};
