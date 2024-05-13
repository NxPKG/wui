import React from 'react';

import {
  WuiBreadcrumbs,
  WuiButton,
  WuiPageContent,
  WuiPageContentHeader,
  WuiPageContentHeaderSection,
  WuiTitle,
  WuiSpacer,
} from '../../../../src/components';

export default () => {
  const breadcrumbs = [
    {
      text: 'Animals',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked Animals');
      },
      'data-test-subj': 'breadcrumbsAnimals',
    },
    {
      text: 'Reptiles',
    },
    {
      text: 'Boa constrictor',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked Boa constrictor');
      },
    },
    {
      text: 'Edit',
    },
  ];

  return (
    <WuiPageContent>
      <WuiBreadcrumbs
        breadcrumbs={breadcrumbs}
        truncate={false}
        aria-label="An example of WuiBreadcrumbs"
      />
      <WuiSpacer size="xs" />
      <WuiPageContentHeader>
        <WuiPageContentHeaderSection>
          <WuiTitle size="l">
            <h1>Boa constrictor</h1>
          </WuiTitle>
        </WuiPageContentHeaderSection>

        <WuiPageContentHeaderSection>
          <WuiButton>Cancel</WuiButton>
        </WuiPageContentHeaderSection>
      </WuiPageContentHeader>
    </WuiPageContent>
  );
};
