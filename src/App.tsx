import { DragEvent, useState } from "react";
import dragIcon from "./assets/grip-vertical.svg";
import { CanvasBlock } from "./components/canvasBlock";
import { SideBar } from "./components/sideBar";
import { PositionalBlocks } from "./shared/common.interface";
import { EditModal } from "./components/editModal";
import { ExportToJSON } from "./components/exportToJSON";

function App() {
  const [blockToBeRendered, setBlockToBeRendered] = useState<
    PositionalBlocks[]
  >([]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<PositionalBlocks>({});

  const elements = [
    {
      id: 1,
      icon: dragIcon,
      label: "Label",
      fontSize: "16px",
      fontWeight: "normal",
      x: 0,
      y: 0,
    },
    {
      id: 2,
      icon: dragIcon,
      label: "Input",
      fontSize: "16px",
      fontWeight: "normal",
      x: 0,
      y: 0,
    },
    {
      id: 3,
      icon: dragIcon,
      label: "Button",
      fontSize: "16px",
      fontWeight: "normal",
      x: 0,
      y: 0,
    },
  ];

  const handleDragEnd = (
    e: DragEvent<HTMLDivElement>,
    data: PositionalBlocks
  ) => {
    const existingElementIndex = blockToBeRendered.findIndex(
      (block) => block.id === data.id
    );

    if (existingElementIndex !== -1) {
      const updatedArray = [...blockToBeRendered];
      updatedArray[existingElementIndex] = {
        ...blockToBeRendered[existingElementIndex],
        x: e.clientX,
        y: e.clientY,
      };
      setBlockToBeRendered(updatedArray);
    } else {
      const newBlock = {
        id: data.id,
        label: data.label,
        icon: data.icon,
        fontSize: data.fontSize,
        fontWeight: data.fontWeight,
        x: e.clientX,
        y: e.clientY,
      };
      setBlockToBeRendered((prevValue) => [...prevValue, newBlock]);
    }
  };

  const handleDelete = (data: PositionalBlocks) => {
    const updatedArray = blockToBeRendered.filter(
      (block) => block.id !== data.id
    );
    setBlockToBeRendered(updatedArray);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="h-screen lg:w-4/5 bg-gray-200 p-4 flex flex-col gap-2 w-screen">
          {blockToBeRendered?.map((block) => {
            return (
              <CanvasBlock
                block={block}
                key={block.id}
                handleDragEnd={(data) => handleDragEnd(data.e, data.block)}
                handleDoubleClick={(data) => {
                  setModalData(data);
                  setShowModal(true);
                }}
                handleKeyDown={(data) => handleDelete(data)}
              />
            );
          })}
          <div className="flex justify-end">
            <ExportToJSON dataArray={blockToBeRendered} />
          </div>
        </div>
        <div className="lg:w-1/5 h-screen bg-black p-4 mt-4 md:mt-0">
          <SideBar
            blocks={elements}
            title="BLOCKS"
            // handleClick={(data) => {
            //   const newBlock = {
            //     id: Date.now() + Math.random(),
            //     label: data.label,
            //     icon: data.icon,
            //     fontSize: data.fontSize,
            //     fontWeight: data.fontWeight,
            //     x: 0,
            //     y: 0,
            //   };
            //   setBlockToBeRendered((prevValue) => [...prevValue, newBlock]);
            //   setShowModal(true);
            // }}
            handleDragEnd={(e, data) => {
              const newBlock = {
                id: Date.now() + Math.random(),
                label: data.label,
                icon: data.icon,
                fontSize: data.fontSize,
                fontWeight: data.fontWeight,
                x: e.clientX,
                y: e.clientY,
              };
              setBlockToBeRendered((prevValue) => [...prevValue, newBlock]);
              setModalData(newBlock);
              setShowModal(true);
            }}
          />
        </div>
      </div>
      <EditModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        modalData={modalData}
        onSave={(data) => {
          const existingElementIndex = blockToBeRendered.findIndex(
            (block) => block.id === data.id
          );
          const updatedArray = [...blockToBeRendered];
          updatedArray[existingElementIndex] = data;
          setBlockToBeRendered(updatedArray);
        }}
      />
    </>
  );
}

export default App;
