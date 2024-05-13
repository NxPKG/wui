import React, { Fragment } from 'react';

import {
  WuiDescriptionList,
  WuiSpacer,
  WuiTitle,
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
  <Fragment>
    <WuiDescriptionList
      type="column"
      listItems={favoriteVideoGames}
      style={{ maxWidth: '400px' }}
    />

    <WuiSpacer size="xl" />

    <WuiTitle size="s">
      <h3>
        The following list will become the typical row format on small screens
      </h3>
    </WuiTitle>

    <WuiSpacer />

    <WuiDescriptionList
      type="responsiveColumn"
      listItems={favoriteVideoGames}
      style={{ maxWidth: '400px' }}
    />
  </Fragment>
);
