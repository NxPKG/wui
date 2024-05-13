import React, { useState, useEffect } from 'react';

import {
  useWuiTextDiff,
  WuiCode,
  WuiSpacer,
  WuiTextColor,
  WuiText,
} from '../../../../src/components';

export default () => {
  const [del, setDel] = useState(0);
  const [ins, setIns] = useState(0);

  const beforeText =
    'Orbiting this at a distance of roughly ninety-two million miles is an utterly insignificant little blue green planet whose ape- descended life forms are so amazingly primitive that they still think digital watches are a pretty neat idea.';
  const afterText =
    'Orbiting those at a distance of roughly ninety-nine billion yards is not insignificant dwaf red green planet whose ape- ascended life forms are so amazingly primitive that they still think digital clocks are a pretty neat idea.';

  const [rendered, textDiffObject] = useWuiTextDiff({
    beforeText,
    afterText,
  });

  useEffect(() => {
    textDiffObject.forEach(el => {
      if (el[0] === 1) {
        setIns(add => add + 1);
      } else if (el[0] === -1) {
        setDel(sub => sub + 1);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <WuiText>
        <p>{rendered}</p>
      </WuiText>
      <WuiSpacer />
      <WuiCode>
        <WuiTextColor color="secondary"> {ins} </WuiTextColor> Insertions,
        <WuiTextColor color="danger"> {del} </WuiTextColor>
        Deletions
      </WuiCode>
    </>
  );
};
