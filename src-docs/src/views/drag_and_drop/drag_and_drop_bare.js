import React, { useState } from 'react';
import {
  WuiDragDropContext,
  WuiDraggable,
  WuiDroppable,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

const makeId = htmlIdGenerator();

const makeList = (number, start = 1) =>
  Array.from({ length: number }, (v, k) => k + start).map(el => {
    return {
      content: `Item ${el}`,
      id: makeId(),
    };
  });

export default () => {
  const [list] = useState(makeList(3));
  const onDragEnd = ({ source, destination }) => {
    console.log(source, destination);
  };
  return (
    <WuiDragDropContext onDragEnd={onDragEnd}>
      <WuiDroppable droppableId="DROPPABLE_AREA_BARE">
        {list.map(({ content, id }, idx) => (
          <WuiDraggable key={id} index={idx} draggableId={id}>
            {() => <div>{content}</div>}
          </WuiDraggable>
        ))}
      </WuiDroppable>
    </WuiDragDropContext>
  );
};
