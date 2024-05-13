import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiCodeBlock,
  WuiIcon,
  WuiLink,
  WuiSuperDatePicker,
} from '../../../../src/components';

import SuperDatePicker from './super_date_picker';
const superDatePickerSource = require('!!raw-loader!./super_date_picker');
const superDatePickerHtml = renderToHtml(SuperDatePicker);

import SuperDatePickerConfig from './super_date_picker_config';
const superDatePickerConfigSource = require('!!raw-loader!./super_date_picker_config');
const superDatePickerConfigHtml = renderToHtml(SuperDatePicker);

import SuperDatePickerCustomQuickSelect from './super_date_picker_custom_quick_select';
const superDatePickerCustomQuickSelectSource = require('!!raw-loader!./super_date_picker_custom_quick_select');
const superDatePickerCustomQuickSelectHtml = renderToHtml(SuperDatePicker);

const superDatePickerSnippet = `<WuiSuperDatePicker
  onTimeChange={this.onTimeChange}
/>
`;

const superDatePickerCustomQuickSelectSnippet = `customQuickSelectPanels = [
  {
    title: 'My custom panel',
    content: <MyCustomQuickSelectPanel />,
  },
];

<WuiSuperDatePicker
  onTimeChange={this.onTimeChange}
  customQuickSelectPanels={customQuickSelectPanels}
/>
`;

export const SuperDatePickerExample = {
  title: 'Super date picker',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: superDatePickerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: superDatePickerHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>WuiSuperDatePicker</strong> is a date picker that supports
            relative and absolute dates. It offers a convenient{' '}
            <strong>Quick select menu</strong>{' '}
            <WuiIcon type="calendar" color="primary" /> which includes{' '}
            <strong>Commonly used dates</strong>,{' '}
            <strong>Recently used date ranges</strong> and{' '}
            <strong>Set refresh</strong> features.
          </p>
          <p>
            Pass <WuiCode>start</WuiCode> and <WuiCode>end</WuiCode> date times
            as strings in either datemath format (e.g.: <WuiCode>now</WuiCode>,{' '}
            <WuiCode>now-15m</WuiCode>, <WuiCode>now-15m/m</WuiCode>) or as
            absolute date in the format{' '}
            <WuiCode>YYYY-MM-DDTHH:mm:ss.SSSZ</WuiCode>. Use{' '}
            <WuiLink href="https://github.com/elastic/datemath-js">
              datemath
            </WuiLink>{' '}
            to convert start and end strings into moment objects.
          </p>
          <WuiCodeBlock language="js" paddingSize="none" isCopyable>
            {`import dateMath from '@elastic/datemath';

const startMoment = dateMath.parse(start);
// dateMath.parse is inconsistent with unparsable strings.
// Sometimes undefined is returned, other times an invalid moment is returned
if (!startMoment || !startMoment.isValid()) {
  throw new Error('Unable to parse start string');
}

// Pass roundUp when parsing end string
const endMoment = dateMath.parse(end, { roundUp: true });
if (!endMoment || !endMoment.isValid()) {
  throw new Error('Unable to parse end string');
}`}
          </WuiCodeBlock>
        </div>
      ),
      props: { WuiSuperDatePicker },
      snippet: superDatePickerSnippet,
      demo: <SuperDatePicker />,
    },
    {
      title: 'Configurations',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: superDatePickerConfigSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: superDatePickerConfigHtml,
        },
      ],
      text: (
        <div>
          <p>
            When <WuiCode>start</WuiCode> and <WuiCode>end</WuiCode> change from
            interactions with <strong> Quick select</strong>,{' '}
            <strong>Commonly used</strong>, or{' '}
            <strong>Recently used date ranges</strong>,
            <WuiCode>onTimeChange</WuiCode> will be immediately invoked. This is
            because these interactions set both <WuiCode>start</WuiCode> and{' '}
            <WuiCode>end</WuiCode> in a single event.
          </p>
          <p>
            When <WuiCode>start</WuiCode> and <WuiCode>end</WuiCode> change from
            interactions with <strong>Absolute</strong>,{' '}
            <strong>Relative</strong>, and <strong>Now</strong> tabs,
            <WuiCode>onTimeChange</WuiCode> will <strong>not</strong> be
            invoked. In these cases,<WuiCode>onTimeChange</WuiCode> will be
            invoked when the user clicks the <strong>Update</strong> button.
            This gives users the ability to set both <WuiCode>start</WuiCode>{' '}
            and <WuiCode>end</WuiCode> before triggering{' '}
            <WuiCode>onTimeChange</WuiCode>. Set{' '}
            <WuiCode>showUpdateButton</WuiCode> to <WuiCode>false</WuiCode> to
            immediately invoke <WuiCode>onTimeChange</WuiCode> for all{' '}
            <WuiCode>start</WuiCode> and <WuiCode>end</WuiCode> changes.
          </p>
          <p>
            Set <WuiCode>isAutoRefreshOnly</WuiCode> to <WuiCode>true </WuiCode>{' '}
            to limit the component to only display auto refresh content. This is
            useful in cases where there is no time data but auto-refresh
            configuration is still desired.
          </p>
        </div>
      ),
      demo: <SuperDatePickerConfig />,
    },
    {
      title: 'Custom quick select panel',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: superDatePickerCustomQuickSelectSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: superDatePickerCustomQuickSelectHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>WuiSuperDatePicker</strong>&apos;s quick select menu also
            supports <strong>custom panels</strong>. These panels can have their
            own title and perform custom actions on the date picker.
          </p>
        </div>
      ),
      snippet: superDatePickerCustomQuickSelectSnippet,
      demo: <SuperDatePickerCustomQuickSelect />,
    },
  ],
};
