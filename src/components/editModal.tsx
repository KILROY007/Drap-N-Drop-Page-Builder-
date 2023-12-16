import { KeyboardEvent, useEffect, useState } from "react";
import { PositionalBlocks } from "../shared/common.interface";
import { Input } from "./input";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalData: PositionalBlocks;
  onSave: (data: PositionalBlocks) => void;
}
export const EditModal = (props: EditModalProps) => {
  const { isOpen, onClose, modalData, onSave } = props;
  const [updatedBlock, setUpdatedBlock] = useState<PositionalBlocks>({});

  useEffect(() => {
    if (modalData) {
      setUpdatedBlock(modalData);
    }
  }, [modalData]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleSave = () => {
    const data = {
      ...updatedBlock,
      id: modalData.id,
    };
    onSave(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      tabIndex={0}
      onKeyDown={handleKeyPress}
    >
      <div className="bg-white p-8 rounded w-[25%]">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-semibold ">Edit Label</h1>
          <button onClick={onClose} className="text-gray-600 text-2xl">
            X
          </button>
        </div>
        <div className="border-dashed border-b-2 mt-5"></div>
        <div className="flex flex-col gap-8 mt-2">
          <Input
            title="Label"
            type="text"
            placeHolder="Enter label"
            onChange={(value) => {
              setUpdatedBlock((prevValue) => ({
                ...prevValue,
                label: value,
              }));
            }}
            value={updatedBlock.label}
          />
          <Input
            title="X"
            type="number"
            placeHolder="Enter X Coordinate"
            onChange={(value) => {
              setUpdatedBlock((prevValue) => ({
                ...prevValue,
                x: parseInt(value),
              }));
            }}
            value={updatedBlock.x}
          />
          <Input
            title="Y"
            type="number"
            placeHolder="Enter y Coordinate"
            onChange={(value) => {
              setUpdatedBlock((prevValue) => ({
                ...prevValue,
                y: parseInt(value),
              }));
            }}
            value={updatedBlock.y}
          />
          <Input
            title="Font Size"
            type="text"
            placeHolder="Enter Font Size"
            onChange={(value) => {
              setUpdatedBlock((prevValue) => ({
                ...prevValue,
                fontSize: value,
              }));
            }}
            value={updatedBlock.fontSize}
          />
          <Input
            title="Font Weight"
            type="text"
            placeHolder="Enter Font Weight"
            onChange={(value) => {
              setUpdatedBlock((prevValue) => ({
                ...prevValue,
                fontWeight: value,
              }));
            }}
            value={updatedBlock.fontWeight}
          />
        </div>
        <button
          className="bg-blue-600 px-4 py-2 mt-8 text-white rounded-md"
          onClick={() => {
            handleSave();
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
