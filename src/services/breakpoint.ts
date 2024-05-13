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

import { keysOf } from '../components/common';

export type WuiBreakpointSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export type WuiBreakpoints = {
  /**
   * Set the minimum window width at which to start to the breakpoint
   */
  [key in WuiBreakpointSize]: number;
};

export const BREAKPOINTS: WuiBreakpoints = {
  xl: 1200,
  l: 992,
  m: 768,
  s: 575,
  xs: 0,
};

export const BREAKPOINT_KEYS = keysOf(BREAKPOINTS);

/**
 * Given the current `width` and an object of `WuiBreakpoints`,
 * this function returns the string that is the name of the breakpoint key
 * that is less than or equal to the width
 *
 * @param {number} width Can either be the full window width or any width
 * @param {WuiBreakpoints} breakpoints An object with keys for sizing and values for minimum width
 * @returns {string | undefined} Name of the breakpoint key or `undefined` if a key doesn't exist
 */
export function getBreakpoint(
  width: number,
  breakpoints: WuiBreakpoints = BREAKPOINTS
): WuiBreakpointSize | undefined {
  // Find the breakpoint (key) whose value is <= windowWidth starting with largest first
  return keysOf(BREAKPOINTS).find(key => breakpoints[key] <= width);
}

/**
 * Given the current `width` and a max breakpoint key,
 * this function returns true or false if the `width` falls within the max
 * breakpoint or any breakpoints below
 *
 * @param {number} width Can either be the full window width or any width
 * @param {WuiBreakpointSize | number} max The named breakpoint or custom number to check against
 * @param {WuiBreakpoints} breakpoints An object with keys for sizing and values for minimum width
 * @returns {boolean} Will return `false` if it can't find a value for the `max` breakpoint
 */
export function isWithinMaxBreakpoint(
  width: number,
  max: WuiBreakpointSize | number,
  breakpoints: WuiBreakpoints = BREAKPOINTS
): boolean {
  if (typeof max === 'number') {
    return width <= max;
  } else {
    const currentBreakpoint = getBreakpoint(width, breakpoints);
    return currentBreakpoint
      ? breakpoints[currentBreakpoint] <= breakpoints[max]
      : false;
  }
}

/**
 * Given the current `width` and an array of breakpoint keys,
 * this function returns true or false if the `width` falls within
 * any of the named breakpoints
 *
 * @param {number} width Can either be the full window width or any width
 * @param {WuiBreakpointSize[]} sizes An array of named breakpoints
 * @param {WuiBreakpoints} breakpoints An object with keys for sizing and values for minimum width
 * @returns {boolean} Returns `true` if current breakpoint name is included in `sizes`
 */
export function isWithinBreakpoints(
  width: number,
  sizes: WuiBreakpointSize[],
  breakpoints: WuiBreakpoints = BREAKPOINTS
): boolean {
  const currentBreakpoint = getBreakpoint(width, breakpoints);
  return currentBreakpoint ? sizes.includes(currentBreakpoint) : false;
}
