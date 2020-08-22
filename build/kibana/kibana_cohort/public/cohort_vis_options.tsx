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

import React, { useCallback, Fragment } from 'react';
import { EuiCheckbox, EuiFlexItem, EuiIconTip, EuiFlexGroup } from '@elastic/eui';
import { VisOptionsProps } from '../../../src/plugins/vis_default_editor/public';
import { CohortVisParams } from './types';

function CohortOptionsParams({ stateParams, setValue }: VisOptionsProps<CohortVisParams>) {
  const onChangePercentual = useCallback(
    (value: CohortVisParams['percentual']) => setValue('percentual', value),
    [setValue]
  );

  const onChangeInverse = useCallback(
    (value: CohortVisParams['inverse']) => setValue('inverse', value),
    [setValue]
  );

  const onChangeCumulative = useCallback(
    (value: CohortVisParams['cumulative']) => setValue('cumulative', value),
    [setValue]
  );

  const onChangeTable = useCallback((value: CohortVisParams['table']) => setValue('table', value), [
    setValue,
  ]);
  return (
    <Fragment>
      <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
        <EuiFlexItem grow={false}>
          <EuiCheckbox
            id="percentual"
            label="Show percentual values"
            checked={stateParams.percentual}
            onChange={({ target: { checked } }) => onChangePercentual(Boolean(checked))}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiIconTip content="Show % values" position="right" />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiCheckbox
        id="inverse"
        label="Show inverse values"
        checked={stateParams.inverse}
        onChange={({ target: { checked } }) => onChangeInverse(Boolean(checked))}
      />
      <EuiCheckbox
        id="cumulative"
        label="Show cumulative values"
        checked={stateParams.cumulative}
        onChange={({ target: { checked } }) => onChangeCumulative(Boolean(checked))}
      />
      <EuiCheckbox
        id="table"
        label="Show values as table"
        checked={stateParams.table}
        onChange={({ target: { checked } }) => onChangeTable(Boolean(checked))}
      />
    </Fragment>
  );
}

export { CohortOptionsParams };
