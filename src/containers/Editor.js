import React from 'react';
import {Editor, EditorState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';

export default function MyEditor(props) {
  const [editorState, setEditorState] = React.useState(
    setState(props.value)
  );

  const editor = React.useRef(null);

  function setState(value) {
    if (value) {
      return EditorState.createWithContent(stateFromHTML(props.value))
    } else {
      return EditorState.createEmpty()
    }
  }

  function focusEditor(props) {
    editor.current.focus();
  }

  React.useEffect(() => {
    focusEditor()

    // if (props.value) {
    //   // console.log(stateFromHTML(props.value));
    //   setEditorState(editorState.getCurrentContent().set(stateFromHTML(props.value)));
    // }

    // const result = stateToHTML(editorState.getCurrentContent());
    // console.log(result);

  }, [editorState, props.value]);

  return (
    <div onClick={focusEditor}>
      <Editor
        spellCheck
        ref={editor}
        editorState={editorState}
        onChange={editorState => setEditorState(editorState)}
      />
    </div>
  );
}