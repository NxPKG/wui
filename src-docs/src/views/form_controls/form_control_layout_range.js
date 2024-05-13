import React, { Fragment } from 'react';

import {
  WuiFormControlLayoutDelimited,
  WuiSpacer,
  WuiFormLabel,
  WuiIcon,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <WuiFormControlLayoutDelimited
      startControl={
        <input
          type="number"
          placeholder="0"
          className="wuiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="wuiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <WuiSpacer size="m" />
    <WuiFormControlLayoutDelimited
      append={<WuiFormLabel>px</WuiFormLabel>}
      startControl={
        <input
          type="number"
          placeholder="0"
          className="wuiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="wuiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <WuiSpacer size="m" />
    <WuiFormControlLayoutDelimited
      icon="vector"
      startControl={
        <input
          type="number"
          placeholder="0"
          className="wuiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="wuiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <WuiSpacer size="m" />
    <WuiFormControlLayoutDelimited
      clear={{ onClick: () => {} }}
      isLoading
      startControl={
        <input
          type="number"
          placeholder="0"
          className="wuiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="wuiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <WuiSpacer size="m" />
    <WuiFormControlLayoutDelimited
      fullWidth
      startControl={
        <input
          type="number"
          placeholder="0"
          className="wuiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="wuiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <WuiSpacer size="m" />
    <WuiFormControlLayoutDelimited
      isLoading
      startControl={
        <input
          type="number"
          placeholder="0"
          className="wuiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="wuiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <WuiSpacer size="m" />
    <WuiFormControlLayoutDelimited
      compressed
      startControl={
        <input
          type="number"
          placeholder="0"
          className="wuiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="wuiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <WuiSpacer size="m" />

    <WuiFormControlLayoutDelimited
      prepend={<WuiFormLabel>Add</WuiFormLabel>}
      startControl={
        <input
          type="number"
          placeholder="0"
          className="wuiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      delimiter="+"
      endControl={
        <input
          type="number"
          placeholder="100"
          className="wuiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <WuiSpacer size="m" />

    <WuiFormControlLayoutDelimited
      prepend={<WuiFormLabel>Merge</WuiFormLabel>}
      startControl={
        <input
          type="number"
          placeholder="0"
          className="wuiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      delimiter={<WuiIcon type="merge" />}
      endControl={
        <input
          type="number"
          placeholder="100"
          className="wuiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <WuiSpacer size="m" />

    <WuiFormControlLayoutDelimited
      readOnly
      prepend={<WuiFormLabel>Read only</WuiFormLabel>}
      startControl={
        <input
          type="number"
          placeholder="0"
          className="wuiFieldNumber"
          readOnly
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="wuiFieldNumber"
          readOnly
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />
  </Fragment>
);
