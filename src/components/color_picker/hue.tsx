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
  ChangeEvent,
  InputHTMLAttributes,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { WuiScreenReaderOnly } from '../accessibility';
import { WuiI18n } from '../i18n';

const HUE_RANGE = 359;

export type WuiHueProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> &
  CommonProps & {
    hex?: string;
    hue?: string | number;
    onChange: (hue: number) => void;
  };

export const WuiHue: FunctionComponent<WuiHueProps> = ({
  className,
  hex,
  hue = 1,
  id,
  onChange,
  ...rest
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };
  const classes = classNames('wuiHue', className);
  return (
    <React.Fragment>
      <WuiScreenReaderOnly>
        <label htmlFor={`${id}-hue`}>
          <WuiI18n
            token="wuiHue.label"
            default="Select the HSV color mode 'hue' value"
          />
        </label>
      </WuiScreenReaderOnly>
      <WuiScreenReaderOnly>
        <p aria-live="polite">{hex}</p>
      </WuiScreenReaderOnly>
      <div className={classes}>
        <input
          id={`${id}-hue`}
          min={0}
          max={HUE_RANGE}
          step={1}
          type="range"
          className="wuiHue__range"
          value={hue}
          onChange={handleChange}
          {...rest}
        />
      </div>
    </React.Fragment>
  );
};
