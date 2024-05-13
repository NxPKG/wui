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
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { WuiFacetButton } from './facet_button';
import { WuiIcon } from '../icon';

describe('WuiFacetButton', () => {
  test('is rendered', () => {
    const component = render(
      <WuiFacetButton {...requiredProps}>Content</WuiFacetButton>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(
          <WuiFacetButton isDisabled>Content</WuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isLoading', () => {
      it('is rendered', () => {
        const component = render(
          <WuiFacetButton isLoading>Content</WuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isSelected', () => {
      it('is rendered', () => {
        const component = render(
          <WuiFacetButton isSelected>Content</WuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('quantity', () => {
      it('is rendered', () => {
        const component = render(
          <WuiFacetButton quantity={60}>Content</WuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('icon', () => {
      it('is rendered', () => {
        const component = render(
          <WuiFacetButton icon={<WuiIcon type="dot" />}>Content</WuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick', () => {
        const handler = jest.fn();
        const component = mount(
          <WuiFacetButton onClick={handler}>Content</WuiFacetButton>
        );
        component.find('button').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });
    });
  });
});
