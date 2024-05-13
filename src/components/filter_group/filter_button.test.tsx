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

import { WuiFilterButton } from './filter_button';

describe('WuiFilterButton', () => {
  test('is rendered', () => {
    const component = render(<WuiFilterButton {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('renders zero properly', () => {
    const component = render(
      <WuiFilterButton {...requiredProps} numFilters={0} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('iconType and iconSide', () => {
      it('is rendered', () => {
        const component = render(
          <WuiFilterButton iconType="user" iconSide="right" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('numFilters', () => {
      it('is rendered', () => {
        const component = render(<WuiFilterButton numFilters={5} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('numActiveFilters and hasActiveFilters', () => {
      it('is rendered', () => {
        const component = render(
          <WuiFilterButton numActiveFilters={5} hasActiveFilters />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isSelected', () => {
      it('is rendered', () => {
        const component = render(<WuiFilterButton isSelected />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(<WuiFilterButton isDisabled />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('type', () => {
      it('is rendered', () => {
        const component = render(<WuiFilterButton type="button" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('grow', () => {
      it('can be turned off', () => {
        const component = render(<WuiFilterButton grow={false} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('withNext', () => {
      it('is rendered', () => {
        const component = render(<WuiFilterButton withNext />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
