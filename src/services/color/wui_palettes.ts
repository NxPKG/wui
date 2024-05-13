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

import chroma from 'chroma-js';
import { HEX } from './color_types';
import { colorPalette } from './color_palette';

export type WuiPalette = string[];

const flatten = (arr: any[]) => [].concat(...arr);

const wuiPalette = function(
  colors: string[],
  steps: number,
  diverge: boolean = false,
  categorical: boolean = true
): WuiPalette {
  // This function also trims the first color so white/black is never a color
  if (!diverge && steps > 1) {
    const palette = colorPalette(colors, steps + 1);
    palette.shift();
    return palette;
  }

  return colorPalette(colors, steps, diverge, categorical);
};

export interface WuiPaletteColorBlindProps {
  /**
   * How many variations of the series is needed
   */
  rotations?: number;
  /**
   * Order similar colors as `group`s or just `append` each variation
   */
  order?: 'append' | 'group';
  /**
   * Specifies if the direction of the color variations
   */
  direction?: 'lighter' | 'darker' | 'both';
  /**
   * Use the default sort order, or re-sort them based on the color wheel (natural)
   */
  sortBy?: 'default' | 'natural';
  /**
   * Shift the sorting order by a certain number when used in conjunction with `'natural'` `sortBy`.
   * Defaults to a number close to green.
   */
  sortShift?: string;
}

export const wuiPaletteColorBlind = ({
  rotations = 1,
  order = 'append',
  direction = 'lighter',
  sortBy = 'default',
  sortShift = '-100',
}: WuiPaletteColorBlindProps = {}): WuiPalette => {
  let colors: string[] = [];

  let base = [
    '#54B399', // 0 green
    '#6092C0', // 1 blue
    '#D36086', // 2 dark pink
    '#9170B8', // 3 purple
    '#CA8EAE', // 4 light pink
    '#D6BF57', // 5 yellow
    '#B9A888', // 6 tan
    '#DA8B45', // 7 orange
    '#AA6556', // 8 brown
    '#E7664C', // 9 red
  ];

  if (sortBy === 'natural') {
    // Sort the colors based on the color wheel, but shifting the values based on sortShift
    base = [...base].sort(function(a, b) {
      return (
        chroma(a)
          .set('hsl.h', sortShift)
          .hsl()[0] -
        chroma(b)
          .set('hsl.h', sortShift)
          .hsl()[0]
      );
    });
  }

  if (rotations > 1) {
    const palettes = base.map(color => {
      // Create the darkest and lightest versions of each color using black and white
      const palette = colorPalette(['black', color, 'white'], 5, false, true);
      // Then removing the extremes
      palette.pop();
      palette.shift();

      switch (direction) {
        case 'lighter':
          return colorPalette([palette[1], palette[2]], rotations, false, true);
        case 'darker':
          return colorPalette([palette[1], palette[0]], rotations, false, true);
        case 'both':
          return colorPalette(palette, rotations, false, true);
      }
    });

    if (order === 'group') {
      colors = flatten(palettes);
    } else {
      for (let i = 0; i < rotations; i++) {
        const rotation = palettes.map(palette => palette[i]);
        colors.push(...rotation);
      }
    }
  } else {
    colors = base;
  }

  return colors;
};

/**
 * Color blind palette with text is meant for use when text is applied on top of the color.
 * It increases the brightness of the color to give the text more contrast.
 */
export const wuiPaletteColorBlindBehindText = (
  paletteProps: WuiPaletteColorBlindProps = {}
) => {
  const originalPalette = wuiPaletteColorBlind(paletteProps);
  const newPalette = originalPalette.map(color =>
    chroma(color)
      .brighten(0.5)
      .hex()
  );
  return newPalette;
};

export const wuiPaletteForLightBackground = function(): WuiPalette {
  return ['#006BB4', '#017D73', '#F5A700', '#BD271E', '#DD0A73'];
};

export const wuiPaletteForDarkBackground = function(): WuiPalette {
  return ['#1BA9F5', '#7DE2D1', '#F990C0', '#F66', '#FFCE7A'];
};

const positiveColor: HEX = '#209280';
const negativeColor: HEX = '#CC5642';
const lightNegativeColor: HEX = wuiPaletteColorBlind()[9];
const coolArray: HEX[] = [wuiPaletteColorBlind()[1], '#6092C0'];
const warmArray: HEX[] = [wuiPaletteColorBlind()[7], wuiPaletteColorBlind()[9]];

export const wuiPaletteForStatus = function(steps: number): WuiPalette {
  if (steps === 1) {
    return [wuiPaletteColorBlind()[0]];
  }
  if (steps <= 3) {
    return wuiPalette(
      [
        wuiPaletteColorBlind()[0],
        wuiPaletteColorBlind()[5],
        lightNegativeColor,
      ],
      steps,
      true
    );
  }
  return wuiPalette(
    [
      positiveColor,
      wuiPaletteColorBlind()[0],
      wuiPaletteColorBlind()[5],
      lightNegativeColor,
      negativeColor,
    ],
    steps,
    true
  );
};

export const wuiPaletteForTemperature = function(steps: number): WuiPalette {
  const cools = colorPalette([...coolArray.slice().reverse(), '#EBEFF5'], 3);
  const warms = colorPalette(['#F4F3DB', ...warmArray], 3);

  if (steps === 1) {
    return [cools[0]];
  } else if (steps <= 3) {
    return wuiPalette([cools[0], lightNegativeColor], steps, true);
  }

  return wuiPalette([...cools, ...warms], steps, true);
};

export const wuiPaletteComplimentary = function(steps: number): WuiPalette {
  if (steps === 1) {
    return [wuiPaletteColorBlind()[1]];
  }

  return wuiPalette(
    [wuiPaletteColorBlind()[1], wuiPaletteColorBlind()[7]],
    steps,
    true
  );
};

export const wuiPaletteNegative = function(steps: number): WuiPalette {
  if (steps === 1) {
    return [lightNegativeColor];
  }

  return wuiPalette(['white', negativeColor], steps);
};

export const wuiPalettePositive = function(steps: number): WuiPalette {
  if (steps === 1) {
    return [wuiPaletteColorBlind()[0]];
  }

  return wuiPalette(['white', positiveColor], steps);
};

export const wuiPaletteCool = function(steps: number): WuiPalette {
  if (steps === 1) {
    return [coolArray[1]];
  }

  return wuiPalette(['white', ...coolArray], steps);
};

export const wuiPaletteWarm = function(steps: number): WuiPalette {
  if (steps === 1) {
    return [lightNegativeColor];
  }

  return wuiPalette(['#FBFBDC', ...warmArray], steps);
};

export const wuiPaletteGray = function(steps: number): WuiPalette {
  if (steps === 1) {
    return ['#98a2b3'];
  }

  return wuiPalette(
    ['white', '#d3dae6', '#98a2b3', '#69707d', '#343741'],
    steps,
    false
  );
};
