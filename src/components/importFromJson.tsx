interface importFromJsonProps {
  setFile: (data: File) => void;
}

export const ImportFromJson = (props: importFromJsonProps) => {
  const { setFile } = props;
  return (
    <input
      type="file"
      onChange={(e) => setFile((e.target.files as any)[0])}
      accept="application/json"
      className="bg-blue-600  text-white px-4 py-2 rounded-md"
      placeholder=" Import From Json  "
    />
  );
};
