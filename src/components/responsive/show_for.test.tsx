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

import { WuiShowForBreakpoints, WuiShowFor } from './show_for';

const BREAKPOINTS: WuiShowForBreakpoints[] = ['xs', 's', 'm', 'l', 'xl'];

describe('WuiShowFor', () => {
  // @ts-ignore innerWidth might be read only but we can still override it for the sake of testing
  beforeAll(() => (window.innerWidth = 670));
  afterAll(() => 1024); // reset to jsdom's default

  test('renders', () => {
    const component = render(
      <WuiShowFor sizes={['s']}>
        <span>Child</span>
      </WuiShowFor>
    );

    expect(component).toMatchSnapshot();
  });

  BREAKPOINTS.forEach(size => {
    test(`${size} is rendered`, () => {
      const component = render(
        <WuiShowFor sizes={[size]}>
          <span>Child</span>
        </WuiShowFor>
      );

      expect(component).toMatchSnapshot();
    });
  });

  test('renders for multiple breakpoints', () => {
    const component = render(
      <WuiShowFor sizes={['s', 'l']}>
        <span>Child</span>
      </WuiShowFor>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders for "all"', () => {
    const component = render(
      <WuiShowFor sizes={'all'}>
        <span>Child</span>
      </WuiShowFor>
    );

    expect(component).toMatchSnapshot();
  });

  test('never renders for "none"', () => {
    const component = render(
      <WuiShowFor sizes={'none'}>
        <span>Child</span>
      </WuiShowFor>
    );

    expect(component).toMatchSnapshot();
  });
});
