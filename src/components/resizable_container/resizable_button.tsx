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
  ButtonHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  TouchEvent,
  useCallback,
  useRef,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { WuiI18n } from '../i18n';
import { WuiResizablePanelRegistry } from './context';

export type WuiResizableButtonMouseEvent =
  | MouseEvent<HTMLButtonElement>
  | TouchEvent<HTMLButtonElement>;
export type WuiResizableButtonKeyDownEvent = KeyboardEvent<HTMLButtonElement>;

export type WuiResizableButtonSize = 's' | 'm' | 'l' | 'xl';

interface WuiResizableButtonControls {
  onKeyDown: (eve: WuiResizableButtonKeyDownEvent) => void;
  onMouseDown: (eve: WuiResizableButtonMouseEvent) => void;
  onTouchStart: (eve: WuiResizableButtonMouseEvent) => void;
  isHorizontal: boolean;
  registryRef: React.MutableRefObject<WuiResizablePanelRegistry>;
}

export interface WuiResizableButtonProps
  extends Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      keyof WuiResizableButtonControls
    >,
    CommonProps,
    Partial<WuiResizableButtonControls> {
  /**
   * The size of the Resizer (the space between panels)
   */
  size?: WuiResizableButtonSize;
}

const sizeToClassNameMap = {
  s: 'wuiResizableButton--sizeSmall',
  m: 'wuiResizableButton--sizeMedium',
  l: 'wuiResizableButton--sizeLarge',
  xl: 'wuiResizableButton--sizeExtraLarge',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const WuiResizableButton: FunctionComponent<WuiResizableButtonProps> = ({
  isHorizontal,
  className,
  size = 'm',
  registryRef,
  ...rest
}) => {
  const classes = classNames(
    'wuiResizableButton',
    size ? sizeToClassNameMap[size] : null,
    {
      'wuiResizableButton--vertical': !isHorizontal,
      'wuiResizableButton--horizontal': isHorizontal,
    },
    className
  );

  const previousRef = useRef<HTMLElement>();
  const onRef = useCallback(
    (ref: HTMLElement | null) => {
      if (ref) {
        previousRef.current = ref;
        registryRef!.current.registerResizerRef(ref);
      } else {
        if (previousRef.current != null) {
          registryRef!.current.deregisterResizerRef(previousRef.current);
          previousRef.current = undefined;
        }
      }
    },
    [registryRef]
  );

  const setFocus = (e: MouseEvent<HTMLButtonElement>) =>
    e.currentTarget.focus();

  return (
    <WuiI18n
      tokens={[
        'wuiResizableButton.horizontalResizerAriaLabel',
        'wuiResizableButton.verticalResizerAriaLabel',
      ]}
      defaults={[
        'Press left or right to adjust panels size',
        'Press up or down to adjust panels size',
      ]}>
      {([horizontalResizerAriaLabel, verticalResizerAriaLabel]: string[]) => (
        <button
          ref={onRef}
          aria-label={
            isHorizontal ? horizontalResizerAriaLabel : verticalResizerAriaLabel
          }
          className={classes}
          data-test-subj="splitPanelResizer"
          type="button"
          onClick={setFocus}
          {...rest}
        />
      )}
    </WuiI18n>
  );
};

export function wuiResizableButtonWithControls(
  controls: WuiResizableButtonControls
) {
  return (props: CommonProps) => (
    <WuiResizableButton {...controls} {...props} />
  );
}
