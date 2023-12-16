import { DragEvent } from "react";
import { PositionalBlocks } from "../shared/common.interface";
import { SideBlock } from "./sideBlock";

interface sideBarProps {
  title: string;
  blocks: PositionalBlocks[];
  // handleClick: (data: PositionalBlocks) => void;
  handleDragEnd: (
    e: DragEvent<HTMLDivElement>,
    block: PositionalBlocks
  ) => void;
}

export const SideBar = (props: sideBarProps) => {
  const { blocks, title, handleDragEnd } = props;
  return (
    <main className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold  text-white">{title}</h1>
      </header>
      <div className="flex flex-col gap-4">
        {blocks.map((block) => {
          return (
            <SideBlock
              // handleClick={(data) =>
              //   handleClick({
              //     id: data.id,
              //     label: data.label,
              //     icon: data.icon,
              //     fontSize: block.fontSize,
              //     fontWeight: block.fontWeight,
              //   })
              // }
              handleDragEnd={(data) => handleDragEnd(data.e, data.block)}
              block={block}
              key={block.id}
            />
          );
        })}
      </div>
    </main>
  );
};
