import { PositionalBlocks } from "../shared/common.interface";

interface exportToJsonFileProps {
  dataArray: PositionalBlocks[];
}

export const ExportToJSON = (props: exportToJsonFileProps) => {
  const { dataArray } = props;
  const exportToJsonFile = () => {
    const jsonString = JSON.stringify(dataArray, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "page-layout.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      className="bg-blue-600  text-white px-4 py-2 rounded-md"
      onClick={exportToJsonFile}
    >
      Export to JSON
    </button>
  );
};
