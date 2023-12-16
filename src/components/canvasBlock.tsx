import { DragEvent, KeyboardEvent, useState } from "react";
import { PositionalBlocks } from "../shared/common.interface";

interface CanvasBlockProps {
  block: PositionalBlocks;
  handleDragEnd: (data: {
    e: DragEvent<HTMLDivElement>;
    block: PositionalBlocks;
  }) => void;
  handleDoubleClick: (block: PositionalBlocks) => void;
  handleKeyDown: (block: PositionalBlocks) => void;
}

export const CanvasBlock = (props: CanvasBlockProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { block, handleDragEnd, handleDoubleClick, handleKeyDown } = props;

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Delete") {
      handleKeyDown(block);
    }
  };

  return (
    <div
      className={`flex gap-8 px-2 py-4 bg-white rounded-md w-60 ${
        isSelected ? "border-2 border-red-500" : ""
      }`}
      key={block.id}
      draggable
      onClick={() => setIsSelected(!isSelected)}
      onDragEnd={(e) => handleDragEnd({ e, block })}
      style={{
        position: "absolute",
        left: block?.x || block.x,
        top: block?.y || block.y,
        cursor: "grabbing",
      }}
      onDoubleClick={() => handleDoubleClick(block)}
      tabIndex={0}
      onKeyDown={handleKeyPress}
    >
      <img src={block.icon} alt="drag-icon" className="pl-2" />
      <h1
        style={{
          fontSize: `${block.fontSize}`,
          fontWeight: `${block.fontWeight}`,
        }}
      >
        {block.label}
      </h1>
    </div>
  );
};
