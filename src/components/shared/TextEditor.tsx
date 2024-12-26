import { CSSProperties, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
interface IProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  style?: CSSProperties;
  height?: number;
}

const TextEditor: React.FC<IProps> = ({
  className,
  defaultValue,
  onChange,
  style,
  height,
}) => {
  const editorHeight = height || 200;

  const [value, setValue] = useState(defaultValue || "");
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], 
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], 
    [{ indent: "-1" }, { indent: "+1" }], 
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  return (
    <ReactQuill
      modules={{
        toolbar: toolbarOptions,
      }}
      style={{
        height: editorHeight + "px",
        background: "white",
        color: "black",
        ...style,
      }}
      className={className || ""}
      theme="snow"
      value={value}
      onChange={(e) => {
        setValue(e);
        onChange && onChange(e || "");
      }}
    />
  );
};

export default TextEditor;