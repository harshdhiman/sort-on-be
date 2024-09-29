"use client";
import { HighlightItem } from "@/data/HighlightItem";
import { useSortable } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { MdOutlineDragIndicator } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { CSS } from "@dnd-kit/utilities";

export type ItemProps = {
  id: string;
  highlightItem?: HighlightItem;
  onDelete?: () => void;
  onTextChange?: (text: string) => void;
};

export default function Item(props: ItemProps) {
  const { highlightItem, onDelete } = props;

  // Local Text State
  const [value, setValue] = useState(highlightItem?.highlight ?? "");

  // Debounced text change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      props.onTextChange?.(value);
    }, 500);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Draggable Data
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        style={style}
        className="bg-white flex gap-2 h-[75px] items-center justify-center border border-collapse border-border"
      >
        {/* Drag Handle */}
        <button
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          className="hover:bg-gray-100 flex items-center justify-center h-full w-[52px] px-4 "
        >
          <MdOutlineDragIndicator />
        </button>

        {/* Input */}
        <div className="w-full px-5">
          <input
            type="text"
            className="w-full bg-transparent border-border border rounded-md px-2 py-1 
            focus:outline-none text-[14px]"
            placeholder="Write a highlight..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        {/* Delete Button */}
        <button
          className=" w-[112px] flex items-center text-[21px] text-[#4E5864] justify-center hover:bg-gray-100 transition-all h-full"
          onClick={onDelete}
        >
          <RiDeleteBinLine />
        </button>
      </div>
    </>
  );
}
