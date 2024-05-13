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

import React, { FunctionComponent } from 'react';

import { WuiSuperSelect } from '../../form';

import { CommonProps } from '../../common';

import { getLinearGradient, getFixedLinearGradient } from '../utils';
import { ColorStop } from '../color_stops';

import { WuiSuperSelectProps } from '../../form/super_select';

export interface WuiColorPalettePickerPaletteTextProps extends CommonProps {
  /**
   *  For storing unique value of item
   */
  value: string;
  /**
   *  The name of your palette
   */
  title: string;
  /**
   * `text`: a text only option (a title is required).
   */
  type: 'text';
  /**
   * Array of color `strings` or `ColorStops` in the form of
   * `{ stop: number, color: string }`. The stops must be numbers in an ordered range.
   */
  palette?: string[] | ColorStop[];
}

export interface WuiColorPalettePickerPaletteFixedProps extends CommonProps {
  /**
   *  For storing unique value of item
   */
  value: string;
  /**
   *  The name of your palette
   */
  title?: string;
  /**
   * `fixed`: individual color blocks
   */
  type: 'fixed';
  /**
   * Array of color `strings`.
   */
  palette: string[];
}

export interface WuiColorPalettePickerPaletteGradientProps extends CommonProps {
  /**
   *  For storing unique value of item
   */
  value: string;
  /**
   *  The name of your palette
   */
  title?: string;
  /**
   * `gradient`: each color fades into the next
   */
  type: 'gradient';
  /**
   * Array of color `strings` or `ColorStops` in the form of
   * `{ stop: number, color: string }`. The stops must be numbers in an ordered range.
   */
  palette: string[] | ColorStop[];
}

export type WuiColorPalettePickerPaletteProps =
  | WuiColorPalettePickerPaletteTextProps
  | WuiColorPalettePickerPaletteFixedProps
  | WuiColorPalettePickerPaletteGradientProps;

export type WuiColorPalettePickerProps<T extends string> = CommonProps &
  Omit<
    WuiSuperSelectProps<T>,
    'options' | 'itemLayoutAlign' | 'hasDividers'
  > & {
    /**
     *  Specify what should be displayed after a selection: a `palette` or `title`
     */
    selectionDisplay?: 'palette' | 'title';

    /**
     * An array of one of the following objects: #WuiColorPalettePickerPaletteText, #WuiColorPalettePickerPaletteFixed, #WuiColorPalettePickerPaletteGradient
     */
    palettes: WuiColorPalettePickerPaletteProps[];
  };

export const WuiColorPalettePicker: FunctionComponent<WuiColorPalettePickerProps<
  string
>> = ({
  className,
  compressed = false,
  disabled,
  fullWidth = false,
  isInvalid = false,
  onChange,
  readOnly = false,
  valueOfSelected,
  palettes,
  append,
  prepend,
  selectionDisplay = 'palette',
  ...rest
}) => {
  const getPalette = (
    item:
      | WuiColorPalettePickerPaletteFixedProps
      | WuiColorPalettePickerPaletteGradientProps
  ) => {
    const background =
      item.type === 'fixed'
        ? getFixedLinearGradient(item.palette)
        : getLinearGradient(item.palette);

    return (
      <div
        className="wuiColorPalettePicker__itemGradient"
        style={{ background }}
      />
    );
  };

  const paletteOptions = palettes.map(
    (item: WuiColorPalettePickerPaletteProps) => {
      const { type, value, title, palette, ...rest } = item;
      const paletteForDisplay = item.type !== 'text' ? getPalette(item) : null;
      return {
        value: String(value),
        inputDisplay:
          selectionDisplay === 'title' || type === 'text'
            ? title
            : paletteForDisplay,
        dropdownDisplay: (
          <div className="wuiColorPalettePicker__item">
            {title && type !== 'text' && (
              <div className="wuiColorPalettePicker__itemTitle">{title}</div>
            )}
            {type === 'text' ? title : paletteForDisplay}
          </div>
        ),
        ...rest,
      };
    }
  );

  return (
    <WuiSuperSelect
      className={className}
      options={paletteOptions}
      valueOfSelected={valueOfSelected}
      onChange={onChange}
      hasDividers
      isInvalid={isInvalid}
      compressed={compressed}
      disabled={disabled}
      readOnly={readOnly}
      fullWidth={fullWidth}
      append={append}
      prepend={prepend}
      {...rest}
    />
  );
};
