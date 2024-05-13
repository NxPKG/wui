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
import { mount, ReactWrapper } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { WuiCodeBlockImpl } from './_code_block';

function snapshotCodeBlock(component: ReactWrapper) {
  // Get the Portal's sibling and return its html
  const renderedHtml = component.find('Portal + *').html();
  const container = document.createElement('div');
  container.innerHTML = renderedHtml;
  return container.firstChild;
}

const code = `var some = 'code';
console.log(some);`;

describe('WuiCodeBlockImpl', () => {
  describe('inline', () => {
    test('renders an inline code tag', () => {
      const component = mount(
        <WuiCodeBlockImpl inline={true} {...requiredProps}>
          {code}
        </WuiCodeBlockImpl>
      );

      expect(snapshotCodeBlock(component)).toMatchSnapshot();
    });

    test('highlights javascript code, adding "js" class', () => {
      const component = mount(<WuiCodeBlockImpl inline={true} language="js" />);

      expect(snapshotCodeBlock(component)).toMatchSnapshot();
    });

    test('renders with transparent background', () => {
      const component = mount(
        <WuiCodeBlockImpl inline={true} transparentBackground={true} />
      );

      expect(snapshotCodeBlock(component)).toMatchSnapshot();
    });
  });

  describe('block', () => {
    test('renders a pre block tag', () => {
      const component = mount(
        <WuiCodeBlockImpl inline={false} {...requiredProps}>
          {code}
        </WuiCodeBlockImpl>
      );

      expect(snapshotCodeBlock(component)).toMatchSnapshot();
    });

    test('highlights javascript code, adding "js" class', () => {
      const component = mount(
        <WuiCodeBlockImpl inline={false} language="js" />
      );

      expect(snapshotCodeBlock(component)).toMatchSnapshot();
    });

    test('renders with transparent background', () => {
      const component = mount(
        <WuiCodeBlockImpl inline={false} transparentBackground={true} />
      );

      expect(snapshotCodeBlock(component)).toMatchSnapshot();
    });

    test('renders a pre block tag with a css class modifier', () => {
      const component = mount(
        <WuiCodeBlockImpl inline={false} whiteSpace="pre" {...requiredProps}>
          {code}
        </WuiCodeBlockImpl>
      );
      expect(snapshotCodeBlock(component)).toMatchSnapshot();
    });
  });
});
