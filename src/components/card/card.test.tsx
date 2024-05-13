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
import { requiredProps } from '../../test';

import { WuiCard, SIZES } from './card';

import { WuiIcon } from '../icon';

jest.mock('./../../services/accessibility', () => ({
  htmlIdGenerator: () => () => 'generated-id',
}));

describe('WuiCard', () => {
  test('is rendered', () => {
    const component = render(
      <WuiCard
        title="Card title"
        description="Card description"
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('icon', () => {
      const component = render(
        <WuiCard
          title="Card title"
          description="Card description"
          icon={<WuiIcon className="myIconClass" type="apmApp" />}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('a null icon', () => {
      const component = render(
        <WuiCard
          title="Card title"
          description="Card description"
          icon={null}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('horizontal', () => {
      const component = render(
        <WuiCard
          title="Card title"
          description="Card description"
          layout="horizontal"
        />
      );

      expect(component).toMatchSnapshot();
    });

    describe('href', () => {
      it('supports href as a link', () => {
        const component = mount(
          <WuiCard title="Hoi" description="There" href="#" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick as a link', () => {
        const handler = jest.fn();
        const component = mount(
          <WuiCard title="Hoi" description="There" href="#" onClick={handler} />
        );
        component.find('a').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });

      it('supports onClick as a button', () => {
        const handler = jest.fn();
        const component = mount(
          <WuiCard title="Hoi" description="There" onClick={handler} />
        );
        component.find('button').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });
    });

    test('titleElement', () => {
      const component = render(
        <WuiCard
          title="Card title"
          description="Card description"
          titleElement="h4"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('titleSize', () => {
      const component = render(
        <WuiCard
          title="Card title"
          description="Card description"
          titleSize="xs"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('footer', () => {
      const component = render(
        <WuiCard
          title="Card title"
          description="Card description"
          footer={<span>Footer</span>}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('children', () => {
      const component = render(
        <WuiCard title="Card title" description="Card description">
          Child
        </WuiCard>
      );

      expect(component).toMatchSnapshot();
    });

    test('textAlign', () => {
      const component = render(
        <WuiCard
          title="Card title"
          description="Card description"
          textAlign="right"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('display', () => {
      const component = render(
        <WuiCard
          title="Card title"
          description="Card description"
          display="plain"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('selectable', () => {
      const component = render(
        <WuiCard
          title="Card title"
          description="Card description"
          selectable={{
            onClick: () => {},
          }}
        />
      );

      expect(component).toMatchSnapshot();
    });

    describe('paddingSize', () => {
      SIZES.forEach(size => {
        test(`${size} is applied`, () => {
          const component = render(
            <WuiCard
              title="Card title"
              description="Card description"
              paddingSize={size}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
