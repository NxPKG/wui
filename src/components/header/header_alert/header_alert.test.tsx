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

import { WuiHeaderAlert } from './header_alert';

jest.mock('./../../../services/accessibility', () => ({
  htmlIdGenerator: () => () => 'generated-id',
}));

describe('WuiHeaderAlert', () => {
  test('is rendered', () => {
    const component = render(
      <WuiHeaderAlert {...requiredProps} title="title" date="date" />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders action', () => {
    const action = <button>Quietly take to the ship</button>;
    const component = render(
      <WuiHeaderAlert
        {...requiredProps}
        title="title"
        date="date"
        action={action}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders title as an element', () => {
    const title = <h2>Circumambulate the city</h2>;
    const component = render(
      <WuiHeaderAlert {...requiredProps} date="date" title={title} />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders date as an element', () => {
    const date = <h2>October 18, 1851</h2>;
    const component = render(
      <WuiHeaderAlert {...requiredProps} title="shazm" date={date} />
    );

    expect(component).toMatchSnapshot();
  });
});
