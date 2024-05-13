import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiColorPicker,
  WuiColorPalettePicker,
  WuiColorStops,
  WuiSpacer,
  WuiText,
} from '../../../../src/components';
import {
  WuiColorPalettePickerPaletteTextProps,
  WuiColorPalettePickerPaletteFixedProps,
  WuiColorPalettePickerPaletteGradientProps,
} from '!!prop-loader!../../../../src/components/color_picker/color_palette_picker/color_palette_picker';

import playgrounds from './playground';

import ColorPicker from './color_picker';
const colorPickerSource = require('!!raw-loader!./color_picker');
const colorPickerHtml = renderToHtml(ColorPicker);
const colorPickerSnippet = `<WuiColorPicker
  id={colorPickerId}
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
/>
`;

import { ColorPalettePicker } from './color_palette_picker';
const colorPalettePickerSource = require('!!raw-loader!./color_palette_picker');
const colorPalettePickerHtml = renderToHtml(ColorPalettePicker);
const colorPalettePickerSnippet = `<WuiColorPalettePicker
  palettes={[
    {
      value: 'palette1',
      title: 'Palette 1',
      palette: wuiPaletteColorBlind(),
      type: 'fixed',
    },
  ]}
  onChange={onPaletteChange}
  valueOfSelected={palette}
/>
`;

import ColorStops from './color_stops';
const colorStopsSource = require('!!raw-loader!./color_stops');
const colorStopsHtml = renderToHtml(ColorStops);
const colorStopsSnippetStandard = `<WuiColorStops
  label="Standard"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
/>`;

const colorStopsSnippetAdd = `<WuiColorStops
  label="Custom add color"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  addColor={colorToAddToNewStops}
/>`;

const colorStopsSnippetFixed = `<WuiColorStops
  label="Fixed color segments"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  stopType="fixed"
/>
`;

import ColorStopsRange from './color_stops_range';
const colorStopsRangeSource = require('!!raw-loader!./color_stops_range');
const colorStopsRangeHtml = renderToHtml(ColorStopsRange);
const colorPickerRangeSnippet = `<WuiColorStops
  label="Free-range color stops"
  onChange={handleChange}
  colorStops={colorStops}
/>
`;

import Alpha from './alpha';
const alphaSource = require('!!raw-loader!./alpha');
const alphaHtml = renderToHtml(Alpha);
const alphaSnippet = `<WuiColorPicker
  id={colorPickerId}
  onChange={handleChange}
  color={chosenColor}
  showAlpha={true}
  isInvalid={hasErrors}
/>`;

import Formats from './formats';
const formatsSource = require('!!raw-loader!./formats');
const formatsHtml = renderToHtml(Formats);
const formatsSnippet = `<WuiColorPicker
  format="hex"
  id={colorPickerId}
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
/>`;

import CustomSwatches from './custom_swatches';
const customSwatchesSource = require('!!raw-loader!./custom_swatches');
const customSwatchesHtml = renderToHtml(CustomSwatches);
const customSwatchesSnippet = `<WuiColorPicker
  id={colorPickerId}
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
  swatches={[
    '#333',
    '#666',
    '#999',
    '#CCC',
  ]}
/>`;

const stopCustomSwatchesSnippet = `<WuiColorStops
  label="Swatches"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  swatches={[
    '#333',
    '#666',
    '#999',
    '#CCC',
  ]}
/>
`;

import CustomButton from './custom_button';
const customButtonSource = require('!!raw-loader!./custom_button');
const customButtonHtml = renderToHtml(CustomButton);
const customButtonSnippet = `<WuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  secondaryInputDisplay="top"
  button={
    <WuiColorPickerSwatch
      color={chosenColor}
      aria-label="Select a new color"
    />
  }
/>
`;
const customBadgeSnippet = `// Be sure to provide relevant accessibility to unmanaged elements
<WuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
  secondaryInputDisplay="bottom"
  button={
    <WuiBadge
      color={chosenColor ? chosenColor : 'hollow'}
      onClickAriaLabel="Select a new color"
    >
      I'm a Badge
    </WuiBadge>
  }
/>
`;

import Empty from './empty_state';
const emptySource = require('!!raw-loader!./empty_state');
const emptyHtml = renderToHtml(CustomButton);
const emptySnippet = `<WuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  placeholder="Auto"
  isClearable={true}
/>
`;

import Modes from './modes';
const modesSource = require('!!raw-loader!./modes');
const modesHtml = renderToHtml(Modes);
const modesSwatchSnippet = `// Swatches only
<WuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
  mode="swatch"
/>
`;
const modesPickerSnippet = `// Gradient map only
<WuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
  mode="picker"
/>
`;
const stopModesSwatchSnippet = `// Swatches only
<WuiColorStops
  label="Swatch"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  mode="swatch"
/>
`;
const stopModesPickerSnippet = `// Gradient map only
<WuiColorStops
  label="Picker"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  mode="picker"
/>
`;

import Inline from './inline';
const inlineSource = require('!!raw-loader!./inline');
const inlineHtml = renderToHtml(Inline);
const inlineSnippet = `<WuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
  display="inline"
/>
`;

import Containers from './containers';
const containersSource = require('!!raw-loader!./containers');
const containersHtml = renderToHtml(Containers);

import KitchenSink from './kitchen_sink';
const kitchenSinkSource = require('!!raw-loader!./kitchen_sink');
const kitchenSinkHtml = renderToHtml(KitchenSink);
const kitchenSinkSnippet = `<WuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
  onBlur={() => {}}
  onFocus={() => {}}
  compressed={true}
  popoverZIndex={10}
  mode="default"
  swatches={[
    '#333',
    '#666',
    '#999',
    '#CCC',
    '#FFF',
  ]}
/>
`;
const stopKitchenSinkSnippet = `<WuiColorStops
  label="All the things"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  mode="default"
  addStop={#FFF}
  swatches={[
    '#333',
    '#666',
    '#999',
    '#CCC',
    '#FFF',
  ]}
/>
`;

export const ColorPickerExample = {
  title: 'Color selection',
  intro: (
    <React.Fragment>
      <WuiText>
        <p>
          Three components exist to aid color selection:{' '}
          <strong>WuiColorPicker</strong>,{' '}
          <strong>WuiColorPalettePicker</strong> and{' '}
          <strong>WuiColorStops</strong>.
        </p>
      </WuiText>
      <WuiSpacer />
    </React.Fragment>
  ),
  sections: [
    {
      title: 'Color picker',
      text: (
        <React.Fragment>
          <WuiText>
            <p>
              Color input component allowing for multiple methods of entry and
              selection.
            </p>
            <p>
              Direct text entry will match hexadecimal (hex) and RGB(a) colors,
              and output will return both hex and RGBa values. Spatial selection
              involves HSV manipulaton, which is converted to hex.
            </p>
            <p>
              Swatches allow consumers to predefine preferred or suggested
              choices. The swatches must also be entered in hex or RGBa format.
            </p>
          </WuiText>
        </React.Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorPickerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorPickerHtml,
        },
      ],
      props: { WuiColorPicker },
      snippet: colorPickerSnippet,
      demo: <ColorPicker />,
    },
    {
      title: 'Color palette picker',
      text: (
        <React.Fragment>
          <WuiText>
            <p>
              Use <strong>WuiColorPalettePicker</strong> to select palettes to
              apply colors to data visualization like maps and charts.
            </p>
            <p>
              Use the <WuiCode>palettes</WuiCode> prop to pass your palettes as
              an array of objects. For each object, you should pass a palette
              (array of hex values) and specify the <WuiCode>type</WuiCode>. Use{' '}
              <WuiCode>fixed</WuiCode> palettes for categorical data and{' '}
              <WuiCode>gradient</WuiCode> palettes for continuous data.
            </p>
          </WuiText>
        </React.Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorPalettePickerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorPalettePickerHtml,
        },
      ],
      props: {
        WuiColorPalettePicker,
        WuiColorPalettePickerPaletteTextProps,
        WuiColorPalettePickerPaletteFixedProps,
        WuiColorPalettePickerPaletteGradientProps,
      },
      snippet: colorPalettePickerSnippet,
      demo: <ColorPalettePicker />,
    },
    {
      title: 'Color stops',
      text: (
        <React.Fragment>
          <WuiText>
            <p>
              Use <strong>WuiColorStops</strong> to define color stops for data
              driven styling. Stops are numbers within the provided range. The
              color segment spans from the given stop number (inclusive) to the
              next stop number (exclusive).
            </p>
          </WuiText>
        </React.Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorStopsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorStopsHtml,
        },
      ],
      props: { WuiColorStops },
      snippet: [
        colorStopsSnippetStandard,
        colorStopsSnippetAdd,
        colorStopsSnippetFixed,
      ],
      demo: <ColorStops />,
    },
    {
      title: 'Free-range color stops',
      text: (
        <React.Fragment>
          <WuiText>
            <p>
              Typical use of <strong>WuiColorStops</strong> (as above) will have
              defined <WuiCode>min</WuiCode> and <WuiCode>max</WuiCode> range
              values. It is also possible to leave the range open-ended for
              cases where the target data set is unknown or maleable. In this
              case, a user{"'"}s added values will define <WuiCode>min</WuiCode>{' '}
              and <WuiCode>max</WuiCode> and users will have more freedom over
              resetting the values on the fly.
            </p>
          </WuiText>
        </React.Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorStopsRangeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorStopsRangeHtml,
        },
      ],
      snippet: colorPickerRangeSnippet,
      demo: <ColorStopsRange />,
    },
    {
      title: 'Format selection',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formatsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formatsHtml,
        },
      ],
      text: (
        <>
          <p>
            Format selection does <em>not</em> limit the format of text input
            the picker will allow, but instead attempts to keep consistency
            during HSV selection. By default, the color picker will
            automatically use the last input value format. Notice in following
            the examples how hue and saturation selection behave differently.
          </p>
          <p>
            Swatches will always show the &quot;as-authored&quot; color value,
            as will the value provided via the <WuiCode>color</WuiCode> prop.
          </p>
        </>
      ),
      snippet: formatsSnippet,
      demo: <Formats />,
    },
    {
      title: 'Alpha channel (opacity) selection',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: alphaSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: alphaHtml,
        },
      ],
      text: (
        <p>
          To allow color opacity via alpha channel, set{' '}
          <WuiCode language="js">showAlpha=true</WuiCode>. This will also
          display a range slider allowing manual opacity updates.
        </p>
      ),
      snippet: alphaSnippet,
      demo: <Alpha />,
    },
    {
      title: 'Custom color swatches',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customSwatchesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customSwatchesHtml,
        },
      ],
      text: (
        <p>
          By default the colors provided are the ten color blind safe
          visualization colors. You can however pass in your own color set with
          the <WuiCode>swatches</WuiCode> prop.
        </p>
      ),
      snippet: [customSwatchesSnippet, stopCustomSwatchesSnippet],
      demo: <CustomSwatches />,
    },
    {
      title: 'Limited selection modes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: modesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: modesHtml,
        },
      ],
      text: (
        <p>
          By default, both swatch selection and the gradient color map will be
          rendered. Use the <WuiCode>mode</WuiCode> prop to pass{' '}
          <WuiCode>swatch</WuiCode> for swatch-only selection, or pass{' '}
          <WuiCode>picker</WuiCode> for gradient map and hue slider selection
          without swatches.
        </p>
      ),
      snippet: [
        modesSwatchSnippet,
        modesPickerSnippet,
        stopModesSwatchSnippet,
        stopModesPickerSnippet,
      ],
      demo: <Modes />,
    },
    {
      title: 'Custom button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customButtonSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customButtonHtml,
        },
      ],
      text: (
        <>
          <p>
            Available only in <strong>WuiColorPicker</strong>. You can
            optionally use a custom button as the trigger for selection using
            the <WuiCode>button</WuiCode> prop. Please remember to add
            accessibility to this component, using proper button markup and aria
            labeling.
          </p>
          <p>
            Additionally, use the <WuiCode>secondaryInputDisplay</WuiCode> prop
            to show a secondary or alternative color value input. Options
            include <WuiCode>top</WuiCode> and <WuiCode>bottom</WuiCode>{' '}
            placement.
          </p>
        </>
      ),
      snippet: [customButtonSnippet, customBadgeSnippet],
      demo: <CustomButton />,
    },
    {
      title: 'Empty state',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: emptySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: emptyHtml,
        },
      ],
      text: (
        <>
          <p>
            For instances where an &quot;empty&quot; color picker has meaning
            other than transparent color value, use the{' '}
            <WuiCode>placeholder</WuiCode> prop to provide context. Removing
            color selection and returning to the default state can be made
            easier by setting <WuiCode>isClearable=true</WuiCode>.
          </p>
        </>
      ),
      snippet: emptySnippet,
      demo: <Empty />,
    },
    {
      title: 'Inline',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inlineSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inlineHtml,
        },
      ],
      text: (
        <p>
          Available only in <strong>WuiColorPicker</strong>. Set the{' '}
          <WuiCode>display</WuiCode> prop to <WuiCode>inline</WuiCode> to
          display the color picker without an input or popover. Note that the{' '}
          <WuiCode>button</WuiCode> prop will be ignored in this case.
        </p>
      ),
      snippet: inlineSnippet,
      demo: <Inline />,
    },
    {
      title: 'Containers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: containersSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: containersHtml,
        },
      ],
      text: (
        <p>
          Demonstrating that both color selection components can exist in portal
          containers and that their popover positioning works in nested
          contexts.
        </p>
      ),
      demo: <Containers />,
    },
    {
      title: 'Option toggling',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: kitchenSinkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: kitchenSinkHtml,
        },
      ],
      snippet: [kitchenSinkSnippet, stopKitchenSinkSnippet],
      demo: <KitchenSink />,
    },
  ],
  playground: playgrounds,
};
