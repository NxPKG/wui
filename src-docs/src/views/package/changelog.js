import React from 'react';

import { WuiMarkdownFormat } from '../../../../src';
import { GuidePage } from '../../components/guide_page';

const changelogSource = require('!!raw-loader!../../../../CHANGELOG.md').default.replace(
  /## \[`master`\].+?##/s, // remove the `master` heading & contents
  '##'
);

export const Changelog = {
  name: 'Changelog',
  component: () => (
    <GuidePage title="Changelog">
      <WuiMarkdownFormat>{changelogSource}</WuiMarkdownFormat>
    </GuidePage>
  ),
};
