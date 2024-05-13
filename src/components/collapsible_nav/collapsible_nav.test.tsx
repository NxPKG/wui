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
import { requiredProps, takeMountedSnapshot } from '../../test';

import { WuiCollapsibleNav } from './collapsible_nav';

jest.mock('../overlay_mask', () => ({
  WuiOverlayMask: ({ headerZindexLocation, ...props }: any) => (
    <div {...props} />
  ),
}));

const propsNeededToRender = { id: 'id', isOpen: true };

describe('WuiCollapsibleNav', () => {
  test('is rendered', () => {
    const component = mount(
      <WuiCollapsibleNav {...propsNeededToRender} {...requiredProps} />
    );

    expect(
      takeMountedSnapshot(component, {
        hasArrayOutput: true,
      })
    ).toMatchSnapshot();
  });

  describe('props', () => {
    test('onClose', () => {
      const component = mount(
        <WuiCollapsibleNav {...propsNeededToRender} onClose={() => {}} />
      );

      expect(
        takeMountedSnapshot(component, {
          hasArrayOutput: true,
        })
      ).toMatchSnapshot();
    });

    test('isDocked', () => {
      const component = render(
        <WuiCollapsibleNav {...propsNeededToRender} isDocked={true} />
      );

      expect(component).toMatchSnapshot();
    });

    test('dockedBreakpoint', () => {
      const component = mount(
        <WuiCollapsibleNav {...propsNeededToRender} dockedBreakpoint={500} />
      );

      expect(
        takeMountedSnapshot(component, {
          hasArrayOutput: true,
        })
      ).toMatchSnapshot();
    });

    test('button', () => {
      const component = mount(
        <WuiCollapsibleNav {...propsNeededToRender} button={<button />} />
      );

      expect(
        takeMountedSnapshot(component, {
          hasArrayOutput: true,
        })
      ).toMatchSnapshot();
    });

    test('showButtonIfDocked', () => {
      const component = mount(
        <WuiCollapsibleNav
          {...propsNeededToRender}
          button={<button />}
          isDocked={true}
          showButtonIfDocked={true}
        />
      );

      expect(
        takeMountedSnapshot(component, {
          hasArrayOutput: true,
        })
      ).toMatchSnapshot();
    });

    test('can alter mask props with maskProps without throwing error', () => {
      const component = mount(
        <WuiCollapsibleNav
          {...propsNeededToRender}
          maskProps={{ headerZindexLocation: 'above' }}
        />
      );

      expect(
        takeMountedSnapshot(component, {
          hasArrayOutput: true,
        })
      ).toMatchSnapshot();
    });
  });

  describe('close button', () => {
    test('can be hidden', () => {
      const component = mount(
        <WuiCollapsibleNav {...propsNeededToRender} showCloseButton={false} />
      );

      expect(
        takeMountedSnapshot(component, {
          hasArrayOutput: true,
        })
      ).toMatchSnapshot();
    });

    test('extends WuiButtonEmpty', () => {
      const component = mount(
        <WuiCollapsibleNav
          {...propsNeededToRender}
          closeButtonProps={{ className: 'class', 'data-test-subj': 'test' }}
        />
      );

      expect(
        takeMountedSnapshot(component, {
          hasArrayOutput: true,
        })
      ).toMatchSnapshot();
    });
  });

  test('does not render if isOpen is false', () => {
    const component = render(<WuiCollapsibleNav id="id" />);

    expect(component).toMatchSnapshot();
  });
});
