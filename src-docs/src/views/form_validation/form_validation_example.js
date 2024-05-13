import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiForm,
  WuiFormRow,
  WuiFieldText,
  WuiSelect,
  WuiTextArea,
} from '../../../../src/components';

import Validation from './validation';
const validationSource = require('!!raw-loader!./validation');
const validationHtml = renderToHtml(Validation);

export const FormValidationExample = {
  title: 'Form validation',
  sections: [
    {
      text: (
        <p>
          Validation is achieved by applying <WuiCode>isInvalid</WuiCode> and
          optionally error props onto the <strong>WuiForm</strong> or{' '}
          <strong>WuiFormRow</strong> components. Errors are optional and are
          passed as an array in case you need to list more than one. You can
          also hide the callout by passing
          <WuiCode>invalidCallout=&ldquo;none&ldquo;</WuiCode>
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: validationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: validationHtml,
        },
      ],
      props: {
        WuiForm,
        WuiSelect,
        WuiFormRow,
        WuiTextArea,
        WuiFieldText,
      },
      demo: <Validation />,
    },
  ],
};
