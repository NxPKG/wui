import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCallOut,
  WuiDualRange,
  WuiRange,
  WuiSpacer,
  WuiCode,
} from '../../../../src/components';

import { rangeConfig, dualRangeConfig } from './playground';

import {
  WuiRangeLevels,
  LEVEL_COLORS,
} from '../../../../src/components/form/range/range_levels';

import { WuiRangeTicks } from '../../../../src/components/form/range/range_ticks';

import { WuiRangeInput } from '../../../../src/components/form/range/range_input';

import DualRangeExample from './dual_range';
const dualRangeSource = require('!!raw-loader!./dual_range');
const dualRangeHtml = renderToHtml(DualRangeExample);

import RangeExample from './range';
const rangeSource = require('!!raw-loader!./range');
const rangeHtml = renderToHtml(RangeExample);

import InputExample from './input';
const inputSource = require('!!raw-loader!./input');
const inputHtml = renderToHtml(InputExample);

import TicksExample from './ticks';
const ticksSource = require('!!raw-loader!./ticks');
const ticksHtml = renderToHtml(TicksExample);

import LevelsExample from './levels';
const levelsSource = require('!!raw-loader!./levels');
const levelsHtml = renderToHtml(LevelsExample);

import StatesExample from './states';
const statesSource = require('!!raw-loader!./states');
const statesHtml = renderToHtml(StatesExample);

import InputOnlyExample from './input_only';
const inputOnlySource = require('!!raw-loader!./input_only');
const inputOnlyHtml = renderToHtml(InputOnlyExample);

export const RangeControlExample = {
  title: 'Range sliders',
  intro: (
    <Fragment>
      <WuiCallOut color="warning" title="Understanding precision">
        <p>
          Range sliders should only be used when{' '}
          <strong>the precise value is not considered important</strong>. If the
          precise value does matter, add the <WuiCode>showInput</WuiCode> prop
          or use a <strong>WuiFieldNumber</strong> instead.
        </p>
      </WuiCallOut>
      <WuiSpacer />
    </Fragment>
  ),
  sections: [
    {
      title: 'Single range',
      text: (
        <Fragment>
          <h3>Required</h3>
          <ul>
            <li>
              <WuiCode>min, max</WuiCode>: Sets the range values.
            </li>
            <li>
              <WuiCode>step</WuiCode>: Technically not required because the
              default is <WuiCode>1</WuiCode>.
            </li>
            <li>
              <WuiCode>value, onChange</WuiCode>
            </li>
          </ul>
          <h3>Optional</h3>
          <ul>
            <li>
              <WuiCode>showLabels</WuiCode>: While currently considered
              optional, the property should be added to explicitly state the
              range to the user.
            </li>
            <li>
              <WuiCode>showValue</WuiCode>: Displays a tooltip style indicator
              of the selected value. You can add <WuiCode>valuePrepend</WuiCode>{' '}
              and/or <WuiCode>valueAppend</WuiCode> to bookend the value with
              custom content.
            </li>
            <li>
              <WuiCode>showRange</WuiCode>: Displays a thickened line from the
              minimum value to the selected value.
            </li>
          </ul>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: rangeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: rangeHtml,
        },
      ],
      props: {
        WuiRange,
      },
      demo: <RangeExample />,
      snippet: [
        `<WuiRange
  min={100}
  max={200}
  step={0.05}
  value={value}
  onChange={handleChange}
  showLabels
/>`,
        `// Show tooltip
<WuiRange
  min={100}
  max={200}
  value={value}
  onChange={handleChange}
  showLabels
  showValue
/>`,
        `// Show thickened range and prepend a string to the tooltip
<WuiRange
  min={100}
  max={200}
  value={value}
  onChange={handleChange}
  showLabels
  showRange
  showValue
  valuePrepend="100 - "
/>`,
      ],
    },
    {
      title: 'Dual range',
      text: (
        <Fragment>
          <p>
            The <strong>WuiDualRange</strong> accepts almost all the same props
            as the regular <strong>WuiRange</strong>, with the exception of{' '}
            <WuiCode>showRange</WuiCode> which is on by default, and{' '}
            <WuiCode>showValue</WuiCode> since tooltips don&apos;t fit properly
            when there are two.
          </p>
          <WuiCallOut color="warning" title="Retrieving field values">
            <p>
              Two-value <WuiCode>input[type=range]</WuiCode> elements are not
              part of the HTML5 specification. Because of this support gap,{' '}
              <strong>WuiDualRange</strong> cannot expose a native{' '}
              <WuiCode>value</WuiCode> property for native form to consumption.{' '}
              <strong>
                The React <WuiCode>onChange</WuiCode> prop is the recommended
                method for retrieving the upper and lower values.
              </strong>
            </p>
            <p>
              <strong>WuiDualRange</strong> does use native inputs to help
              validate step values and range limits. These may be used as form
              values when <WuiCode>showInput</WuiCode> is in use. The
              alternative is to store values in{' '}
              <WuiCode>input[type=hidden]</WuiCode>.
            </p>
          </WuiCallOut>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dualRangeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dualRangeHtml,
        },
      ],
      props: {
        WuiDualRange,
      },
      demo: <DualRangeExample />,
      snippet: `<WuiDualRange
  min={100}
  max={200}
  step={10}
  value={value}
  onChange={handleChange}
  showLabels
/>`,
    },
    {
      title: 'Inputs',
      text: (
        <Fragment>
          <p>
            The <WuiCode>showInput</WuiCode> prop, will append or bookend the
            range slider with number type inputs. This is important for allowing
            precise values to be entered by the user.
          </p>
          <p>
            Passing empty strings as the <WuiCode>value</WuiCode> to the ranges,
            will allow the inputs to be blank, though the range handles will
            show at the min (or max and min) positions.
          </p>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inputSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inputHtml,
        },
      ],
      demo: <InputExample />,
      props: { WuiRangeInput },
      snippet: ['<WuiRange showInput />', '<WuiDualRange showInput />'],
    },
    {
      title: 'Tick marks',
      text: (
        <Fragment>
          <p>
            To show clickable tick marks and labels at a given interval, add the
            prop <WuiCode>showTicks</WuiCode>. By default, tick mark interval is
            bound to the <WuiCode>step</WuiCode> prop, however, you can set a
            custom interval without changing the actual steps allowed by passing
            a number to the <WuiCode>tickInterval</WuiCode> prop.
          </p>
          <p>
            To pass completely custom tick marks, you can pass an array of
            objects that require a <WuiCode>value</WuiCode> and{' '}
            <WuiCode>label</WuiCode>. The value must be included in the range of
            values (min-max), though the label may be anythin you choose.
          </p>
          <WuiCallOut color="warning" title="Maximum of 20 ticks allowed">
            <p>
              Spacing can get quite cramped with lots of ticks so we max out the
              number to 20.
            </p>
          </WuiCallOut>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ticksSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ticksHtml,
        },
      ],
      demo: <TicksExample />,
      props: { WuiRangeTicks },
      snippet: [
        '<WuiRange step={10} showTicks />',
        '<WuiRange showTicks tickInterval={20} />',
        `<WuiDualRange
  showTicks
  ticks={[
    { label: '20kb', value: 20 },
    { label: '100kb', value: 100 }
  ]}
/>`,
      ],
    },
    {
      title: 'Levels',
      text: (
        <Fragment>
          <p>
            To create colored indicators for certain intervals, pass an array of
            objects that include a <WuiCode>min</WuiCode>,{' '}
            <WuiCode>max</WuiCode> and <WuiCode>color</WuiCode>. Color options
            are{' '}
            <WuiCode language="js">
              {JSON.stringify(LEVEL_COLORS, null, 2)}
            </WuiCode>
            .
          </p>
          <p>
            Be sure to then add an <WuiCode>aria-describedby</WuiCode> and match
            it to the id of a <strong>WuiFormHelpText</strong>.
          </p>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: levelsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: levelsHtml,
        },
      ],
      demo: <LevelsExample />,
      props: { WuiRangeLevels },
      snippet: [
        `<WuiRange
  levels={[
    {min: 0, max: 20, color: 'danger'},
    {min: 20, max: 100, color: 'success'}
  ]}
  aria-describedBy={replaceWithID}
/>`,
        `<WuiDualRange
  levels={[
    {min: 0, max: 20, color: 'danger'},
    {min: 20, max: 100, color: 'success'}
  ]}
  aria-describedBy={replaceWithID}
/>`,
      ],
    },
    {
      title: 'Inputs with range in a dropdown',
      text: (
        <Fragment>
          <p>
            Passing{' '}
            <WuiCode language="js">
              showInput=&quot;inputWithPopover&quot;
            </WuiCode>{' '}
            instead of a boolean will only display the inputs until the input is
            interacted with in which case a dropdown will appear displaying the
            actual slider.
          </p>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inputOnlySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inputOnlyHtml,
        },
      ],
      demo: <InputOnlyExample />,
      snippet: [
        `<WuiRange
  id={rangeId}
  value={value}
  onChange={handleChange}
  showInput="inputWithPopover"
/>`,
        `<WuiDualRange
  id={rangeId}
  value={value}
  onChange={handleChange}
  showInput="inputWithPopover"
/>`,
      ],
    },
    {
      title: 'Kitchen sink',
      text: (
        <Fragment>
          <p>
            Other alterations you can add to the range are{' '}
            <WuiCode>fullWidth</WuiCode>, and <WuiCode>disabled</WuiCode>.
          </p>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: statesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: statesHtml,
        },
      ],
      demo: <StatesExample />,
      snippet: [
        `<WuiRange
  id={rangeId}
  value={value}
  onChange={handleChange}
  fullWidth
  disabled
  showTicks
  showInput
  showLabels
  showValue
  showRange
  tickInterval={20}
  levels={levels}
  aria-describedBy={replaceWithID}
/>`,
        `<WuiDualRange
  id={rangeId}
  value={value}
  onChange={handleChange}
  fullWidth
  disabled
  showLabels
  showInput
  showTicks
  ticks={[{ label: '20kb', value: 20 }]}
  levels={levels}
  aria-describedBy={replaceWithID}
/>`,
      ],
    },
  ],
  playground: [rangeConfig, dualRangeConfig],
};
