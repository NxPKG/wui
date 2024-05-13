import React from 'react';

import {
  WuiFieldText,
  WuiFormRow,
  WuiSelect,
  WuiPanel,
  WuiIcon,
} from '../../../../src/components';
import { WuiToolTip } from '../../../../src/components/tool_tip';

export default () => (
  <WuiPanel style={{ maxWidth: 300 }}>
    <WuiFormRow
      label="Text field"
      helpText="Show validation help text only."
      display="columnCompressed">
      <WuiFieldText name="first" compressed />
    </WuiFormRow>

    <WuiFormRow
      label={
        <WuiToolTip content="Otherwise use an WuiToolTip around the label of the form row.">
          <span>
            Label <WuiIcon type="questionInCircle" color="subdued" />
          </span>
        </WuiToolTip>
      }
      display="columnCompressed">
      <WuiSelect
        options={[
          { value: 'option_one', text: 'Option one' },
          { value: 'option_two', text: 'Option two' },
          { value: 'option_three', text: 'Option three' },
        ]}
        compressed
      />
    </WuiFormRow>
  </WuiPanel>
);
