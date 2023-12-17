import { DragEvent, useState } from "react";
import dragIcon from "./assets/grip-vertical.svg";
import { CanvasBlock } from "./components/canvasBlock";
import { SideBar } from "./components/sideBar";
import { PositionalBlocks } from "./shared/common.interface";
import { EditModal } from "./components/editModal";
import { ExportToJSON } from "./components/exportToJSON";
import { ImportFromJson } from "./components/importFromJson";
import { useLocalStorageState } from "./hooks/useLocalStorage.hook";

function App() {
  const [blockToBeRendered, setBlockToBeRendered] = useLocalStorageState<
    PositionalBlocks[]
  >("blockToBeRendered", []);
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

  const handleJsonImport = (data: PositionalBlocks[]) => {
    setBlockToBeRendered(data);
  };

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string);
        handleJsonImport(jsonData);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="h-screen lg:w-full md:w-4/5 bg-gray-200 p-4 flex flex-col gap-2 w-screen">
          {blockToBeRendered?.map((block) => (
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
          ))}
          <div className="flex justify-end gap-4">
            <div>
              <ImportFromJson
                setFile={(data) => {
                  readFile(data);
                }}
              />
            </div>
            <ExportToJSON dataArray={blockToBeRendered} />
          </div>
        </div>
        <div className="lg:1/5 md:w-1/5 h-screen bg-black p-4 mt-4 md:mt-0">
          <SideBar
            blocks={elements}
            title="BLOCKS"
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
