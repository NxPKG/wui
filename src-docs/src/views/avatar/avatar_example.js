import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiAvatar, WuiCode } from '../../../../src/components';
import avatarConfig from './playground';

import Avatar from './avatar';
const avatarSource = require('!!raw-loader!./avatar');
const avatarHtml = renderToHtml(Avatar);
const avatarSnippet = [
  `<WuiAvatar size="s" name="Raphael" />
`,
  `<WuiAvatar size="s" name="Cat" imageUrl="https://source.unsplash.com/64x64/?cat" />
`,
];

import AvatarInitials from './avatar_initials';
const avatarInitialsSource = require('!!raw-loader!./avatar_initials');
const avatarInitialsHtml = renderToHtml(AvatarInitials);
const avatarInitialsSnippet = [
  `<WuiAvatar size="m" type="user" name="Two Words" />
`,
  `<WuiAvatar size="m" type="space" name="Wazuh" initialsLength={2}/>
`,
  `<WuiAvatar size="m" type="space"  name="Engineering Space" initials="En" initialsLength={2} />
`,
];

export const AvatarExample = {
  title: 'Avatar',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: avatarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: avatarHtml,
        },
      ],
      text: (
        <div>
          <p>
            The <strong>WuiAvatar</strong> component creates a user icon. It
            will accept <WuiCode>name</WuiCode> (required) and{' '}
            <WuiCode>image</WuiCode> props and will configure the display and
            accessibility as needed. By default, the background colors come from
            the set of colors used for visualizations. Otherwise you can pass a
            hex value to the <WuiCode>color</WuiCode> prop.
          </p>
        </div>
      ),
      props: { WuiAvatar },
      snippet: avatarSnippet,
      demo: <Avatar />,
    },
    {
      title: 'Initials',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: avatarInitialsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: avatarInitialsHtml,
        },
      ],
      text: (
        <div>
          <p>
            The initials displayed in the avatar try to be smart based on the
            name prop. If the name contains spaces, it will display the first
            character of each word,{' '}
            <strong>always maxing out at 2 characters</strong>. You can
            customize this by passing a combination of{' '}
            <WuiCode>initialsLength</WuiCode> and/or <WuiCode>initials</WuiCode>{' '}
            props. However, the avatar will still always max out at 2
            characters.
          </p>
          <h3>Types</h3>
          <p>
            The avatar <WuiCode>type</WuiCode>, which primarily defines the
            shape, is keyworded and can be{' '}
            <WuiCode language="js">&quot;user&quot;</WuiCode> (default) or{' '}
            <WuiCode language="js">&quot;space&quot;</WuiCode> (for workspaces).
          </p>
        </div>
      ),
      snippet: avatarInitialsSnippet,
      demo: <AvatarInitials />,
    },
  ],
  playground: avatarConfig,
};
