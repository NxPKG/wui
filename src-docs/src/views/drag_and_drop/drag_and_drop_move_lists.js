import React, { useState } from 'react';
import {
  WuiDragDropContext,
  WuiFlexGroup,
  WuiFlexItem,
  WuiDraggable,
  WuiDroppable,
  WuiIcon,
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
  const [list1, setList1] = useState(makeList(3));
  const [list2, setList2] = useState(makeList(3, 4));
  const onDragEnd = ({ source, destination }) => {
    const lists = { DROPPABLE_AREA_1: list1, DROPPABLE_AREA_2: list2 };
    const actions = { DROPPABLE_AREA_1: setList1, DROPPABLE_AREA_2: setList2 };
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
      <WuiFlexGroup>
        <WuiFlexItem>
          <WuiDroppable
            droppableId="DROPPABLE_AREA_1"
            spacing="m"
            withPanel
            grow={false}>
            {list1.length > 0 ? (
              list1.map(({ content, id }, idx) => (
                <WuiDraggable spacing="m" key={id} index={idx} draggableId={id}>
                  {(provided, state) => (
                    <WuiPanel>
                      {content}
                      {state.isDragging && ' ✨'}
                    </WuiPanel>
                  )}
                </WuiDraggable>
              ))
            ) : (
              <WuiFlexGroup
                alignItems="center"
                justifyContent="spaceAround"
                gutterSize="none"
                style={{ height: '100%' }}>
                <WuiFlexItem grow={false}>
                  <WuiIcon type="faceSad" />
                </WuiFlexItem>
              </WuiFlexGroup>
            )}
          </WuiDroppable>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiDroppable
            droppableId="DROPPABLE_AREA_2"
            spacing="m"
            withPanel
            grow={false}>
            {list2.length > 0 ? (
              list2.map(({ content, id }, idx) => (
                <WuiDraggable spacing="m" key={id} index={idx} draggableId={id}>
                  {(provided, state) => (
                    <WuiPanel>
                      {content}
                      {state.isDragging && ' ✨'}
                    </WuiPanel>
                  )}
                </WuiDraggable>
              ))
            ) : (
              <WuiFlexGroup
                alignItems="center"
                justifyContent="spaceAround"
                gutterSize="none"
                style={{ height: '100%' }}>
                <WuiFlexItem grow={false}>
                  <WuiIcon type="faceSad" />
                </WuiFlexItem>
              </WuiFlexGroup>
            )}
          </WuiDroppable>
        </WuiFlexItem>
      </WuiFlexGroup>
    </WuiDragDropContext>
  );
};
