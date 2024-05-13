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

import { WuiListGroupItem, SIZES, COLORS } from './list_group_item';

describe('WuiListGroupItem', () => {
  test('is rendered', () => {
    const component = render(<WuiListGroupItem label="Label" />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('size', () => {
      SIZES.forEach(size => {
        test(`${size} is rendered`, () => {
          const component = render(
            <WuiListGroupItem label="Label" size={size} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('color', () => {
      COLORS.forEach(color => {
        test(`${color} is rendered`, () => {
          const component = render(
            <WuiListGroupItem label="Label" color={color} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('isActive', () => {
      test('is rendered', () => {
        const component = render(<WuiListGroupItem label="Label" isActive />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      test('is rendered', () => {
        const component = render(<WuiListGroupItem label="Label" isDisabled />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      test('is rendered', () => {
        const component = render(
          <WuiListGroupItem label="Label" iconType="empty" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('icon', () => {
      test('is rendered', () => {
        const component = render(
          <WuiListGroupItem label="Label" icon={<span />} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    // TODO: This keeps re-rendering differently because of fake id creation
    // describe('showToolTip', () => {
    //   test('is rendered', () => {
    //     const component = render(
    //       <WuiListGroupItem label="Label" showToolTip />
    //     );

    //     expect(component).toMatchSnapshot();
    //   });
    // });

    describe('wrapText', () => {
      test('is rendered', () => {
        const component = render(<WuiListGroupItem label="Label" wrapText />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('extraAction', () => {
      test('is rendered', () => {
        const component = render(
          <WuiListGroupItem
            label="Label"
            extraAction={{
              iconType: 'empty',
              alwaysShow: true,
              'aria-label': 'label',
            }}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('href', () => {
      test('is rendered', () => {
        const component = render(<WuiListGroupItem label="Label" href="#" />);

        expect(component).toMatchSnapshot();
      });

      test('is rendered with rel', () => {
        const component = render(
          <WuiListGroupItem label="Label" href="#" rel="noreferrer" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      test('is rendered', () => {
        const component = render(
          <WuiListGroupItem label="Label" onClick={() => {}} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('href and onClick', () => {
      test('is rendered', () => {
        const component = render(
          <WuiListGroupItem label="" onClick={() => {}} href="#" />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });

  test('renders a disabled button even if provided an href', () => {
    const component = render(
      <WuiListGroupItem label="Label" isDisabled href="#" />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders a disabled button even if provided an href', () => {
    const component = render(
      <WuiListGroupItem label="Label" isDisabled href="#" />
    );

    expect(component).toMatchSnapshot();
  });

  describe('throws a warning', () => {
    const oldConsoleError = console.warn;
    let consoleStub: jest.Mock;

    beforeEach(() => {
      // We don't use jest.spyOn() here, because WUI's tests apply a global
      // console.error() override that throws an exception. For these
      // tests, we just want to know if console.error() was called.
      console.warn = consoleStub = jest.fn();
    });

    afterEach(() => {
      console.warn = oldConsoleError;
    });

    test('if both iconType and icon are provided but still renders', () => {
      const component = render(
        <WuiListGroupItem label="" iconType="empty" icon={<span />} />
      );

      expect(consoleStub).toBeCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        '`iconType` and `icon` were passed'
      );
      expect(component).toMatchSnapshot();
    });
  });
});
