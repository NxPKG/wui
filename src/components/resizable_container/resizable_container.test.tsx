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
import { requiredProps } from '../../test';

import { WuiResizableContainer } from './resizable_container';

jest.mock('../../services/accessibility', () => ({
  htmlIdGenerator: () => () => 'generated-id',
}));

describe('WuiResizableContainer', () => {
  test('is rendered', () => {
    const component = render(
      <WuiResizableContainer {...requiredProps}>
        {(WuiResizablePanel, WuiResizableButton) => (
          <>
            <WuiResizablePanel initialSize={50}>Testing</WuiResizablePanel>
            <WuiResizableButton />
            <WuiResizablePanel initialSize={50}>123</WuiResizablePanel>
          </>
        )}
      </WuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can be vertical', () => {
    const component = render(
      <WuiResizableContainer {...requiredProps} direction="vertical">
        {(WuiResizablePanel, WuiResizableButton) => (
          <>
            <WuiResizablePanel initialSize={50}>Testing</WuiResizablePanel>
            <WuiResizableButton />
            <WuiResizablePanel initialSize={50}>123</WuiResizablePanel>
          </>
        )}
      </WuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can be controlled externally', () => {
    const panel1 = 50;
    const panel2 = 50;
    const component = render(
      <WuiResizableContainer {...requiredProps}>
        {(WuiResizablePanel, WuiResizableButton) => (
          <>
            <WuiResizablePanel size={panel1}>Testing</WuiResizablePanel>
            <WuiResizableButton />
            <WuiResizablePanel size={panel2}>123</WuiResizablePanel>
          </>
        )}
      </WuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can have scrollable panels', () => {
    const component = render(
      <WuiResizableContainer {...requiredProps}>
        {(WuiResizablePanel, WuiResizableButton) => (
          <>
            <WuiResizablePanel initialSize={50} scrollable>
              Testing
            </WuiResizablePanel>
            <WuiResizableButton />
            <WuiResizablePanel initialSize={50} scrollable>
              123
            </WuiResizablePanel>
          </>
        )}
      </WuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can have more than two panels', () => {
    const component = render(
      <WuiResizableContainer {...requiredProps}>
        {(WuiResizablePanel, WuiResizableButton) => (
          <>
            <WuiResizablePanel initialSize={33}>Testing</WuiResizablePanel>
            <WuiResizableButton />
            <WuiResizablePanel initialSize={33}>123</WuiResizablePanel>
            <WuiResizableButton />
            <WuiResizablePanel initialSize={33}>And again</WuiResizablePanel>
          </>
        )}
      </WuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can adjust button spacing', () => {
    const component = render(
      <WuiResizableContainer {...requiredProps}>
        {(WuiResizablePanel, WuiResizableButton) => (
          <>
            <WuiResizablePanel initialSize={50}>Testing</WuiResizablePanel>
            <WuiResizableButton size="s" />
            <WuiResizablePanel initialSize={50}>123</WuiResizablePanel>
          </>
        )}
      </WuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });
});
