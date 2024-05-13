import React from 'react';

import { WuiDescriptionList } from '../../../../src/components';

const favoriteVideoGame = [
  {
    title: 'Name',
    description: 'The Elder Scrolls: Morrowind',
  },
  {
    title: 'Game style',
    description: 'Open-world, fantasy, action role-playing',
  },
  {
    title: 'Release date',
    description: '2002',
  },
];

export default () => (
  <WuiDescriptionList textStyle="reverse" listItems={favoriteVideoGame} />
);
