"use client";
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import WebEditorCSS from "./WebEditor.module.css";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

import { useMemo, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

type editorProps = {
  editable: boolean;
  initial?: string;
};

function WebEditor({ editable, initial }: editorProps) {
  const [editor] = useState(() => withReact(createEditor()));
  // Update the initial content to be pulled from Local Storage if it exists.

  const initialValue = useMemo(
    () =>
      initial
        ? JSON.parse(initial)
        : [
            {
              type: "paragraph",
              children: [{ text: "" }],
            },
          ],
    []
  );

  return (
    <div className={WebEditorCSS.editor}>
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );
          if (isAstChange) {
            // Save the value to Local Storage.
            const content = JSON.stringify(value);
            localStorage.setItem("content", content);
          }
        }}
      >
        <Editable readOnly={!editable} />
      </Slate>
    </div>
  );
}

export default WebEditor;
