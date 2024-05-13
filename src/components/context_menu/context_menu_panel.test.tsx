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
import { render, mount, ReactWrapper } from 'enzyme';
import { findTestSubject, requiredProps } from '../../test';

import { WuiContextMenuPanel } from './context_menu_panel';

import { WuiContextMenuItem } from './context_menu_item';

import { tick } from './context_menu.test';

import { keys } from '../../services';

const items = [
  <WuiContextMenuItem key="A" data-test-subj="itemA">
    Option A
  </WuiContextMenuItem>,
  <WuiContextMenuItem key="B" data-test-subj="itemB">
    Option B
  </WuiContextMenuItem>,
  <WuiContextMenuItem key="C" data-test-subj="itemC">
    Option C
  </WuiContextMenuItem>,
];

describe('WuiContextMenuPanel', () => {
  test('is rendered', () => {
    const component = render(
      <WuiContextMenuPanel {...requiredProps}>Hello</WuiContextMenuPanel>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('title', () => {
      test('is rendered', () => {
        const component = render(<WuiContextMenuPanel title="Title" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClose', () => {
      test('renders a button as a title', () => {
        const component = render(
          <WuiContextMenuPanel title="Title" onClose={() => {}} />
        );

        expect(component).toMatchSnapshot();
      });

      test("isn't called upon instantiation", () => {
        const onCloseHandler = jest.fn();

        mount(<WuiContextMenuPanel title="Title" onClose={onCloseHandler} />);

        expect(onCloseHandler).not.toHaveBeenCalled();
      });

      test('is called when the title is clicked', () => {
        const onCloseHandler = jest.fn();

        const component = mount(
          <WuiContextMenuPanel title="Title" onClose={onCloseHandler} />
        );

        component.find('button').simulate('click');

        expect(onCloseHandler).toHaveBeenCalledTimes(1);
      });
    });

    describe('onHeightChange', () => {
      it('is called with a height value', () => {
        const onHeightChange = jest.fn();

        mount(<WuiContextMenuPanel onHeightChange={onHeightChange} />);

        expect(onHeightChange).toHaveBeenCalledWith(0);
      });
    });

    describe('transitionDirection', () => {
      describe('next', () => {
        describe('with transitionType', () => {
          describe('in', () => {
            test('is rendered', () => {
              const component = render(
                <WuiContextMenuPanel
                  transitionDirection="next"
                  transitionType="in"
                />
              );

              expect(component).toMatchSnapshot();
            });
          });

          describe('out', () => {
            test('is rendered', () => {
              const component = render(
                <WuiContextMenuPanel
                  transitionDirection="next"
                  transitionType="out"
                />
              );

              expect(component).toMatchSnapshot();
            });
          });
        });
      });

      describe('previous', () => {
        describe('with transitionType', () => {
          describe('in', () => {
            test('is rendered', () => {
              const component = render(
                <WuiContextMenuPanel
                  transitionDirection="previous"
                  transitionType="in"
                />
              );

              expect(component).toMatchSnapshot();
            });
          });

          describe('out', () => {
            test('is rendered', () => {
              const component = render(
                <WuiContextMenuPanel
                  transitionDirection="previous"
                  transitionType="out"
                />
              );

              expect(component).toMatchSnapshot();
            });
          });
        });
      });
    });

    describe('initialFocusedItemIndex', () => {
      it('sets focus on the item occupying that index', async () => {
        const component = mount(
          <WuiContextMenuPanel items={items} initialFocusedItemIndex={1} />
        );

        await tick(20);

        expect(findTestSubject(component, 'itemB').getDOMNode()).toBe(
          document.activeElement
        );
      });
    });

    describe('onUseKeyboardToNavigate', () => {
      it('is called when up arrow is pressed', () => {
        const onUseKeyboardToNavigateHandler = jest.fn();

        const component = mount(
          <WuiContextMenuPanel
            items={items}
            onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
          />
        );

        component.simulate('keydown', { key: keys.ARROW_UP });
        expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
      });

      it('is called when down arrow is pressed', () => {
        const onUseKeyboardToNavigateHandler = jest.fn();

        const component = mount(
          <WuiContextMenuPanel
            items={items}
            onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
          />
        );

        component.simulate('keydown', { key: keys.ARROW_UP });
        expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
      });

      describe('left arrow', () => {
        it('calls handler if showPreviousPanel exists', () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const component = mount(
            <WuiContextMenuPanel
              items={items}
              showPreviousPanel={() => {}}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          component.simulate('keydown', { key: keys.ARROW_LEFT });
          expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
        });

        it("doesn't call handler if showPreviousPanel doesn't exist", () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const component = mount(
            <WuiContextMenuPanel
              items={items}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          component.simulate('keydown', { key: keys.ARROW_LEFT });
          expect(onUseKeyboardToNavigateHandler).not.toHaveBeenCalled();
        });
      });

      describe('right arrow', () => {
        it('calls handler if showNextPanel exists', () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const component = mount(
            <WuiContextMenuPanel
              items={items}
              showNextPanel={() => {}}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          component.simulate('keydown', { key: keys.ARROW_RIGHT });
          expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
        });

        it("doesn't call handler if showNextPanel doesn't exist", () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const component = mount(
            <WuiContextMenuPanel
              items={items}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          component.simulate('keydown', { key: keys.ARROW_RIGHT });
          expect(onUseKeyboardToNavigateHandler).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('behavior', () => {
    describe('focus', () => {
      it('is set on the first focusable element by default if there are no items and hasFocus is true', async () => {
        const component = mount(
          <WuiContextMenuPanel>
            <button data-test-subj="button" />
          </WuiContextMenuPanel>
        );

        await tick(20);

        expect(findTestSubject(component, 'button').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it('is not set on anything if hasFocus is false', () => {
        const component = mount(
          <WuiContextMenuPanel hasFocus={false}>
            <button data-test-subj="button" />
          </WuiContextMenuPanel>
        );

        expect(findTestSubject(component, 'button').getDOMNode()).not.toBe(
          document.activeElement
        );
      });
    });

    describe('keyboard navigation of items', () => {
      let component: ReactWrapper;
      let showNextPanelHandler: jest.Mock;
      let showPreviousPanelHandler: jest.Mock;

      beforeEach(() => {
        showNextPanelHandler = jest.fn();
        showPreviousPanelHandler = jest.fn();

        component = mount(
          <WuiContextMenuPanel
            items={items}
            showNextPanel={showNextPanelHandler}
            showPreviousPanel={showPreviousPanelHandler}
          />
        );
      });

      it('focuses the panel by default', async () => {
        await tick(20);

        expect(component.getDOMNode()).toBe(document.activeElement);
      });

      it('down arrow key focuses the first menu item', async () => {
        component.simulate('keydown', { key: keys.ARROW_DOWN });

        await tick(20);
        expect(findTestSubject(component, 'itemA').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it('subsequently, down arrow key focuses the next menu item', async () => {
        component.simulate('keydown', { key: keys.ARROW_DOWN });
        component.simulate('keydown', { key: keys.ARROW_DOWN });

        await tick(20);
        expect(findTestSubject(component, 'itemB').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it('down arrow key wraps to first menu item', async () => {
        component.simulate('keydown', { key: keys.ARROW_UP });
        component.simulate('keydown', { key: keys.ARROW_DOWN });

        await tick(20);
        expect(findTestSubject(component, 'itemA').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it('up arrow key focuses the last menu item', async () => {
        component.simulate('keydown', { key: keys.ARROW_UP });

        await tick(20);
        expect(findTestSubject(component, 'itemC').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it('subsequently, up arrow key focuses the previous menu item', async () => {
        component.simulate('keydown', { key: keys.ARROW_UP });
        component.simulate('keydown', { key: keys.ARROW_UP });

        await tick(20);
        expect(findTestSubject(component, 'itemB').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it('up arrow key wraps to last menu item', async () => {
        component.simulate('keydown', { key: keys.ARROW_DOWN });
        component.simulate('keydown', { key: keys.ARROW_UP });

        await tick(20);
        expect(findTestSubject(component, 'itemC').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it("right arrow key shows next panel with focused item's index", () => {
        component.simulate('keydown', { key: keys.ARROW_DOWN });
        component.simulate('keydown', { key: keys.ARROW_RIGHT });
        expect(showNextPanelHandler).toHaveBeenCalledWith(0);
      });

      it('left arrow key shows previous panel', () => {
        component.simulate('keydown', { key: keys.ARROW_LEFT });
        expect(showPreviousPanelHandler).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('updating items and content', () => {
    describe('updates to items', () => {
      it("should not re-render if any items's watchedItemProps did not change", () => {
        expect.assertions(2); // make sure the assertion in the `setProps` callback is executed

        // by not passing `watchedItemProps` no changes to items should cause a re-render
        const component = mount(
          <WuiContextMenuPanel
            items={[
              <WuiContextMenuItem key="A" data-counter={0}>
                Option A
              </WuiContextMenuItem>,
              <WuiContextMenuItem key="B" data-counter={1}>
                Option B
              </WuiContextMenuItem>,
            ]}
          />
        );

        expect(component.debug()).toMatchSnapshot();

        component.setProps(
          {
            items: [
              <WuiContextMenuItem key="A" data-counter={2}>
                Option A
              </WuiContextMenuItem>,
              <WuiContextMenuItem key="B" data-counter={3}>
                Option B
              </WuiContextMenuItem>,
            ],
          },
          () => {
            expect(component.debug()).toMatchSnapshot();
          }
        );
      });

      it("should re-render if any items's watchedItemProps did change", () => {
        expect.assertions(2); // make sure the assertion in the `setProps` callback is executed

        // by referencing the `data-counter` property in `watchedItemProps`
        // changes to the items should be picked up and re-rendered
        const component = mount(
          <WuiContextMenuPanel
            watchedItemProps={['data-counter']}
            items={[
              <WuiContextMenuItem key="A" data-counter={0}>
                Option A
              </WuiContextMenuItem>,
              <WuiContextMenuItem key="B" data-counter={1}>
                Option B
              </WuiContextMenuItem>,
            ]}
          />
        );

        expect(component.debug()).toMatchSnapshot();

        component.setProps(
          {
            items: [
              <WuiContextMenuItem key="A" data-counter={2}>
                Option A
              </WuiContextMenuItem>,
              <WuiContextMenuItem key="B" data-counter={3}>
                Option B
              </WuiContextMenuItem>,
            ],
          },
          () => {
            expect(component.debug()).toMatchSnapshot();
          }
        );
      });

      it('should re-render at all times when children exists', () => {
        expect.assertions(2); // make sure the assertion in the `setProps` callback is executed

        const component = mount(
          <WuiContextMenuPanel>Hello World</WuiContextMenuPanel>
        );

        expect(component.debug()).toMatchSnapshot();

        component.setProps({ children: 'More Salutations' }, () => {
          expect(component.debug()).toMatchSnapshot();
        });
      });
    });
  });
});
