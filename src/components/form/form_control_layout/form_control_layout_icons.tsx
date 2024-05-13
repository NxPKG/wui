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

import React, { Fragment, Component } from 'react';

import { WuiLoadingSpinner } from '../../loading';
import {
  WuiFormControlLayoutClearButton,
  WuiFormControlLayoutClearButtonProps,
} from './form_control_layout_clear_button';
import {
  WuiFormControlLayoutCustomIcon,
  WuiFormControlLayoutCustomIconProps,
} from './form_control_layout_custom_icon';
import { IconType } from '../../icon';
import { DistributiveOmit } from '../../common';

export const ICON_SIDES: ['left', 'right'] = ['left', 'right'];

type IconShape = DistributiveOmit<
  WuiFormControlLayoutCustomIconProps,
  'type' | 'iconRef'
> & {
  type: IconType;
  side?: typeof ICON_SIDES[number];
  ref?: WuiFormControlLayoutCustomIconProps['iconRef'];
};

function isIconShape(
  icon: WuiFormControlLayoutIconsProps['icon']
): icon is IconShape {
  return !!icon && icon.hasOwnProperty('type');
}

export interface WuiFormControlLayoutIconsProps {
  icon?: IconType | IconShape;
  clear?: WuiFormControlLayoutClearButtonProps;
  isLoading?: boolean;
}

export class WuiFormControlLayoutIcons extends Component<
  WuiFormControlLayoutIconsProps
> {
  render() {
    const { icon } = this.props;

    const iconSide = isIconShape(icon) && icon.side ? icon.side : 'left';
    const customIcon = this.renderCustomIcon();
    const loadingSpinner = this.renderLoadingSpinner();
    const clearButton = this.renderClearButton();

    let leftIcons;

    if (customIcon && iconSide === 'left') {
      leftIcons = <div className="wuiFormControlLayoutIcons">{customIcon}</div>;
    }

    let rightIcons;

    // If the icon is on the right, it should be placed after the clear button in the DOM.
    if (clearButton || loadingSpinner || (customIcon && iconSide === 'right')) {
      rightIcons = (
        <div className="wuiFormControlLayoutIcons wuiFormControlLayoutIcons--right">
          {clearButton}
          {loadingSpinner}
          {iconSide === 'right' ? customIcon : undefined}
        </div>
      );
    }

    return (
      <Fragment>
        {leftIcons}
        {rightIcons}
      </Fragment>
    );
  }

  renderCustomIcon() {
    const { icon } = this.props;

    if (!icon) {
      return null;
    }

    // Normalize the icon to an object if it's a string.
    const iconProps: IconShape = isIconShape(icon)
      ? icon
      : {
          type: icon,
        };

    const { ref: iconRef, side, ...iconRest } = iconProps;

    return <WuiFormControlLayoutCustomIcon iconRef={iconRef} {...iconRest} />;
  }

  renderLoadingSpinner() {
    const { isLoading } = this.props;

    if (!isLoading) {
      return null;
    }

    return <WuiLoadingSpinner size="m" />;
  }

  renderClearButton() {
    const { clear } = this.props;
    if (!clear) {
      return null;
    }

    return <WuiFormControlLayoutClearButton {...clear} />;
  }
}
