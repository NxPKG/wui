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
import { requiredProps, findTestSubject } from '../../../test';

import { WuiTabbedContent, AUTOFOCUS } from './tabbed_content';

// Mock the htmlIdGenerator to generate predictable ids for snapshot tests
jest.mock('../../../services/accessibility/html_id_generator', () => ({
  htmlIdGenerator: () => {
    return () => 42;
  },
}));

const wazuhsearchTab = {
  id: 'es',
  name: 'Wazuhsearch',
  content: <p>Wazuhsearch content</p>,
};

const wazuhTab = {
  id: 'wazuh',
  name: <strong>Wazuh</strong>,
  'data-test-subj': 'wazuhTab',
  content: <p>Wazuh content</p>,
};

const tabs = [wazuhsearchTab, wazuhTab];

describe('WuiTabbedContent', () => {
  test('is rendered with required props and tabs', () => {
    const component = render(
      <WuiTabbedContent {...requiredProps} tabs={tabs} />
    );
    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('onTabClick', () => {
      test('is called when a tab is clicked', () => {
        const onTabClickHandler = jest.fn();
        const component = mount(
          <WuiTabbedContent onTabClick={onTabClickHandler} tabs={tabs} />
        );
        findTestSubject(component, 'wazuhTab').simulate('click');
        expect(onTabClickHandler).toBeCalledTimes(1);
        expect(onTabClickHandler).toBeCalledWith(wazuhTab);
      });
    });

    describe('selectedTab', () => {
      test('renders a selected tab', () => {
        const component = render(
          <WuiTabbedContent selectedTab={wazuhTab} tabs={tabs} />
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('initialSelectedTab', () => {
      test('renders a selected tab', () => {
        const component = render(
          <WuiTabbedContent initialSelectedTab={wazuhTab} tabs={tabs} />
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('size', () => {
      test('can be small', () => {
        const component = render(<WuiTabbedContent size="s" tabs={tabs} />);
        expect(component).toMatchSnapshot();
      });
    });

    describe('display', () => {
      test('can be condensed', () => {
        const component = render(
          <WuiTabbedContent display="condensed" tabs={tabs} />
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('autoFocus', () => {
      AUTOFOCUS.forEach(focusType => {
        test(`${focusType} is rendered`, () => {
          const component = render(
            <WuiTabbedContent autoFocus={focusType} tabs={tabs} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });

  describe('behavior', () => {
    test("when selected tab state isn't controlled by the owner, select the first tab by default", () => {
      const component = render(<WuiTabbedContent tabs={tabs} />);
      expect(component).toMatchSnapshot();
    });

    test('when uncontrolled, the selected tab should update if it receives new content', () => {
      const tabs = [
        wazuhsearchTab,
        {
          ...wazuhTab,
        },
      ];
      const component = mount(<WuiTabbedContent tabs={tabs} />);

      component
        .find('WuiTab[id="wazuh"] button')
        .first()
        .simulate('click');

      component.setProps({
        tabs: [
          wazuhsearchTab,
          {
            ...wazuhTab,
            content: <p>updated Wazuh content</p>,
          },
        ],
      });

      expect(component).toMatchSnapshot();
    });
  });
});
