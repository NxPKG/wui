import React, { useState } from 'react';

import {
  WuiButtonEmpty,
  WuiPopover,
  WuiPopoverTitle,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

import GlobalFilterForm from './global_filter_form';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  return (
    <WuiPopover
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      button={
        <WuiButtonEmpty onClick={togglePopover} size="xs">
          + Add filter
        </WuiButtonEmpty>
      }
      anchorPosition="downCenter"
      withTitle>
      <WuiPopoverTitle>
        <WuiFlexGroup alignItems="baseline">
          <WuiFlexItem>Add a filter</WuiFlexItem>
          <WuiFlexItem grow={false}>
            {/* This button should open a modal */}
            <WuiButtonEmpty flush="right" size="xs">
              Edit as Query DSL
            </WuiButtonEmpty>
          </WuiFlexItem>
        </WuiFlexGroup>
      </WuiPopoverTitle>

      <GlobalFilterForm
        style={{ width: 400 }}
        onAdd={togglePopover}
        onCancel={togglePopover}
      />
    </WuiPopover>
  );
};
