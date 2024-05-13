import React from 'react';

import { WuiMarkdownFormat } from '../../../../src';

const markdownContent = `Beyond Remark's base syntax, **WuiMarkdownFormat** bundles these abilities by default:

\`:smile:\` we support emojis :smile:!

\`!{tooltip[anchor text](Tooltip content)}\` syntax can render !{tooltip[tooltips like this](I am Jack's helpful tooltip content)}

We also support checkboxes so that

\`\`\`
- [ ] Checkboxes
- [x] Can be filled
- [ ] Or empty
\`\`\`

turns into

- [ ] Checkboxes
- [x] Can be filled
- [ ] Or empty

Note that you'll need to use *WuiMarkdownEditor* to make those checkboxes dynamic.
`;

export default () => {
  return <WuiMarkdownFormat>{markdownContent}</WuiMarkdownFormat>;
};
