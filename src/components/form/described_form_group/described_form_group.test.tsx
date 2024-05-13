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
import { mount } from 'enzyme';
import { requiredProps } from '../../../test';

import { WuiFormRow } from '../form_row';
import { WuiDescribedFormGroup } from './described_form_group';

jest.mock('./../../../services/accessibility', () => ({
  htmlIdGenerator: () => () => 'generated-id',
}));

describe('WuiDescribedFormGroup', () => {
  const props = {
    title: <h3>Title</h3>,
    description: 'Test description',
  };

  test('is rendered', () => {
    const component = mount(
      <WuiDescribedFormGroup {...requiredProps} {...props}>
        <WuiFormRow>
          <input />
        </WuiFormRow>
      </WuiDescribedFormGroup>
    );

    expect(component).toMatchSnapshot();
  });

  test('ties together parts for accessibility', () => {
    const formRowProps = {
      label: 'Label',
      helpText: 'Help text',
      isInvalid: true,
      error: ['Error one', 'Error two'],
    };

    const tree = mount(
      <WuiDescribedFormGroup {...requiredProps} {...props}>
        <WuiFormRow {...formRowProps}>
          <input />
        </WuiFormRow>
      </WuiDescribedFormGroup>
    );

    expect(tree).toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth is rendered', () => {
      const describedFormGroupProps = {
        fullWidth: true,
      };

      const component = mount(
        <WuiDescribedFormGroup
          {...requiredProps}
          {...props}
          {...describedFormGroupProps}>
          <WuiFormRow fullWidth>
            <input />
          </WuiFormRow>
        </WuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });

    test('gutterSize is rendered', () => {
      const component = mount(
        <WuiDescribedFormGroup gutterSize="s" {...requiredProps} {...props}>
          <WuiFormRow>
            <input />
          </WuiFormRow>
        </WuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });

    test('titleSize is rendered', () => {
      const component = mount(
        <WuiDescribedFormGroup titleSize="l" {...requiredProps} {...props}>
          <WuiFormRow>
            <input />
          </WuiFormRow>
        </WuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });

    test("description is not rendered when it's not provided", () => {
      const component = mount(
        <WuiDescribedFormGroup {...requiredProps} title={<h3>Title</h3>}>
          <WuiFormRow>
            <input />
          </WuiFormRow>
        </WuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });

    test('props for the flex item containers are passed down', () => {
      const component = mount(
        <WuiDescribedFormGroup
          {...requiredProps}
          {...props}
          descriptionFlexItemProps={{ grow: 2 }}
          fieldFlexItemProps={{ component: 'section' }}>
          <WuiFormRow>
            <input />
          </WuiFormRow>
        </WuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
