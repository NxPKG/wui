import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiLink,
  WuiDatePicker,
  WuiDatePickerRange,
} from '../../../../src/components';

import DatePicker from './date_picker';
const datePickerSource = require('!!raw-loader!./date_picker');
const datePickerHtml = renderToHtml(DatePicker);

import States from './states';
const statesSource = require('!!raw-loader!./states');
const statesHtml = renderToHtml(States);

import Locale from './locale';
const localeSource = require('!!raw-loader!./locale');
const localeHtml = renderToHtml(Locale);

import Time from './time_select';
const timeSource = require('!!raw-loader!./time_select');
const timeHtml = renderToHtml(Time);

import Inline from './inline';
const inlineSource = require('!!raw-loader!./inline');
const inlineHtml = renderToHtml(Inline);

import Range from './range';
const rangeSource = require('!!raw-loader!./range');
const rangeHtml = renderToHtml(Range);

import MinMax from './min_max';
const minMaxSource = require('!!raw-loader!./min_max');
const minMaxHtml = renderToHtml(MinMax);

import Classes from './classes';
const classesSource = require('!!raw-loader!./classes');
const classesHtml = renderToHtml(Classes);

import OpenToDate from './open_to_date';
const openToDateSource = require('!!raw-loader!./open_to_date');
const openToDateHtml = renderToHtml(OpenToDate);

import CustomInput from './custom_input';
const customInputSource = require('!!raw-loader!./custom_input');
const customInputHtml = renderToHtml(CustomInput);

import Utc from './utc';
const utcSource = require('!!raw-loader!./utc');
const utcHtml = renderToHtml(Utc);

const datePickerSnippet =
  '<WuiDatePicker selected={startDate} onChange={handleChange} />';

const statesSnippet = [
  `<WuiDatePicker
  selected={startDate}
  onChange={handleChange}
  onClear={onClear}
  placeholder="Clearable"
/>
`,
  `<WuiDatePicker
  isInvalid
  selected={startDate}
  onChange={handleChange}
  placeholder="Example of an error"
/>
`,
];

const timeSnippet = [
  `<WuiDatePicker
  showTimeSelect
  selected={startDate}
  onChange={handleChange}
/>
`,
  `<WuiDatePicker
  showTimeSelect
  showTimeSelectOnly
  selected={startDate}
  onChange={handleChange}
/>
`,
  `<WuiDatePicker
  showTimeSelect
  showTimeSelectOnly
  selected={startDate}
  onChange={handleChange}
  injectTimes={[times]}
/>
`,
];

const localeSnippet = `<WuiDatePicker
  showTimeSelect
  selected={startDate}
  onChange={handleChange}
  dateFormat="DD-MM-YYYY HH:mm"
  timeFormat="HH:mm"
  locale="de-de"
/>`;

const rangeSnippet = `<WuiDatePickerRange
  startDateControl={
    <WuiDatePicker
      selected={startDate}
      onChange={handleChange}
      startDate={startDate}
      endDate={endDate}
      isInvalid={isInvalid}
      showTimeSelect
    />
  }
  endDateControl={
    <WuiDatePicker
      selected={endDate}
      onChange={handleChange}
      startDate={startDate}
      endDate={endDate}
      isInvalid={isInvalid}
      showTimeSelect
    />
  }
/>`;

const minMaxSnippet = [
  `<WuiDatePicker
  showTimeSelect
  selected={startDate}
  onChange={handleChange}
  minDate={minDate}
  maxDate={maxDate}
  minTime={minTime}
  maxTime={maxTime}
/>
`,
  `<WuiDatePicker
  showTimeSelect
  showTimeSelectOnly
  selected={startDate}
  onChange={handleChange}
  excludeDates={[excludeDates]}
  excludeTimes={[excludeTimes]}
/>
`,
  `<WuiDatePicker
  showTimeSelect
  showTimeSelectOnly
  selected={startDate}
  onChange={handleChange}
  filterDate={filterDate}
/>
`,
];

const openToDateSnippet = `<WuiDatePicker
  selected={startDate}
  onChange={handleChange}
  openToDate={openToDate}
/>`;

const customInputSnippet = `<WuiDatePicker
  selected={startDate}
  onChange={handleChange}
  customInput={customInput}
/>`;

const utcSnippet = `<WuiDatePicker
  selected={startDate}
  onChange={handleChange}
  customInput={customInput}
/>`;

const inlineSnippet = `<WuiDatePicker
  selected={startDate}
  onChange={handleChange}
  showTimeSelect
  inline
  shadow={false}
/>`;

const classesSnippet = `<WuiDatePicker
  selected={startDate}
  onChange={handleChange}
  className="customClassName"
/>`;

export const DatePickerExample = {
  title: 'Date picker',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: datePickerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: datePickerHtml,
        },
      ],
      text: (
        <p>
          At its most bare the <strong>WuiDatePicker</strong> only requires
          props for <WuiCode>selected</WuiCode> and <WuiCode>onChange</WuiCode>.
          It depends on{' '}
          <WuiLink href="https://momentjs.com/docs/">moment</WuiLink> for all of
          its formatting.
        </p>
      ),
      components: { WuiDatePicker },
      snippet: datePickerSnippet,
      demo: <DatePicker />,
      props: { WuiDatePicker },
    },
    {
      title: 'Date picker states',
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
      text: (
        <p>
          Examples of how the input can appear within a form. This should match
          our other form styles.
        </p>
      ),
      snippet: statesSnippet,
      demo: <States />,
    },
    {
      title: 'Time selection',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: timeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: timeHtml,
        },
      ],
      text: (
        <p>
          Two props control time selection. <WuiCode>showTimeSelect</WuiCode>{' '}
          will make time selection appear next to the calendar and{' '}
          <WuiCode>showTimeSelectOnly</WuiCode> will exclude the calendar and
          make the time selection the only thing you see. Make sure to adjust
          your <WuiCode>dateFormat</WuiCode> and <WuiCode>timeFormat</WuiCode>{' '}
          values to match.
        </p>
      ),
      snippet: timeSnippet,
      demo: <Time />,
    },
    {
      title: 'Locale',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: localeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: localeHtml,
        },
      ],
      text: (
        <p>
          Locale formatting is achieved by using the <WuiCode>locale</WuiCode>,
          <WuiCode>timeFormat</WuiCode>, and <WuiCode>dateFormat</WuiCode>{' '}
          props. The latter will take any <WuiCode>moment()</WuiCode> notation.
          Check{' '}
          <a href="https://en.wikipedia.org/wiki/Date_format_by_country">
            Date format by country
          </a>{' '}
          for formatting examples.
        </p>
      ),
      snippet: localeSnippet,
      demo: <Locale />,
    },
    {
      title: 'Date picker range',
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
      text: (
        <p>
          By passing <WuiCode>startDate</WuiCode> and <WuiCode>endDate</WuiCode>{' '}
          props you can provide styling the range in between two dates. To
          further style the group as a single control, use{' '}
          <strong>WuiDatePickerRange</strong> and pass the date picker controls
          into the <WuiCode>startDateControl</WuiCode> and{' '}
          <WuiCode>endDateControl</WuiCode> props.
        </p>
      ),
      demo: <Range />,
      snippet: rangeSnippet,
      props: { WuiDatePickerRange },
    },
    {
      title: 'Only allow specific dates and times',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: minMaxSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: minMaxHtml,
        },
      ],
      text: (
        <p>
          Use the <WuiCode>minDate</WuiCode>,<WuiCode>maxDate</WuiCode>,
          <WuiCode>minTime</WuiCode>, and <WuiCode>maxTime</WuiCode>
          props to specify specific ranges the <WuiCode>selected</WuiCode> code
          must must fall into. You can also use the{' '}
          <WuiCode>excludeDates</WuiCode> and
          <WuiCode>excludeTimes</WuiCode> property to disallow a specific array
          of items from selection.
        </p>
      ),
      snippet: minMaxSnippet,
      demo: <MinMax />,
    },
    {
      title: 'Open to a specific date',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: openToDateSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: openToDateHtml,
        },
      ],
      text: (
        <p>
          Use <WuiCode>openToDate</WuiCode> to default selection to a specific
          date.
        </p>
      ),
      snippet: openToDateSnippet,
      demo: <OpenToDate />,
    },
    {
      title: 'Custom input',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customInputSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customInputHtml,
        },
      ],
      text: (
        <p>
          Use <WuiCode>customInput</WuiCode> to pass a custom input to trigger
          your calendar.
        </p>
      ),
      snippet: customInputSnippet,
      demo: <CustomInput />,
    },
    {
      title: 'UTC offsets',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: utcSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: utcHtml,
        },
      ],
      text: (
        <p>
          Use <WuiCode>utcOffset</WuiCode> to apply an offset to the datetime.
        </p>
      ),
      snippet: utcSnippet,
      demo: <Utc />,
    },
    {
      title: 'Date picker inline',
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
          Use the <WuiCode>inline</WuiCode> prop to display the date picker
          directly in the page. If you do not need the shadows / popover effect
          to the date picker then also apply the{' '}
          <WuiCode language="js">shadow=false</WuiCode> prop as shown in the
          second example.
        </p>
      ),
      snippet: inlineSnippet,
      demo: <Inline />,
    },
    {
      title: 'Custom classes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: classesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: classesHtml,
        },
      ],
      text: (
        <div>
          <p>
            Custom classes can be passed to various bits of the calendar and
            input.
          </p>
          <ul>
            <li>
              <WuiCode>className</WuiCode> will pass onto the input.
            </li>
            <li>
              <WuiCode>calendarClassName</WuiCode> will pass onto the calendar
              itself.
            </li>
            <li>
              <WuiCode>dayClassName</WuiCode> will pass onto specificed days.
            </li>
            <li>
              <WuiCode>popperClassName</WuiCode> will pass onto the popover.
            </li>
          </ul>
        </div>
      ),
      snippet: classesSnippet,
      demo: <Classes />,
    },
  ],
};
