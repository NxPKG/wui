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
import { render, shallow } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { WuiHeaderSectionItemButton } from './header_section_item_button';

describe('WuiHeaderSectionItemButton', () => {
  test('is rendered', () => {
    const component = render(<WuiHeaderSectionItemButton {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('renders children', () => {
    const component = render(
      <WuiHeaderSectionItemButton>
        <span>Ahoy!</span>
      </WuiHeaderSectionItemButton>
    );

    expect(component).toMatchSnapshot();
  });

  describe('renders notification', () => {
    test('as a badge', () => {
      const component = render(<WuiHeaderSectionItemButton notification="1" />);

      expect(component).toMatchSnapshot();
    });

    test('as a dot', () => {
      const component = render(
        <WuiHeaderSectionItemButton notification={true} />
      );

      expect(component).toMatchSnapshot();
    });

    test('color', () => {
      const component = render(
        <WuiHeaderSectionItemButton
          notification="1"
          notificationColor="subdued"
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('onClick', () => {
    test("isn't called upon instantiation", () => {
      const onClickHandler = jest.fn();

      shallow(<WuiHeaderSectionItemButton onClick={onClickHandler} />);

      expect(onClickHandler).not.toHaveBeenCalled();
    });

    test('is called when the button is clicked', () => {
      const onClickHandler = jest.fn();

      const $button = shallow(
        <WuiHeaderSectionItemButton onClick={onClickHandler} />
      );

      $button.simulate('click');

      expect(onClickHandler).toHaveBeenCalledTimes(1);
    });
  });
});
