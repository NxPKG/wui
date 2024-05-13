import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiBadge,
  WuiCallOut,
  WuiCheckbox,
  WuiCheckboxGroup,
  WuiCode,
  WuiFieldNumber,
  WuiFieldPassword,
  WuiFieldSearch,
  WuiFieldText,
  WuiFilePicker,
  WuiFormFieldset,
  WuiFormLegend,
  WuiFormControlLayout,
  WuiFormControlLayoutDelimited,
  WuiLink,
  WuiRadio,
  WuiRadioGroup,
  WuiSelect,
  WuiSwitch,
  WuiTextArea,
  WuiSpacer,
} from '../../../../src/components';

import playgrounds from './playground';

import FieldSearch from './field_search';
const fieldSearchSource = require('!!raw-loader!./field_search');
const fieldSearchHtml = renderToHtml(FieldSearch);
const fieldSearchSnippet = [
  `<WuiFieldSearch
  placeholder="Search this"
  value={value}
  isClearable={isClearable}
  onChange={onChange}
/>`,
];

import FieldText from './field_text';
const fieldTextSource = require('!!raw-loader!./field_text');
const fieldTextHtml = renderToHtml(FieldText);
const fieldTextSnippet = [
  `<WuiFieldText
  placeholder="Placeholder text"
  value={value}
  onChange={onChange}
/>`,
];

import FieldNumber from './field_number';
const fieldNumberSource = require('!!raw-loader!./field_number');
const fieldNumberHtml = renderToHtml(FieldNumber);
const fieldNumberSnippet = [
  `<WuiFieldNumber
  placeholder="Placeholder text"
  value={value}
  onChange={onChange}
/>`,
];

import FieldPassword from './field_password';
const fieldPasswordSource = require('!!raw-loader!./field_password');
const fieldPasswordHtml = renderToHtml(FieldPassword);
const fieldPasswordSnippet = [
  `<WuiFieldPassword
  placeholder="Placeholder text"
  value={value}
  onChange={onChange}
  type="dual"
/>`,
];

import TextArea from './text_area';
const textAreaSource = require('!!raw-loader!./text_area');
const textAreaHtml = renderToHtml(TextArea);
const textAreaSnippet = [
  `<WuiTextArea
  placeholder="Placeholder text"
  value={value}
  onChange={onChange}
/>`,
];

import FilePicker from './file_picker';
const filePickerSource = require('!!raw-loader!./file_picker');
const filePickerHtml = renderToHtml(FilePicker);
const filePickerSnippet = [
  `<WuiFilePicker
  id={filePickerId}
  multiple
  initialPromptText="content that appears in the dropzone if no file is attached"
  onChange={onChange}
/>`,
];

import Select from './select';
const selectSource = require('!!raw-loader!./select');
const selectHtml = renderToHtml(Select);
const selectSnippet = [
  `<WuiSelect
  options={[
    {
      value: 'option_one',
      text: 'Option one',
    }
  ]}
  value={value}
  onChange={onChange}
/>`,
];

import Checkbox from './checkbox';
const checkboxSource = require('!!raw-loader!./checkbox');
const checkboxHtml = renderToHtml(Checkbox);
const checkboxSnippet = [
  `<WuiCheckbox
  id={checkboxId}
  label="I am a checkbox"
  checked={checked}
  onChange={onChange}
/>`,
  `<WuiCheckbox
  id={checkboxId}
  label="I am an indeterminate checkbox"
  indeterminate={indeterminate}
  onChange={onChangeIndeterminate}
/>`,
];

import CheckboxGroup from './checkbox_group';
const checkboxGroupSource = require('!!raw-loader!./checkbox_group');
const checkboxGroupHtml = renderToHtml(CheckboxGroup);

import Radio from './radio';
const radioSource = require('!!raw-loader!./radio');
const radioHtml = renderToHtml(Radio);
const radioSnippet = [
  `<WuiRadio
  label="I am a radio"
  checked={checked}
  onChange={onChange}
/>`,
];

import RadioGroup from './radio_group';
const radioGroupSource = require('!!raw-loader!./radio_group');
const radioGroupHtml = renderToHtml(RadioGroup);

import Switch from './switch';
const switchSource = require('!!raw-loader!./switch');
const switchHtml = renderToHtml(Switch);
const switchSnippet = [
  `<WuiSwitch
  label="I am a switch"
  checked={checked}
  onChange={onChange}
/>`,
];

import PrependAppend from './prepend_append';
const PrependAppendSource = require('!!raw-loader!./prepend_append');
const PrependAppendHtml = renderToHtml(PrependAppend);

import Fieldset from './fieldset';
const fieldsetSource = require('!!raw-loader!./fieldset');
const fieldsetHtml = renderToHtml(Fieldset);

import FormControlLayout from './form_control_layout';
const formControlLayoutSource = require('!!raw-loader!./form_control_layout');
const formControlLayoutHtml = renderToHtml(FormControlLayout);

import FormControlLayoutRange from './form_control_layout_range';
const formControlLayoutRangeSource = require('!!raw-loader!./form_control_layout_range');
const formControlLayoutRangeHtml = renderToHtml(FormControlLayoutRange);

export const FormControlsExample = {
  title: 'Form controls',
  sections: [
    {
      title: 'Text field',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fieldTextSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fieldTextHtml,
        },
      ],
      snippet: fieldTextSnippet,
      props: {
        WuiFieldText,
      },
      demo: <FieldText />,
    },
    {
      title: 'Search field',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fieldSearchSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fieldSearchHtml,
        },
      ],
      snippet: fieldSearchSnippet,
      props: {
        WuiFieldSearch,
      },
      demo: <FieldSearch />,
    },
    {
      title: 'Number field',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fieldNumberSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fieldNumberHtml,
        },
      ],
      snippet: fieldNumberSnippet,
      props: {
        WuiFieldNumber,
      },
      demo: <FieldNumber />,
    },
    {
      title: 'Password field',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fieldPasswordSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fieldPasswordHtml,
        },
      ],
      snippet: fieldPasswordSnippet,
      props: {
        WuiFieldPassword,
      },
      demo: <FieldPassword />,
    },
    {
      title: 'Select',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectHtml,
        },
      ],
      text: (
        <p>
          This component renders a basic HTML{' '}
          <WuiCode language="html">&lt;select&gt;</WuiCode> element. If you need
          more customization for how the options and/or selected values render,
          use the{' '}
          <Link to="/forms/super-select">
            <strong>WuiSuperSelect</strong>
          </Link>
          . Another option is to use the{' '}
          <Link to="/forms/combo-box">
            <strong>WuiComboBox</strong>
          </Link>
          , which has search and multi-select capabilities, but also has
          restrictions on how items are rendered.
        </p>
      ),
      snippet: selectSnippet,
      props: {
        WuiSelect,
      },
      demo: <Select />,
    },
    {
      title: 'Textarea',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textAreaSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textAreaHtml,
        },
      ],
      snippet: textAreaSnippet,
      props: {
        WuiTextArea,
      },
      demo: <TextArea />,
    },
    {
      title: 'File Picker',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: filePickerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: filePickerHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiFilePicker</strong> is a stylized, but generic HTML{' '}
          <WuiCode language="html">&lt;input type=&quot;file&quot;&gt;</WuiCode>{' '}
          tag. It supports drag and drop as well as on click style selection of
          files. The example below shows how to grab the files using the{' '}
          <WuiLink
            href="https://developer.mozilla.org/en-US/docs/Web/API/FileList"
            target="_blank">
            FileList API
          </WuiLink>
          . Like other form elements, you can wrap it in a{' '}
          <strong>WuiFormRow</strong> to apply a label.
        </p>
      ),
      components: { WuiFilePicker },
      snippet: filePickerSnippet,
      demo: <FilePicker />,
      props: { WuiFilePicker },
    },
    {
      title: 'Checkbox',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: checkboxSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: checkboxHtml,
        },
      ],
      snippet: checkboxSnippet,
      props: {
        WuiCheckbox,
      },
      demo: <Checkbox />,
    },
    {
      title: 'Checkbox group',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: checkboxGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: checkboxGroupHtml,
        },
      ],
      props: {
        WuiCheckboxGroup,
      },
      demo: <CheckboxGroup />,
      snippet: `<WuiCheckboxGroup
  options={[
    {
      id: id1,
      label: 'Option one',
    },
  ]}
  idToSelectedMap={{ id1: true }}
  onChange={onChange}
/>`,
    },
    {
      title: 'Radio',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: radioSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: radioHtml,
        },
      ],
      snippet: radioSnippet,
      props: {
        WuiRadio,
      },
      demo: <Radio />,
    },
    {
      title: 'Radio group',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: radioGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: radioGroupHtml,
        },
      ],
      props: {
        WuiRadioGroup,
      },
      demo: <RadioGroup />,
      snippet: `<WuiRadioGroup
  options={[
    {
      id: id1,
      label: 'Option one',
    },
  ]}
  idSelected={id1}
  onChange={onChange}
  name="radio group"
  legend={{
    children: 'A legend',
  }}
/>`,
    },
    {
      title: 'Switch',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: switchSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: switchHtml,
        },
      ],
      snippet: switchSnippet,
      props: {
        WuiSwitch,
      },
      demo: <Switch />,
    },
    {
      title: 'Fieldset and legend',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fieldsetSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fieldsetHtml,
        },
      ],
      text: (
        <Fragment>
          <WuiCallOut
            color="warning"
            iconType="accessibility"
            size="s"
            title={
              <span>
                &quot;[Use a fieldset and legend] for groups of related controls
                where the individual labels for each control do not provide a
                sufficient description, and an additional group level
                description is needed.&quot;{' '}
                <WuiLink
                  external
                  href="https://www.w3.org/WAI/WCAG21/Techniques/html/H71">
                  WCAG Spec
                </WuiLink>
              </span>
            }
          />
          <WuiSpacer />
          <p>
            <strong>WuiFormFieldset</strong> simply wraps its children in a{' '}
            <WuiCode language="html">&lt;fieldset&gt;</WuiCode> with the option
            to add a <WuiCode language="html">&lt;legend&gt;</WuiCode> via the{' '}
            <WuiCode>legend</WuiCode> object prop.
          </p>
        </Fragment>
      ),
      props: {
        WuiFormFieldset,
        WuiFormLegend,
      },
      demo: <Fieldset />,
      snippet: [
        `<WuiFormFieldset legend={{ children: 'Legend' }}>
  <!-- Controls -->
</WuiFormFieldset>`,
        `<WuiFormFieldset legend={{ children: 'Hidden legend', display: 'hidden' }}>
  <!-- Controls -->
</WuiFormFieldset>`,
      ],
    },
    {
      title: 'Prepend and Append',
      text: (
        <Fragment>
          <p>
            Most form controls accept a <WuiCode>prepend</WuiCode> and{' '}
            <WuiCode>append</WuiCode> prop that allows passing a single
            node/string or an array of nodes/strings. Strings will be converted
            into form labels and connected to the input via{' '}
            <WuiCode>htmlFor</WuiCode> for accessibility.
          </p>
          <p>
            These are great for demarcating the input&apos;s metric like
            &quot;px&quot; or &quot;ms&quot;. You can also pass buttons for
            input settings or additional filters. Just be sure to use
            <WuiCode language="js">
              &lt;WuiButtonEmpty size=&quot;xs&quot; /&gt;
            </WuiCode>
            .
          </p>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PrependAppendSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: PrependAppendHtml,
        },
      ],
      demo: <PrependAppend />,
      snippet: [
        `<WuiFieldText
  prepend="Label"
  append="px"
/>`,
        `<WuiFieldText
  prepend={prepend}
  append={append}
/>`,
      ],
    },
    {
      title: 'Form control layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formControlLayoutSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formControlLayoutHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            <WuiBadge color={'warning'}>Building block only</WuiBadge>
          </p>

          <p>
            <strong>WuiFormControlLayout</strong> is generally used internally
            to consistently style form controls, but it&rsquo;s published in
            case you want to create your own form control which matches those of
            WUI. The examples below demonstrate its various states.
          </p>

          <WuiCallOut title="Additional padding required" color="warning">
            <p>
              The padding on the <WuiCode>input</WuiCode> itself doesn&rsquo;t
              take into account the presence of the various icons supported by{' '}
              <strong>WuiFormControlLayout</strong>. Any input component
              provided to <strong>WuiFormControlLayout</strong> is responsible
              for its own padding.
            </p>
          </WuiCallOut>
        </Fragment>
      ),
      props: {
        WuiFormControlLayout,
      },
      demo: <FormControlLayout />,
    },
    {
      title: 'Form control layout delimited',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formControlLayoutRangeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formControlLayoutRangeHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            <WuiBadge color={'warning'}>Building block only</WuiBadge>
          </p>

          <p>
            Like <strong>WuiFormControlLayout</strong>,{' '}
            <strong>WuiFormControlLayoutDelimited</strong> is generally used
            internally to consistently style form controls. This component
            specifically lays out two form controls with center text or icon.
          </p>
          <p>
            It takes all of the same props as{' '}
            <strong>WuiFormControlLayout</strong> except for{' '}
            <WuiCode>children</WuiCode>. Instead it requires both a{' '}
            <strong>single</strong> <WuiCode>startControl</WuiCode> and a{' '}
            <strong>single</strong> <WuiCode>endControl</WuiCode>. You can
            optionally change the center content to a different string or node
            (like an WuiIcon).
          </p>
        </Fragment>
      ),
      props: {
        WuiFormControlLayoutDelimited,
      },
      demo: <FormControlLayoutRange />,
    },
  ],
  playground: playgrounds,
};
