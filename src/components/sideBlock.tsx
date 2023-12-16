import { DragEvent } from "react";
import { PositionalBlocks } from "../shared/common.interface";

interface SideBlockProps {
  block: PositionalBlocks;
  // handleClick: (data: Element) => void;
  handleDragEnd: (data: {
    e: DragEvent<HTMLDivElement>;
    block: PositionalBlocks;
  }) => void;
}

export const SideBlock = (props: SideBlockProps) => {
  const { block, handleDragEnd } = props;
  return (
    <div
      className="flex gap-8 px-2 py-4 bg-white rounded-md"
      draggable
      // onClick={() =>
      //   handleClick({
      //     id: block.id,
      //     label: block.label,
      //     icon: block.icon,
      //     fontSize: block.fontSize,
      //     fontWeight: block.fontWeight,
      //   })
      // }
      onDragEnd={(e) => handleDragEnd({ e, block })}
    >
      <img src={block.icon} alt="drag-icon" className="pl-2" />
      <h1 className={`text-[${block.fontSize}] font-[${block.fontWeight}] `}>
        {block.label}
      </h1>
    </div>
  );
};
