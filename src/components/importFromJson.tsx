import React, { useRef } from "react";

interface ImportFromJsonProps {
  setFile: (data: File) => void;
}

export const ImportFromJson = (props: ImportFromJsonProps) => {
  const { setFile } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Import From JSON
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/json"
        className="hidden"
      />
    </>
  );
};
