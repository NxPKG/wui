import React from 'react';

import {
  WuiBreadcrumbs,
  WuiSpacer,
  WuiTitle,
} from '../../../../src/components';

export default () => {
  const breadcrumbs = [
    {
      text: 'Animals',
      href: '#',
    },
    {
      text:
        'Metazoans is a real mouthful, especially for creatures without mouths',
      href: '#',
      truncate: true,
    },
    {
      text: 'Chordates',
      href: '#',
    },
    {
      text: 'Vertebrates',
      href: '#',
    },
    {
      text: 'Tetrapods',
      href: '#',
    },
    {
      text: 'Reptiles',
      href: '#',
    },
    {
      text: 'Boa constrictor',
      href: '#',
    },
    {
      text:
        'Nebulosa subspecies is also a real mouthful, especially for creatures without mouths',
    },
  ];

  return (
    <div>
      <WuiTitle size="xs">
        <span>Truncation on the entire set</span>
      </WuiTitle>
      <WuiSpacer size="s" />
      <WuiBreadcrumbs
        truncate={true}
        breadcrumbs={breadcrumbs}
        aria-label="An example of WuiBreadcrumbs with truncate prop"
      />
      <WuiSpacer />
      <WuiTitle size="xs">
        <span>Truncation on a single item</span>
      </WuiTitle>
      <WuiSpacer size="s" />
      <WuiBreadcrumbs
        truncate={false}
        breadcrumbs={breadcrumbs}
        aria-label="An example of WuiBreadcrumbs without truncate prop"
      />
    </div>
  );
};
