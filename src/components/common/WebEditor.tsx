"use client";
import WebEditorCSS from "./WebEditor.module.css";
import { useState } from "react";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";

type EditorProps = {
  editable: boolean;
  initial?: string;
};

const WebEditor = ({ editable, initial }: EditorProps) => {
  const [editor] = useState(() => withReact(createEditor()));

  const initialValue = initial
    ? JSON.parse(initial)
    : [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ];

  return (
    <div className={WebEditorCSS.editor}>
      <Slate editor={editor} initialValue={initialValue}>
        <Editable readOnly={!editable} />
      </Slate>
    </div>
  );
};

export default WebEditor;
