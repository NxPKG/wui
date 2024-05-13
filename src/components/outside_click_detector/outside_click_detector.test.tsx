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

import React, { EventHandler, MouseEvent as ReactMouseEvent } from 'react';
import { render, mount } from 'enzyme';

import { WuiOutsideClickDetector, WuiEvent } from './outside_click_detector';

describe('WuiOutsideClickDetector', () => {
  test('is rendered', () => {
    const component = render(
      <WuiOutsideClickDetector onOutsideClick={() => {}}>
        <div />
      </WuiOutsideClickDetector>
    );

    expect(component).toMatchSnapshot();
  });

  describe('behavior', () => {
    test('nested detectors', () => {
      const unrelatedDetector = jest.fn();
      const parentDetector = jest.fn();
      const childDetector = jest.fn();

      // enzyme doesn't mount the components into the global jsdom `document`
      // but that's where the click detector listener is,
      // pass the top-level mounted component's click event on to document
      const triggerDocumentMouseDown: EventHandler<any> = (
        e: ReactMouseEvent<any, WuiEvent>
      ) => {
        const event = new Event('mousedown') as WuiEvent;
        event.wuiGeneratedBy = e.nativeEvent.wuiGeneratedBy;
        document.dispatchEvent(event);
      };

      const triggerDocumentMouseUp: EventHandler<any> = (
        e: ReactMouseEvent<any, WuiEvent>
      ) => {
        const event = new Event('mouseup') as WuiEvent;
        event.wuiGeneratedBy = e.nativeEvent.wuiGeneratedBy;
        document.dispatchEvent(event);
      };

      const component = mount(
        <div
          onMouseDown={triggerDocumentMouseDown}
          onMouseUp={triggerDocumentMouseUp}>
          <div>
            <WuiOutsideClickDetector onOutsideClick={parentDetector}>
              <div>
                <WuiOutsideClickDetector onOutsideClick={childDetector}>
                  <div data-test-subj="target" />
                </WuiOutsideClickDetector>
              </div>
            </WuiOutsideClickDetector>
          </div>

          <WuiOutsideClickDetector onOutsideClick={unrelatedDetector}>
            <div />
          </WuiOutsideClickDetector>
        </div>
      );

      component.find('[data-test-subj="target"]').simulate('mousedown');
      component.find('[data-test-subj="target"]').simulate('mouseup');

      expect(unrelatedDetector).toHaveBeenCalledTimes(1);
      expect(parentDetector).toHaveBeenCalledTimes(0);
      expect(childDetector).toHaveBeenCalledTimes(0);
    });
  });
});
