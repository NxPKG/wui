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
import { requiredProps } from '../../../test';

import { WuiSuperSelectControl } from './super_select_control';

jest.mock('./../../../services/accessibility', () => ({
  htmlIdGenerator: () => () => 'generated-id',
}));

describe('WuiSuperSelectControl', () => {
  test('is rendered', () => {
    const component = render(<WuiSuperSelectControl {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth is rendered', () => {
      const component = render(<WuiSuperSelectControl fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('compressed is rendered', () => {
      const component = render(<WuiSuperSelectControl compressed />);

      expect(component).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const component = render(<WuiSuperSelectControl isLoading />);

      expect(component).toMatchSnapshot();
    });

    test('isInvalid is rendered', () => {
      const component = render(<WuiSuperSelectControl isInvalid />);

      expect(component).toMatchSnapshot();
    });

    test('disabled options are rendered', () => {
      const component = render(
        <WuiSuperSelectControl
          options={[
            { value: '1', inputDisplay: 'Option #1', disabled: false },
            { value: '2', inputDisplay: 'Option #2', disabled: true },
          ]}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('value option is rendered', () => {
      const component = render(
        <WuiSuperSelectControl
          options={[
            { value: '1', inputDisplay: 'Option #1' },
            { value: '2', inputDisplay: 'Option #2' },
          ]}
          value={'1'}
          onChange={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('empty value option is rendered', () => {
      const value = undefined;
      const component = render(
        <WuiSuperSelectControl
          options={[
            { value: '1', inputDisplay: 'Option #1' },
            { value: '2', inputDisplay: 'Option #2' },
          ]}
          value={value}
          onChange={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
