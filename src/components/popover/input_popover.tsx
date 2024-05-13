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

import React, {
  FunctionComponent,
  HTMLAttributes,
  useState,
  useEffect,
  useCallback,
} from 'react';
import classnames from 'classnames';
import tabbable from 'tabbable';

import { CommonProps } from '../common';
import { WuiFocusTrap } from '../focus_trap';
import { WuiPopover, WuiPopoverProps } from './popover';
import { WuiResizeObserver } from '../observer/resize_observer';
import { cascadingMenuKeys } from '../../services';

interface WuiInputPopoverProps
  extends Omit<WuiPopoverProps, 'button' | 'buttonRef'> {
  disableFocusTrap?: boolean;
  fullWidth?: boolean;
  input: WuiPopoverProps['button'];
  inputRef?: WuiPopoverProps['buttonRef'];
  onPanelResize?: (width?: number) => void;
}

type Props = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  WuiInputPopoverProps;

export const WuiInputPopover: FunctionComponent<Props> = ({
  children,
  className,
  disableFocusTrap = false,
  input,
  fullWidth = false,
  onPanelResize,
  ...props
}) => {
  const [inputEl, setInputEl] = useState();
  const [inputElWidth, setInputElWidth] = useState();
  const [panelEl, setPanelEl] = useState();

  const inputRef = (node: HTMLElement | null) => setInputEl(node);
  const panelRef = (node: HTMLElement | null) => setPanelEl(node);

  const setPanelWidth = useCallback(
    (width?: number) => {
      if (panelEl && (!!inputElWidth || !!width)) {
        const newWidth = !!width ? width : inputElWidth;
        panelEl.style.width = `${newWidth}px`;
        if (onPanelResize) {
          onPanelResize(newWidth);
        }
      }
    },
    [panelEl, inputElWidth, onPanelResize]
  );
  const onResize = useCallback(() => {
    if (inputEl) {
      const width = inputEl.getBoundingClientRect().width;
      setInputElWidth(width);
      setPanelWidth(width);
    }
  }, [inputEl, setPanelWidth]);
  useEffect(() => {
    onResize();
  }, [onResize]);
  useEffect(() => {
    setPanelWidth();
  }, [setPanelWidth]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === cascadingMenuKeys.TAB) {
      const tabbableItems = tabbable(panelEl).filter((el: HTMLElement) => {
        return (
          Array.from(el.attributes)
            .map(el => el.name)
            .indexOf('data-focus-guard') < 0
        );
      });
      if (
        disableFocusTrap ||
        (tabbableItems.length &&
          tabbableItems[tabbableItems.length - 1] === document.activeElement)
      ) {
        props.closePopover();
      }
    }
  };

  const classes = classnames(
    'wuiInputPopover',
    {
      'wuiInputPopover--fullWidth': fullWidth,
    },
    className
  );

  return (
    <WuiPopover
      ownFocus={false}
      button={
        <WuiResizeObserver onResize={onResize}>
          {resizeRef => <div ref={resizeRef}>{input}</div>}
        </WuiResizeObserver>
      }
      buttonRef={inputRef}
      panelRef={panelRef}
      className={classes}
      {...props}>
      <WuiFocusTrap clickOutsideDisables={true} disabled={disableFocusTrap}>
        <div onKeyDown={onKeyDown}>{children}</div>
      </WuiFocusTrap>
    </WuiPopover>
  );
};

WuiInputPopover.defaultProps = {
  anchorPosition: 'downLeft',
  attachToAnchor: true,
  display: 'block',
  panelPaddingSize: 's',
};
