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
import { shallow, render, mount } from 'enzyme';
import { requiredProps } from '../../../test';

import { WuiFormRow, DISPLAYS } from './form_row';

jest.mock('./../../../services/accessibility', () => ({
  htmlIdGenerator: () => () => 'generated-id',
}));

describe('WuiFormRow', () => {
  test('is rendered', () => {
    const component = render(
      <WuiFormRow {...requiredProps}>
        <input />
      </WuiFormRow>
    );

    expect(component).toMatchSnapshot();
  });

  test('ties together parts for accessibility', () => {
    const props = {
      label: 'Label',
      helpText: 'Help text',
      isInvalid: true,
      error: ['Error one', 'Error two'],
    };

    const tree = shallow(
      <WuiFormRow {...requiredProps} {...props}>
        <input />
      </WuiFormRow>
    );

    // Input is labeled by the label.
    expect(tree.find('input').prop('id')).toEqual('generated-id');
    expect(tree.find('WuiFormLabel').prop('htmlFor')).toEqual('generated-id');

    // Input is described by help and error text.
    expect(tree.find('WuiFormHelpText').prop('id')).toEqual(
      'generated-id-help'
    );
    expect(
      tree
        .find('WuiFormErrorText')
        .at(0)
        .prop('id')
    ).toEqual('generated-id-error-0');
    expect(
      tree
        .find('WuiFormErrorText')
        .at(1)
        .prop('id')
    ).toEqual('generated-id-error-1');
    expect(tree.find('input').prop('aria-describedby')).toEqual(
      'generated-id-help generated-id-error-0 generated-id-error-1'
    );
  });

  describe('props', () => {
    test('label is rendered', () => {
      const component = shallow(
        <WuiFormRow label="label">
          <input />
        </WuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('label append is rendered', () => {
      const component = shallow(
        <WuiFormRow label="label" labelAppend="append">
          <input />
        </WuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('label renders as a legend and subsquently a fieldset wrapper', () => {
      const component = shallow(
        <WuiFormRow label="label" labelType="legend">
          <input />
        </WuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('describedByIds is rendered', () => {
      const component = shallow(
        <WuiFormRow describedByIds={['generated-id-additional']}>
          <input />
        </WuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('id is rendered', () => {
      const component = render(
        <WuiFormRow id="id">
          <input />
        </WuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('isInvalid is rendered', () => {
      const component = render(
        <WuiFormRow isInvalid label="label">
          <input />
        </WuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('error as string is rendered', () => {
      const component = render(
        <WuiFormRow error="Error" isInvalid={true}>
          <input />
        </WuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('error as array is rendered', () => {
      const component = render(
        <WuiFormRow error={['Error', 'Error2']} isInvalid={true}>
          <input />
        </WuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('error is not rendered if isInvalid is false', () => {
      const component = render(
        <WuiFormRow error={['Error']} isInvalid={false}>
          <input />
        </WuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('helpText is rendered', () => {
      const component = render(
        <WuiFormRow helpText={<span>This is help text.</span>}>
          <input />
        </WuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('hasEmptyLabelSpace is rendered', () => {
      const component = render(
        <WuiFormRow hasEmptyLabelSpace>
          <input />
        </WuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const component = render(
        <WuiFormRow fullWidth>
          <input />
        </WuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('displayOnly is rendered', () => {
      const component = render(
        <WuiFormRow displayOnly>
          <span>just some text</span>
        </WuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    describe('compressed', () => {
      test('is rendered', () => {
        const component = render(
          <WuiFormRow compressed>
            <input />
          </WuiFormRow>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('display type', () => {
      DISPLAYS.forEach(display => {
        test(`${display} is rendered`, () => {
          const component = render(
            <WuiFormRow display={display}>
              <input />
            </WuiFormRow>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });

  describe('behavior', () => {
    describe('onFocus', () => {
      test('is called in child', () => {
        const focusMock = jest.fn();

        const component = mount(
          <WuiFormRow label={<span>Label</span>}>
            <input onFocus={focusMock} />
          </WuiFormRow>
        );

        component.find('input').simulate('focus');

        expect(focusMock).toBeCalledTimes(1);

        // Ensure the focus event is properly fired on the parent
        // which will pass down to the WuiFormLabel
        expect(component).toMatchSnapshot();
      });

      test('works in parent even if not in child', () => {
        const component = mount(
          <WuiFormRow label={<span>Label</span>}>
            <input />
          </WuiFormRow>
        );

        component.find('input').simulate('focus');

        // Ensure the focus event is properly fired on the parent
        // which will pass down to the WuiFormLabel
        expect(component).toMatchSnapshot();
      });
    });

    describe('onBlur', () => {
      test('is called in child', () => {
        const blurMock = jest.fn();

        const component = mount(
          <WuiFormRow label={<span>Label</span>}>
            <input onBlur={blurMock} />
          </WuiFormRow>
        );

        component.find('input').simulate('blur');

        expect(blurMock).toBeCalledTimes(1);

        // Ensure the blur event is properly fired on the parent
        // which will pass down to the WuiFormLabel
        expect(component).toMatchSnapshot();
      });

      test('works in parent even if not in child', () => {
        const component = mount(
          <WuiFormRow label={<span>Label</span>}>
            <input />
          </WuiFormRow>
        );

        component.find('input').simulate('blur');

        // Ensure the blur event is properly fired on the parent
        // which will pass down to the WuiFormLabel
        expect(component).toMatchSnapshot();
      });
    });
  });
});
