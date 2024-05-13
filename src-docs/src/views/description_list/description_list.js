import React from 'react';

import {
  WuiDescriptionList,
  WuiFlexItem,
  WuiFlexGroup,
  WuiDescriptionListTitle,
  WuiDescriptionListDescription,
} from '../../../../src/components';

const favoriteVideoGames = [
  {
    title: 'The Elder Scrolls: Morrowind',
    description: 'The opening music alone evokes such strong memories.',
  },
  {
    title: 'TIE Fighter',
    description:
      'The sequel to XWING, join the dark side and fly for the Emporer.',
  },
  {
    title: 'Quake 2',
    description: 'The game that made me drop out of college.',
  },
];
export default () => (
  <WuiFlexGroup>
    <WuiFlexItem>
      <WuiDescriptionList listItems={favoriteVideoGames} />
    </WuiFlexItem>
    <WuiFlexItem>
      <WuiDescriptionList>
        <WuiDescriptionListTitle>Dota 2</WuiDescriptionListTitle>
        <WuiDescriptionListDescription>
          A videogame that I have spent way too much time on over the years.
        </WuiDescriptionListDescription>
        <WuiDescriptionListTitle>Kings Quest VI</WuiDescriptionListTitle>
        <WuiDescriptionListDescription>
          The game that forced me to learn DOS.
        </WuiDescriptionListDescription>
      </WuiDescriptionList>
    </WuiFlexItem>
  </WuiFlexGroup>
);
