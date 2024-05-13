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
import { requiredProps } from '../../test';

import { WuiHighlight } from './highlight';

describe('WuiHighlight', () => {
  test('is rendered', () => {
    const component = render(
      <WuiHighlight {...requiredProps} search="">
        value
      </WuiHighlight>
    );

    expect(component).toMatchSnapshot();
  });

  describe('behavior', () => {
    describe('matching', () => {
      test('only applies to first match', () => {
        const component = render(
          <WuiHighlight search="match">match match match</WuiHighlight>
        );

        expect(component).toMatchSnapshot();
      });

      test('applies to all matches', () => {
        const component = render(
          <WuiHighlight search="match" highlightAll>
            match match match
          </WuiHighlight>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('loose matching', () => {
      test('matches strings with different casing', () => {
        const component = render(
          <WuiHighlight search="CASE">different case match</WuiHighlight>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('strict matching', () => {
      test("doesn't match strings with different casing", () => {
        const component = render(
          <WuiHighlight search="CASE" strict>
            different case match
          </WuiHighlight>
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
