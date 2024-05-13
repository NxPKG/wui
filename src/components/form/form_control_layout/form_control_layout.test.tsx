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

import { findTestSubject, requiredProps } from '../../../test';

import { WuiFormControlLayout, ICON_SIDES } from './form_control_layout';

jest.mock('../../', () => ({
  WuiIcon: 'wui_icon',
  WuiLoadingSpinner: 'wui_loading_spinner',
}));

describe('WuiFormControlLayout', () => {
  test('is rendered', () => {
    const component = render(
      <WuiFormControlLayout {...requiredProps}>
        <input />
      </WuiFormControlLayout>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('icon', () => {
      describe('is rendered', () => {
        test('as a string', () => {
          const component = render(<WuiFormControlLayout icon="alert" />);

          expect(component).toMatchSnapshot();
        });

        test('as an object', () => {
          const icon = {
            type: 'alert',
            className: 'customClass',
            'data-test-subj': 'myIcon',
          };

          const component = render(<WuiFormControlLayout icon={icon} />);

          expect(component).toMatchSnapshot();
        });
      });

      describe('side', () => {
        ICON_SIDES.forEach(side => {
          test(`${side} is rendered`, () => {
            const icon = {
              type: 'alert',
              side,
            };

            const component = render(<WuiFormControlLayout icon={icon} />);

            expect(component).toMatchSnapshot();
          });
        });
      });

      describe('onClick', () => {
        test('is called when clicked', () => {
          const icon = {
            type: 'alert',
            onClick: jest.fn(),
            'data-test-subj': 'myIcon',
          };

          const component = mount(<WuiFormControlLayout icon={icon} />);

          const closeButton = findTestSubject(component, 'myIcon');
          closeButton.simulate('click');
          expect(icon.onClick).toBeCalled();
        });
      });
    });

    describe('clear', () => {
      describe('onClick', () => {
        test('is rendered', () => {
          const clear = {
            onClick: () => {},
            className: 'customClass',
            'data-test-subj': 'clearButton',
          };

          const component = render(<WuiFormControlLayout clear={clear} />);

          expect(component).toMatchSnapshot();
        });

        test('is called when clicked', () => {
          const clear = {
            onClick: jest.fn(),
            'data-test-subj': 'clearButton',
          };

          const component = mount(<WuiFormControlLayout clear={clear} />);

          const closeButton = findTestSubject(component, 'clearButton');
          closeButton.simulate('click');
          expect(clear.onClick).toBeCalled();
        });
      });
    });

    test('isLoading is rendered', () => {
      const component = render(<WuiFormControlLayout isLoading />);

      expect(component).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const component = render(<WuiFormControlLayout fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('readOnly is rendered', () => {
      const component = render(<WuiFormControlLayout readOnly />);

      expect(component).toMatchSnapshot();
    });

    test('one prepend node is rendered', () => {
      const component = render(
        <WuiFormControlLayout prepend={<span>1</span>} />
      );

      expect(component).toMatchSnapshot();
    });

    test('one prepend node is rendered with className', () => {
      const component = render(
        <WuiFormControlLayout prepend={<span className="myClass">1</span>} />
      );

      expect(component).toMatchSnapshot();
    });

    test('one prepend string is rendered', () => {
      const component = render(<WuiFormControlLayout prepend="1" />);

      expect(component).toMatchSnapshot();
    });

    test('one append node is rendered', () => {
      const component = render(
        <WuiFormControlLayout append={<span>1</span>} />
      );

      expect(component).toMatchSnapshot();
    });

    test('one append string is rendered', () => {
      const component = render(<WuiFormControlLayout append="1" />);

      expect(component).toMatchSnapshot();
    });

    test('multiple prepends are rendered', () => {
      const component = render(
        <WuiFormControlLayout prepend={[<span>1</span>, <span>2</span>]} />
      );

      expect(component).toMatchSnapshot();
    });

    test('multiple appends are rendered', () => {
      const component = render(
        <WuiFormControlLayout append={[<span>1</span>, <span>2</span>]} />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
