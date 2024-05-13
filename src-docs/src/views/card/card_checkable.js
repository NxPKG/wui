import React, { useState, Fragment } from 'react';

import {
  WuiCheckableCard,
  WuiSpacer,
  WuiRadioGroup,
  WuiTitle,
  WuiFormFieldset,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const radioName = htmlIdGenerator()();
  const [radio, setRadio] = useState('radio2');
  const [nestedRadio, setNestedRadio] = useState('nestedRadio1');
  const [checkbox, setCheckbox] = useState(false);

  const nestedRadios = [
    {
      id: 'nestedRadio1',
      label: 'Nested option one',
    },
    {
      id: 'nestedRadio2',
      label: 'Nested option two',
    },
    {
      id: 'nestedRadio3',
      label: 'Nested option three',
    },
  ];

  return (
    <Fragment>
      <WuiFormFieldset
        legend={{
          children: (
            <WuiTitle size="xs">
              <span>Checkable card radio group with legend</span>
            </WuiTitle>
          ),
        }}>
        <WuiCheckableCard
          id={htmlIdGenerator()()}
          label="Option one"
          name={radioName}
          value="radio1"
          checked={radio === 'radio1'}
          onChange={() => setRadio('radio1')}
        />

        <WuiSpacer size="m" />

        <WuiCheckableCard
          id={htmlIdGenerator()()}
          label="Option two"
          name={radioName}
          value="radio2"
          checked={radio === 'radio2'}
          onChange={() => setRadio('radio2')}>
          <WuiRadioGroup
            options={nestedRadios}
            idSelected={nestedRadio}
            onChange={nestedRadio => setNestedRadio(nestedRadio)}
            disabled={radio !== 'radio2'}
          />
        </WuiCheckableCard>

        <WuiSpacer size="m" />

        <WuiCheckableCard
          id={htmlIdGenerator()()}
          label="Option three (disabled)"
          name={radioName}
          value="radio3"
          checked={radio === 'radio3'}
          onChange={() => setRadio('radio3')}
          disabled
        />
      </WuiFormFieldset>

      <WuiSpacer size="xl" />

      <WuiCheckableCard
        id={htmlIdGenerator()()}
        label="I am a checkbox"
        checkableType="checkbox"
        value="checkbox1"
        checked={checkbox}
        onChange={() => setCheckbox(!checkbox)}
      />
    </Fragment>
  );
};
