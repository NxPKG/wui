import React, { useState } from 'react';
import {
  WuiDragDropContext,
  WuiDraggable,
  WuiDroppable,
  WuiButtonIcon,
  WuiPanel,
  wuiDragDropMove,
  wuiDragDropReorder,
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
  const [list, setList] = useState([1, 2]);
  const [list1, setList1] = useState(makeList(3));
  const [list2, setList2] = useState(makeList(3, 4));
  const lists = {
    COMPLEX_DROPPABLE_PARENT: list,
    COMPLEX_DROPPABLE_AREA_1: list1,
    COMPLEX_DROPPABLE_AREA_2: list2,
  };
  const actions = {
    COMPLEX_DROPPABLE_PARENT: setList,
    COMPLEX_DROPPABLE_AREA_1: setList1,
    COMPLEX_DROPPABLE_AREA_2: setList2,
  };
  const onDragEnd = ({ source, destination }) => {
    if (source && destination) {
      if (source.droppableId === destination.droppableId) {
        const items = wuiDragDropReorder(
          lists[destination.droppableId],
          source.index,
          destination.index
        );

        actions[destination.droppableId](items);
      } else {
        const sourceId = source.droppableId;
        const destinationId = destination.droppableId;
        const result = wuiDragDropMove(
          lists[sourceId],
          lists[destinationId],
          source,
          destination
        );

        actions[sourceId](result[sourceId]);
        actions[destinationId](result[destinationId]);
      }
    }
  };
  return (
    <WuiDragDropContext onDragEnd={onDragEnd}>
      <WuiDroppable
        droppableId="COMPLEX_DROPPABLE_PARENT"
        type="MACRO"
        direction="horizontal"
        withPanel
        spacing="l"
        style={{ display: 'flex' }}>
        {list.map((did, didx) => (
          <WuiDraggable
            key={did}
            index={didx}
            draggableId={`COMPLEX_DRAGGABLE_${did}`}
            spacing="l"
            style={{ flex: '1 0 50%' }}
            disableInteractiveElementBlocking // Allows button to be drag handle
          >
            {provided => (
              <WuiPanel paddingSize="s">
                <WuiButtonIcon
                  iconType="grab"
                  aria-label="Drag Handle"
                  {...provided.dragHandleProps}
                />
                <WuiDroppable
                  droppableId={`COMPLEX_DROPPABLE_AREA_${did}`}
                  type="MICRO"
                  spacing="m"
                  style={{ flex: '1 0 50%' }}>
                  {lists[`COMPLEX_DROPPABLE_AREA_${did}`].map(
                    ({ content, id }, idx) => (
                      <WuiDraggable
                        key={id}
                        index={idx}
                        draggableId={id}
                        spacing="m">
                        <WuiPanel>{content}</WuiPanel>
                      </WuiDraggable>
                    )
                  )}
                </WuiDroppable>
              </WuiPanel>
            )}
          </WuiDraggable>
        ))}
      </WuiDroppable>
    </WuiDragDropContext>
  );
};
