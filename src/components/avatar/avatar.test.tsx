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

import { WuiAvatar, SIZES } from './avatar';

describe('WuiAvatar', () => {
  test('is rendered', () => {
    const component = render(<WuiAvatar name="name" {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('allows a name composed entirely of whitespace', () => {
    const component = render(<WuiAvatar name="  " {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('imageUrl', () => {
      it('is rendered', () => {
        const component = render(
          <WuiAvatar name="name" imageUrl="image url" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('size', () => {
      SIZES.forEach(size => {
        it(`${size} is rendered`, () => {
          const component = render(<WuiAvatar name="name" size={size} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('initials', () => {
      it('is rendered', () => {
        const component = render(<WuiAvatar name="name" initials="lo" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('initialsLength', () => {
      it('is rendered', () => {
        const component = render(<WuiAvatar name="name" initialsLength={2} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('type', () => {
      it('is rendered', () => {
        const component = render(<WuiAvatar name="name" type="space" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      it('is rendered', () => {
        const component = render(<WuiAvatar name="name" color="#000" />);

        expect(component).toMatchSnapshot();
      });
    });
  });

  test('should throw error if color is not a hex', () => {
    const component = () =>
      render(<WuiAvatar name="name" color="rgba(0,0,0,0)" />);

    expect(component).toThrowErrorMatchingSnapshot();
  });
});
