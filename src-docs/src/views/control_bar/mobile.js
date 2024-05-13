import React, { useState } from 'react';

import { WuiButton, WuiControlBar } from '../../../../src/components';

export default () => {
  const [isDisplaying, setDisplay] = useState(false);

  const toggleDisplay = () => {
    setDisplay(!isDisplaying);
  };

  const controls = [
    {
      controlType: 'icon',
      id: 'icon',
      iconType: 'folderClosed',
      'aria-label': 'folder',
      className: 'wui-hideFor--m wui-hideFor--l wui-hideFor--xl',
    },
    {
      controlType: 'breadcrumbs',
      id: 'current_file_path',
      className: 'wui-hideFor--s wui-hideFor--xs',
      breadcrumbs: [
        {
          text: 'src',
        },
        {
          text: 'components',
        },
      ],
    },
    {
      controlType: 'spacer',
    },
    {
      controlType: 'icon',
      id: 'github_icon',
      iconType: 'logoGithub',
      'aria-label': 'Github',
    },
    {
      controlType: 'text',
      id: 'github_text',
      text: 'Open in Github',
    },
  ];

  let display;

  if (isDisplaying) {
    display = <WuiControlBar controls={controls} showOnMobile />;
  }

  return (
    <div>
      <WuiButton onClick={toggleDisplay}>Toggle mobile example</WuiButton>
      {display}
    </div>
  );
};
