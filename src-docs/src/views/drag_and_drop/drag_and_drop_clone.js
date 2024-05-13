import React, { useState } from 'react';
import {
  WuiButtonIcon,
  WuiDragDropContext,
  WuiFlexGroup,
  WuiFlexItem,
  WuiDraggable,
  WuiDroppable,
  WuiIcon,
  WuiPanel,
  wuiDragDropCopy,
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
  const [isItemRemovable, setIsItemRemovable] = useState(false);
  const [list1, setList1] = useState(makeList(3));
  const [list2, setList2] = useState([]);
  const lists = { DROPPABLE_AREA_COPY_1: list1, DROPPABLE_AREA_COPY_2: list2 };
  const actions = {
    DROPPABLE_AREA_COPY_1: setList1,
    DROPPABLE_AREA_COPY_2: setList2,
  };
  const remove = (droppableId, index) => {
    const list = Array.from(lists[droppableId]);
    list.splice(index, 1);

    actions[droppableId](list);
  };
  const onDragUpdate = ({ source, destination }) => {
    const shouldRemove =
      !destination && source.droppableId === 'DROPPABLE_AREA_COPY_2';
    setIsItemRemovable(shouldRemove);
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
        const result = wuiDragDropCopy(
          lists[sourceId],
          lists[destinationId],
          source,
          destination,
          {
            property: 'id',
            modifier: makeId,
          }
        );

        actions[sourceId](result[sourceId]);
        actions[destinationId](result[destinationId]);
      }
    } else if (!destination && source.droppableId === 'DROPPABLE_AREA_COPY_2') {
      remove(source.droppableId, source.index);
    }
  };
  return (
    <WuiDragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
      <WuiFlexGroup>
        <WuiFlexItem style={{ width: '50%' }}>
          <WuiDroppable
            droppableId="DROPPABLE_AREA_COPY_1"
            cloneDraggables={true}
            spacing="l"
            grow>
            {list1.map(({ content, id }, idx) => (
              <WuiDraggable key={id} index={idx} draggableId={id} spacing="l">
                <WuiPanel>{content}</WuiPanel>
              </WuiDraggable>
            ))}
          </WuiDroppable>
        </WuiFlexItem>
        <WuiFlexItem style={{ width: '50%' }}>
          <WuiDroppable droppableId="DROPPABLE_AREA_COPY_2" withPanel grow>
            {list2.length ? (
              list2.map(({ content, id }, idx) => (
                <WuiDraggable
                  key={id}
                  index={idx}
                  draggableId={id}
                  spacing="l"
                  isRemovable={isItemRemovable}>
                  <WuiPanel>
                    <WuiFlexGroup gutterSize="none" alignItems="center">
                      <WuiFlexItem>{content}</WuiFlexItem>
                      <WuiFlexItem grow={false}>
                        {isItemRemovable ? (
                          <WuiIcon type="trash" color="danger" />
                        ) : (
                          <WuiButtonIcon
                            iconType="cross"
                            aria-label="Remove"
                            onClick={() => remove('DROPPABLE_AREA_COPY_2', idx)}
                          />
                        )}
                      </WuiFlexItem>
                    </WuiFlexGroup>
                  </WuiPanel>
                </WuiDraggable>
              ))
            ) : (
              <WuiFlexGroup
                alignItems="center"
                justifyContent="spaceAround"
                gutterSize="none"
                style={{ height: '100%' }}>
                <WuiFlexItem grow={false}>Drop Items Here</WuiFlexItem>
              </WuiFlexGroup>
            )}
          </WuiDroppable>
        </WuiFlexItem>
      </WuiFlexGroup>
    </WuiDragDropContext>
  );
};
