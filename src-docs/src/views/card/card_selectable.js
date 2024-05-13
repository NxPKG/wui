import React, { useState } from 'react';

import {
  WuiButtonEmpty,
  WuiCard,
  WuiIcon,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

export default () => {
  const [card1Selected, setCard1] = useState(true);
  const [card2Selected, setCard2] = useState(false);

  const card1Clicked = () => {
    setCard1(!card1Selected);
  };

  const card2Clicked = () => {
    setCard2(!card2Selected);
  };

  const detailsClicked = e => {
    e.stopPropagation();
    console.log('Details clicked');
  };

  return (
    <WuiFlexGroup gutterSize="l">
      <WuiFlexItem>
        <WuiCard
          icon={<WuiIcon size="xxl" type="logoSketch" />}
          title="Sketch"
          description="Example of a short card description."
          footer={
            <WuiButtonEmpty
              iconType="iInCircle"
              size="xs"
              onClick={detailsClicked}
              aria-label="See more details about Sketch">
              More details
            </WuiButtonEmpty>
          }
          selectable={{
            onClick: card1Clicked,
            isSelected: card1Selected,
          }}
        />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiCard
          icon={<WuiIcon size="xxl" type="logoGCP" />}
          title="Google"
          description="Example of a longer card description. See how the footers stay lined up."
          footer={
            <WuiButtonEmpty
              iconType="iInCircle"
              size="xs"
              onClick={detailsClicked}
              aria-label="See more details about Google">
              More details
            </WuiButtonEmpty>
          }
          selectable={{
            onClick: card2Clicked,
            isSelected: card2Selected,
          }}
        />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiCard
          icon={<WuiIcon size="xxl" type="logoAerospike" />}
          title="Not Adobe"
          description="Example of a short card description."
          footer={
            <WuiButtonEmpty
              iconType="iInCircle"
              size="xs"
              onClick={detailsClicked}
              aria-label="See more details about Not Adobe">
              More details
            </WuiButtonEmpty>
          }
          selectable={{
            onClick: () => {},
            isDisabled: true,
          }}
        />
      </WuiFlexItem>
    </WuiFlexGroup>
  );
};
