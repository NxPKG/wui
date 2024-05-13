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
import { findTestSubject, requiredProps } from '../../test';

import { COLORS, WuiToast } from './toast';

describe('WuiToast', () => {
  test('is rendered', () => {
    const component = render(
      <WuiToast {...requiredProps} title="test title">
        <p>Hi</p>
      </WuiToast>
    );

    expect(component).toMatchSnapshot();
  });

  describe('Props', () => {
    describe('title', () => {
      test('is rendered', () => {
        const component = <WuiToast title="toast title" />;
        expect(mount(component)).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach(color => {
        test(`${color} is rendered`, () => {
          const component = <WuiToast color={color} title="test title" />;
          expect(mount(component)).toMatchSnapshot();
        });
      });
    });

    describe('iconType', () => {
      test('is rendered', () => {
        const component = <WuiToast iconType="user" title="test title" />;
        expect(mount(component)).toMatchSnapshot();
      });
    });

    describe('onClose', () => {
      test('is called when the close button is clicked', () => {
        const onCloseHandler = jest.fn();

        const component = mount(
          <WuiToast onClose={onCloseHandler} title="test title" />
        );
        const closeButton = findTestSubject(component, 'toastCloseButton');
        closeButton.simulate('click');

        expect(onCloseHandler).toBeCalledTimes(1);
      });
    });
  });
});
