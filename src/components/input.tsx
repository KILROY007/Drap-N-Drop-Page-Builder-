import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  title: string;
  placeHolder: string;
  onChange: (value: string) => void;
  type: HTMLInputTypeAttribute;
  value: string | number;
}
export const Input = (props: InputProps) => {
  const { onChange, placeHolder, title, type, value } = props;
  return (
    <div className="flex flex-col gap-2">
      <h1>{title}</h1>
      <input
        value={value}
        type={type}
        placeholder={placeHolder}
        onChange={(e) => onChange(e.target.value)}
        className="py-2 px-4 border-2"
      />
    </div>
  );
};
