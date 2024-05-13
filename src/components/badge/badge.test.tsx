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
import { requiredProps } from '../../test/required_props';

import { WuiBadge, COLORS, ICON_SIDES } from './badge';

describe('WuiBadge', () => {
  test('is rendered', () => {
    const component = render(<WuiBadge {...requiredProps}>Content</WuiBadge>);

    expect(component).toMatchSnapshot();
  });

  test('is disabled', () => {
    const component = render(
      <WuiBadge isDisabled {...requiredProps}>
        Content
      </WuiBadge>
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with onClick provided', () => {
    const component = render(
      <WuiBadge
        {...requiredProps}
        onClick={jest.fn()}
        onClickAriaLabel="Example of onclick event for the button">
        Content
      </WuiBadge>
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with href provided', () => {
    const component = render(
      <WuiBadge {...requiredProps} href="/#/">
        Content
      </WuiBadge>
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with iconOnClick provided', () => {
    const component = render(
      <WuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the button">
        Content
      </WuiBadge>
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with iconOnClick and onClick provided', () => {
    const component = render(
      <WuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the button"
        onClick={jest.fn()}
        onClickAriaLabel="Example of onclick event for the button">
        Content
      </WuiBadge>
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with iconOnClick and href provided', () => {
    const component = render(
      <WuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the anchor"
        href="/#/">
        Content
      </WuiBadge>
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with href and rel provided', () => {
    const component = render(
      <WuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the anchor"
        href="/#/"
        rel="noopener">
        Content
      </WuiBadge>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('iconType', () => {
      it('is rendered', () => {
        const component = render(<WuiBadge iconType="user">Content</WuiBadge>);

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach(color => {
        it(`${color} is rendered`, () => {
          const component = render(<WuiBadge color={color}>Content</WuiBadge>);

          expect(component).toMatchSnapshot();
        });
      });

      it('accepts rgba', () => {
        const component = render(
          <WuiBadge color="rgba(255,255,255,1)">Content</WuiBadge>
        );

        expect(component).toMatchSnapshot();
      });

      it('accepts hex', () => {
        const component = render(<WuiBadge color="#333">Content</WuiBadge>);

        expect(component).toMatchSnapshot();
      });
    });

    describe('iconSide', () => {
      ICON_SIDES.forEach(iconSide => {
        it(`${iconSide} is rendered`, () => {
          const component = render(
            <WuiBadge iconType="user" iconSide={iconSide}>
              Content
            </WuiBadge>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('style', () => {
      const style = { border: '4px solid tomato' };

      it('is rendered', () => {
        const component = render(<WuiBadge style={style}>Content</WuiBadge>);

        expect(component).toMatchSnapshot();
      });

      COLORS.forEach(color => {
        it(`is rendered with ${color}`, () => {
          const component = render(
            <WuiBadge style={style} color={color}>
              Content
            </WuiBadge>
          );

          expect(component).toMatchSnapshot();
        });
      });

      it('is rendered with hollow', () => {
        const component = render(
          <WuiBadge style={style} color="hollow">
            Content
          </WuiBadge>
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
