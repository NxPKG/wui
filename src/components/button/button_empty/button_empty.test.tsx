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
import { requiredProps } from '../../../test/required_props';

import { WuiButtonEmpty, COLORS, SIZES, FLUSH_TYPES } from './button_empty';
import { ICON_SIDES } from '../button_content';

describe('WuiButtonEmpty', () => {
  test('is rendered', () => {
    const component = render(
      <WuiButtonEmpty {...requiredProps}>Content</WuiButtonEmpty>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(<WuiButtonEmpty isDisabled />);

        expect(component).toMatchSnapshot();
      });

      it('renders a button even when href is defined', () => {
        const component = render(<WuiButtonEmpty href="#" isDisabled />);

        expect(component).toMatchSnapshot();
      });

      it('renders if passed simply as disabled', () => {
        const component = render(<WuiButtonEmpty disabled />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('isLoading', () => {
      it('is rendered', () => {
        const component = render(<WuiButtonEmpty isLoading />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const component = render(<WuiButtonEmpty iconType="user" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach(color => {
        test(`${color} is rendered`, () => {
          const component = render(<WuiButtonEmpty color={color} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('size', () => {
      SIZES.forEach(size => {
        test(`${size} is rendered`, () => {
          const component = render(<WuiButtonEmpty size={size} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('iconSide', () => {
      ICON_SIDES.forEach(iconSide => {
        test(`${iconSide} is rendered`, () => {
          const component = render(
            <WuiButtonEmpty iconType="user" iconSide={iconSide}>
              Content
            </WuiButtonEmpty>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('flush', () => {
      FLUSH_TYPES.forEach(flushType => {
        test(`${flushType} is rendered`, () => {
          const component = render(<WuiButtonEmpty flush={flushType} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('href', () => {
      it('secures the rel attribute when the target is _blank', () => {
        const component = render(<WuiButtonEmpty href="#" target="_blank" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick and href', () => {
        const handler = jest.fn();
        const component = mount(<WuiButtonEmpty href="#" onClick={handler} />);
        component.find('a').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });

      it('supports onClick as a button', () => {
        const handler = jest.fn();
        const component = mount(<WuiButtonEmpty onClick={handler} />);
        component.find('button').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });
    });

    test('contentProps is rendered', () => {
      const component = render(
        <WuiButtonEmpty contentProps={requiredProps}>Content</WuiButtonEmpty>
      );

      expect(component).toMatchSnapshot();
    });

    test('textProps is rendered', () => {
      const component = render(
        <WuiButtonEmpty textProps={requiredProps}>Content</WuiButtonEmpty>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
