import React, { useState, Fragment } from 'react';

import { WuiSelectable } from '../../../../src/components/selectable';
import { WuiSwitch } from '../../../../src/components/form/switch';
import { WuiSpacer } from '../../../../src/components/spacer';

export default () => {
  const [useCustomMessage, setUseCustomMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emptyMessage = 'You have no spice';
  const loadingMessage = "Hey, I'm loading here!";

  return (
    <Fragment>
      <WuiSwitch
        label="Custom message"
        onChange={e => setUseCustomMessage(e.target.checked)}
        checked={useCustomMessage}
      />
      &emsp;
      <WuiSwitch
        label="Show loading"
        onChange={e => setIsLoading(e.target.checked)}
        checked={isLoading}
      />
      <WuiSpacer />
      <WuiSelectable
        aria-label="Messaging example"
        options={[]}
        style={{ width: 300 }}
        listProps={{ bordered: true }}
        isLoading={isLoading}
        loadingMessage={useCustomMessage ? loadingMessage : undefined}
        emptyMessage={useCustomMessage ? emptyMessage : undefined}>
        {list => list}
      </WuiSelectable>
    </Fragment>
  );
};
