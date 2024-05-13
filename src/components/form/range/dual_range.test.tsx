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

import { WuiDualRange } from './dual_range';

jest.mock('./../../../services/accessibility', () => ({
  htmlIdGenerator: () => () => 'generated-id',
}));

const props = {
  onChange: () => {},
};

describe('WuiDualRange', () => {
  test('is rendered', () => {
    const component = render(
      <WuiDualRange
        name="name"
        id="id"
        value={['1', '8']}
        {...props}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('disabled should render', () => {
      const component = render(
        <WuiDualRange {...props} value={['1', '8']} disabled />
      );

      expect(component).toMatchSnapshot();
    });

    test('fullWidth should render', () => {
      const component = render(
        <WuiDualRange {...props} value={['1', '8']} fullWidth />
      );

      expect(component).toMatchSnapshot();
    });

    test('compressed should render', () => {
      const component = render(
        <WuiDualRange {...props} value={['1', '8']} compressed />
      );

      expect(component).toMatchSnapshot();
    });

    test('labels should render', () => {
      const component = render(
        <WuiDualRange {...props} value={['1', '8']} showLabels />
      );

      expect(component).toMatchSnapshot();
    });

    test('ticks should render', () => {
      const component = render(
        <WuiDualRange
          {...props}
          value={['1', '8']}
          showTicks
          tickInterval={20}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('custom ticks should render', () => {
      const component = render(
        <WuiDualRange
          {...props}
          value={[20, 100]}
          showTicks
          ticks={[
            { label: '20kb', value: 20 },
            { label: '100kb', value: 100 },
          ]}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('range should render', () => {
      const component = render(
        <WuiDualRange {...props} showRange value={[1, 8]} />
      );

      expect(component).toMatchSnapshot();
    });

    test('inputs should render', () => {
      const component = render(
        <WuiDualRange
          name="name"
          id="id"
          value={['1', '8']}
          showInput
          {...props}
          {...requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('slider should display in popover', () => {
      const component = render(
        <WuiDualRange
          name="name"
          id="id"
          value={['1', '8']}
          showInput="inputWithPopover"
          {...props}
          {...requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('levels should render', () => {
      const component = render(
        <WuiDualRange
          levels={[
            {
              min: 0,
              max: 20,
              color: 'danger',
            },
            {
              min: 20,
              max: 100,
              color: 'success',
            },
          ]}
          value={['1', '8']}
          onChange={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  test('allows value prop to accept numbers', () => {
    const component = render(<WuiDualRange value={[1, 8]} {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('allows value prop to accept empty strings', () => {
    const component = render(<WuiDualRange value={['', '']} {...props} />);

    expect(component).toMatchSnapshot();
  });

  describe('input props', () => {
    test('can be applied to min and max inputs', () => {
      const component = render(
        <WuiDualRange
          name="name"
          id="id"
          min={1}
          max={10}
          value={['1', '8']}
          onChange={() => {}}
          showInput
          minInputProps={{ 'aria-label': 'Min value' }}
          maxInputProps={{ 'aria-label': 'Max value' }}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
