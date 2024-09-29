"use client";
import Header from "@/components/Header/Header";
import Item from "@/components/Item/Item";
import { useHightlights } from "@/data/Highlight.hooks";
import { HighlightItem } from "@/data/HighlightItem";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ObjectId } from "bson";

export default function HomePage() {
  const { items, updateItems, isLoading, deleteItem } = useHightlights();

  function handleAddItem() {
    updateItems((items) => [
      ...items,
      {
        _id: new ObjectId().toString(),
        highlight: "",
        order: items.length + 1,
      },
    ]);
  }

  function handleDelete(item: HighlightItem) {
    deleteItem(item._id);
  }

  function handleTextChange(item: HighlightItem, newText: string) {
    updateItems((items) =>
      items.map((i) => {
        if (i._id === item._id) {
          return { ...i, highlight: newText };
        }
        return i;
      })
    );
  }

  const sensors = useSensors(useSensor(PointerSensor));
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      updateItems((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="max-h-[80%] overflow-auto max-w-[1100px] w-full">
        <div className="flex flex-col bg-white  ">
          {/* Header */}

          <Header onAddHighlight={handleAddItem} isLoading={isLoading} />

          {/* Items */}

          <SortableContext
            items={items.map((e) => e._id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item) => {
              return (
                <Item
                  key={item._id}
                  highlightItem={item}
                  id={item._id}
                  onDelete={() => handleDelete(item)}
                  onTextChange={(text) => handleTextChange(item, text)}
                />
              );
            })}
          </SortableContext>

          {/*  */}
        </div>
      </div>
    </DndContext>
  );
}
