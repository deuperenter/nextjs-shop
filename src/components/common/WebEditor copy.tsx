"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import WebEditorCSS from "./WebEditor.module.css";

import { useEffect, useMemo, useState } from "react";
import { createEditor, Descendant, Editor, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { closeModal, showModal } from "@/lib/features/modal/modalSlice";
import { DELETE_WRITING, DELETE_WRITING_DISPATCH } from "@/lib/modal";

type editorProps = {
  editable: boolean;
  initial?: string;
  order?: number;
  last?: boolean;
};

function WebEditor({ editable, initial, order, last }: editorProps) {
  const [editor] = useState(() => withReact(createEditor()));
  const [writing, setWriting] = useState<Descendant[] | null>(null);
  const dispatch = useAppDispatch();
  const { yes } = useAppSelector((state) => state.modal.value);

  const initialValue = useMemo(
    () =>
      initial
        ? JSON.parse(initial)
        : [
            {
              type: "paragraph",
              children: [{ text: "내용을 입력하세요." }],
            },
          ],
    []
  );

  useEffect(() => {
    if (editable && yes === DELETE_WRITING) {
      Transforms.select(editor, {
        anchor: Editor.start(editor, []),
        focus: Editor.end(editor, []),
      });

      Transforms.delete(editor);

      if (!order || (order && last)) {
        dispatch(closeModal());
      }
    } else if (editable) {
      const content = localStorage.getItem(
        `${window.location.href}${order || ""}`
      );
      setWriting(content ? JSON.parse(content) : initialValue);
    } else {
      setWriting(initialValue);
    }
  }, [yes]);

  return (
    <div className={WebEditorCSS.editor}>
      <button onClick={() => dispatch(showModal(DELETE_WRITING_DISPATCH))}>
        모두 삭제
      </button>
      {writing && (
        <Slate
          editor={editor}
          initialValue={writing}
          onChange={(value: any) => {
            const isAstChange = editor.operations.some(
              (op: { type: string }) => "set_selection" !== op.type
            );
            if (isAstChange) {
              const content = JSON.stringify(value);
              localStorage.setItem(
                `${window.location.href}${order || ""}`,
                content
              );
            }
          }}
        >
          <Editable readOnly={!editable} />
        </Slate>
      )}
    </div>
  );
}

export default WebEditor;
