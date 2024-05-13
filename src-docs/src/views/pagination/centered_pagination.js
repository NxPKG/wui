import React, { useState } from 'react';

import {
  WuiFlexGroup,
  WuiFlexItem,
  WuiPagination,
} from '../../../../src/components';

export default function() {
  const [activePage, setActivePage] = useState(0);
  const PAGE_COUNT = 10;

  const goToPage = pageNumber => {
    setActivePage(pageNumber);
  };

  return (
    <WuiFlexGroup justifyContent="spaceAround">
      <WuiFlexItem grow={false}>
        <WuiPagination
          aria-label="Centered pagination example"
          pageCount={PAGE_COUNT}
          activePage={activePage}
          onPageClick={activePage => goToPage(activePage)}
        />
      </WuiFlexItem>
    </WuiFlexGroup>
  );
}
