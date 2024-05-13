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
import { shallow } from 'enzyme';

import { WuiQuickSelect } from './quick_select';

const noop = () => {};
const defaultProps = {
  applyTime: noop,
  end: 'now',
  start: 'now-15m',
};

// Mock the htmlIdGenerator to generate predictable ids for snapshot tests
jest.mock('../../../../services/accessibility/html_id_generator', () => ({
  htmlIdGenerator: () => () => 'htmlId',
}));

describe('WuiQuickSelect', () => {
  test('is rendered', () => {
    const component = shallow(<WuiQuickSelect {...defaultProps} />);

    expect(component).toMatchSnapshot();
  });

  test('prevQuickSelect', () => {
    const component = shallow(
      <WuiQuickSelect
        {...defaultProps}
        prevQuickSelect={{
          timeTense: 'Next',
          timeUnits: 'M',
          timeValue: 32,
        }}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
