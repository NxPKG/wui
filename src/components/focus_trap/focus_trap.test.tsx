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

import React, { EventHandler } from 'react';
import { render, mount } from 'enzyme';

import { findTestSubject, takeMountedSnapshot } from '../../test';

import { WuiEvent } from '../outside_click_detector/outside_click_detector';
import { WuiFocusTrap } from './focus_trap';
import { WuiPortal } from '../portal';

describe('WuiFocusTrap', () => {
  test('is rendered', () => {
    const component = mount(
      <WuiFocusTrap>
        <div />
      </WuiFocusTrap>
    );

    expect(
      takeMountedSnapshot(component, { hasArrayOutput: true })
    ).toMatchSnapshot();
  });

  test('can be disabled', () => {
    const component = render(
      <WuiFocusTrap disabled>
        <div />
      </WuiFocusTrap>
    );

    expect(component).toMatchSnapshot();
  });

  test('accepts className and style', () => {
    const component = render(
      <WuiFocusTrap className="testing" style={{ height: '100%' }}>
        <div />
      </WuiFocusTrap>
    );

    expect(component).toMatchSnapshot();
  });

  describe('behavior', () => {
    describe('focus', () => {
      test('is set on the first focusable element by default', () => {
        const component = mount(
          <div>
            <input data-test-subj="outside" />
            <WuiFocusTrap>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
              </div>
            </WuiFocusTrap>
          </div>
        );

        expect(findTestSubject(component, 'input').getDOMNode()).toBe(
          document.activeElement
        );
      });

      test('will blur focus when negating `autoFocus`', () => {
        mount(
          <div>
            <input data-test-subj="outside" />
            <WuiFocusTrap autoFocus={false}>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
              </div>
            </WuiFocusTrap>
          </div>
        );

        expect(document.body).toBe(document.activeElement);
      });

      test('is set on the element identified by `data-autofocus`', () => {
        const component = mount(
          <div>
            <input data-test-subj="outside" />
            <WuiFocusTrap>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-autofocus data-test-subj="input2" />
              </div>
            </WuiFocusTrap>
          </div>
        );

        expect(findTestSubject(component, 'input2').getDOMNode()).toBe(
          document.activeElement
        );
      });
    });

    describe('clickOutsideDisables', () => {
      // enzyme doesn't mount the components into the global jsdom `document`
      // but that's where the click detector listener is,
      // pass the top-level mounted component's click event on to document
      const triggerDocumentMouseDown: EventHandler<any> = (
        e: React.MouseEvent<any, WuiEvent>
      ) => {
        const event = new Event('mousedown') as WuiEvent;
        event.wuiGeneratedBy = e.nativeEvent.wuiGeneratedBy;
        document.dispatchEvent(event);
      };

      const triggerDocumentMouseUp: EventHandler<any> = (
        e: React.MouseEvent<any, WuiEvent>
      ) => {
        const event = new Event('mouseup') as WuiEvent;
        event.wuiGeneratedBy = e.nativeEvent.wuiGeneratedBy;
        document.dispatchEvent(event);
      };

      test('trap remains enabled when false', () => {
        const component = mount(
          <div
            onMouseDown={triggerDocumentMouseDown}
            onMouseUp={triggerDocumentMouseUp}>
            <WuiFocusTrap>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
              </div>
            </WuiFocusTrap>
            <button data-test-subj="outside" />
          </div>
        );

        // The existence of `data-focus-lock-disabled=false` indicates that the trap is enabled.
        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
        findTestSubject(component, 'outside').simulate('mousedown');
        findTestSubject(component, 'outside').simulate('mouseup');
        // `react-focus-lock` relies on real DOM events to move focus about.
        // Exposed attributes are the most consistent way to attain its state.
        // See https://github.com/theKashey/react-focus-lock/blob/master/_tests/FocusLock.spec.js for the lib in use
        // Trap remains enabled
        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
      });

      test('trap remains enabled after internal clicks', () => {
        const component = mount(
          <div
            onMouseDown={triggerDocumentMouseDown}
            onMouseUp={triggerDocumentMouseUp}>
            <WuiFocusTrap clickOutsideDisables>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
              </div>
            </WuiFocusTrap>
            <button data-test-subj="outside" />
          </div>
        );

        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
        findTestSubject(component, 'input2').simulate('mousedown');
        findTestSubject(component, 'input2').simulate('mouseup');
        // Trap remains enabled
        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
      });

      test('trap remains enabled after internal portal clicks', () => {
        const component = mount(
          <div
            onMouseDown={triggerDocumentMouseDown}
            onMouseUp={triggerDocumentMouseUp}>
            <WuiFocusTrap clickOutsideDisables>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
                <WuiPortal>
                  <input data-test-subj="input3" />
                </WuiPortal>
              </div>
            </WuiFocusTrap>
            <button data-test-subj="outside" />
          </div>
        );

        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
        findTestSubject(component, 'input3').simulate('mousedown');
        findTestSubject(component, 'input3').simulate('mouseup');
        // Trap remains enabled
        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
      });

      test('trap becomes disabled on outside clicks', () => {
        const component = mount(
          <div
            onMouseDown={triggerDocumentMouseDown}
            onMouseUp={triggerDocumentMouseUp}>
            <WuiFocusTrap clickOutsideDisables>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
              </div>
            </WuiFocusTrap>
            <button data-test-subj="outside" />
          </div>
        );

        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
        findTestSubject(component, 'outside').simulate('mousedown');
        findTestSubject(component, 'outside').simulate('mouseup');
        // Trap becomes disabled
        expect(component.find('[data-focus-lock-disabled=false]').length).toBe(
          0
        );
      });
    });
  });
});
