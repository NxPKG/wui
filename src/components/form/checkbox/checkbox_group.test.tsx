/*
 * Copyright 2022 Wazuh Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * NOTICE: THIS FILE HAS BEEN MODIFIED BY WAZUH INC UNDER COMPLIANCE WITH THE APACHE 2.0 LICENSE FROM THE ORIGINAL WORK
 * OF THE COMPANY Elasticsearch B.V.
 *
 * THE FOLLOWING IS THE COPYRIGHT OF THE ORIGINAL DOCUMENT:
 *
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
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { WuiCheckboxGroup } from './checkbox_group';

jest.mock('./checkbox', () => ({ WuiCheckbox: 'wui_checkbox' }));

const checkboxGroupRequiredProps = {
  options: [],
  idToSelectedMap: {},
  onChange: () => {},
};

describe('WuiCheckboxGroup (mocked checkbox)', () => {
  test('is rendered', () => {
    const component = render(
      <WuiCheckboxGroup
        onChange={() => {}}
        {...checkboxGroupRequiredProps}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('options are rendered', () => {
    const component = render(
      <WuiCheckboxGroup
        {...checkboxGroupRequiredProps}
        options={[
          { id: '1', label: 'wazuh' },
          { id: '2', label: 'wazuh' },
        ]}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('idToSelectedMap is rendered', () => {
    const component = render(
      <WuiCheckboxGroup
        {...checkboxGroupRequiredProps}
        options={[
          { id: '1', label: 'wazuh' },
          { id: '2', label: 'wazuh' },
        ]}
        idToSelectedMap={{
          '1': true,
          '2': false,
        }}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('disabled is rendered', () => {
    const component = render(
      <WuiCheckboxGroup
        {...checkboxGroupRequiredProps}
        options={[
          { id: '1', label: 'wazuh' },
          { id: '2', label: 'wazuh' },
        ]}
        idToSelectedMap={{
          '1': true,
          '2': false,
        }}
        disabled
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('individual disabled is rendered', () => {
    const component = render(
      <WuiCheckboxGroup
        {...checkboxGroupRequiredProps}
        options={[
          { id: '1', label: 'wazuh', disabled: true },
          { id: '2', label: 'wazuh' },
        ]}
        idToSelectedMap={{
          '1': true,
          '2': false,
        }}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('legend is rendered', () => {
    const component = render(
      <WuiCheckboxGroup
        {...checkboxGroupRequiredProps}
        legend={{
          children: 'A legend',
        }}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
