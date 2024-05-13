import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiFormRow,
  WuiToolTip,
  WuiCallOut,
  WuiText,
  WuiSpacer,
} from '../../../../src/components';

import FormCompressed from './form_compressed';
const formCompressedSource = require('!!raw-loader!./form_compressed');
const formCompressedHtml = renderToHtml(FormCompressed);

import FormHorizontal from './form_horizontal';
const formHorizontalSource = require('!!raw-loader!./form_horizontal');
const formHorizontalHtml = renderToHtml(FormHorizontal);

import FormHelp from './form_horizontal_help';
const formHelpSource = require('!!raw-loader!./form_horizontal_help');
const formHelpHtml = renderToHtml(FormHelp);

import ComplexExample from './complex_example';
const ComplexExampleSource = require('!!raw-loader!./complex_example');
const ComplexExampleHtml = renderToHtml(ComplexExample);

export const FormCompressedExample = {
  title: 'Compressed forms',
  intro: (
    <Fragment>
      <WuiText>
        <p>
          Also known as <strong>Editor-Style Controls</strong>, compressed forms
          and controls were specifically created for use when space is at a
          premium. They are not intended for use when the form is the main
          objective of the page. They work best in editor-style applications
          where form controls are being used to create or edit content on the
          page.
        </p>
      </WuiText>
      <WuiSpacer />
      <WuiCallOut
        color="danger"
        title="Do not use compressed and non-compressed form controls in the same form."
      />
      <WuiSpacer />
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formCompressedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formCompressedHtml,
        },
      ],
      text: (
        <p>
          To use compressed forms, pass{' '}
          <WuiCode language="js">display=&quot;rowCompressed&quot;</WuiCode> to
          the WuiFormRows and <WuiCode language="js">compressed=true</WuiCode>{' '}
          to the form controls themselves.
        </p>
      ),
      props: {
        WuiFormRow,
      },
      demo: <FormCompressed />,
      snippet: [
        `<WuiFormRow
  label="Text field"
  display="rowCompressed"
>
  <WuiFieldText compressed />
</WuiFormRow>`,
      ],
    },
    {
      title: 'Column layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formHorizontalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formHorizontalHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Editor-style controls can be displayed in a two column layout for
            even better use of limited space, just pass{' '}
            <WuiCode language="js">
              display=&quot;columnCompressed&quot;
            </WuiCode>{' '}
            to align the labels and inputs side by side.
          </p>
          <p>
            <strong>WuiSwitches</strong> are a special case in which so you must
            pass <WuiCode language="js">{'"columnCompressedSwitch"'}</WuiCode>{' '}
            to the WuiFormRow as the display property.
          </p>
        </Fragment>
      ),
      props: {
        WuiFormRow,
      },
      demo: <FormHorizontal />,
      snippet: [
        `<WuiFormRow
  label="Text field"
  display="columnCompressed"
>
  <WuiFieldText compressed />
</WuiFormRow>`,
        `<WuiFormRow
  label="Switch"
  display="columnCompressedSwitch"
>
  <WuiSwitch compressed />
</WuiFormRow>`,
      ],
    },
    {
      title: 'Contextual help',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formHelpSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formHelpHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            When using compressed, horizontal form styles, it is best not to
            overload the UI with expansive help text. If it&apos;s short and
            part of the validation, use <WuiCode>helpText</WuiCode>. However, if
            it&apos;s an explanation of the control, consider wraping the label
            with an{' '}
            <Link to="/display/tooltip">
              <strong>WuiToolTip</strong>
            </Link>{' '}
            and appending the <WuiCode>questionInCircle</WuiCode> icon to it.
          </p>
        </Fragment>
      ),
      props: {
        WuiFormRow,
        WuiToolTip,
      },
      demo: <FormHelp />,
      snippet: [
        `<WuiFormRow
  display="columnCompressed"
  label=""
  helpText="">
  <WuiFieldText compressed />
</WuiFormRow>`,
        `<WuiFormRow
  display="columnCompressed"
  label={
    <WuiToolTip content="">
      <span>
        Label <WuiIcon type="questionInCircle" color="subdued" />
      </span>
    </WuiToolTip>
  }>
  <WuiFieldText compressed />
</WuiFormRow>`,
      ],
    },
    {
      title: 'Complex example',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ComplexExampleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ComplexExampleHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            This is an example of how to combine compressed form controls with
            from rows, labels, prepend and appends in a column layout.
          </p>
          <WuiCallOut
            color="warning"
            iconType="accessibility"
            title={
              <span>
                Pay close attention to the patterns of using{' '}
                <WuiCode>htmlFor</WuiCode> and <WuiCode>aria-label</WuiCode>.
                For best results, each form control that is not wrapped in an
                WuiFormRow should be supplied an <WuiCode>id</WuiCode>.
              </span>
            }
          />
        </Fragment>
      ),
      demo: <ComplexExample />,
    },
  ],
};
