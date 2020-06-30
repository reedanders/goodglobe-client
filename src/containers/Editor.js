import React from 'react';
import PropTypes from 'prop-types';
import {Editor, EditorState} from 'draft-js';
import {stateFromHTML} from 'draft-js-import-html';

function CustomEditor(props) {
  const { value } = props;

  const [editorState, setEditorState] = React.useState(
    setState(value)
  );

  const editor = React.useRef(null);

  function setState(parentValue) {
    if (parentValue) {
      return EditorState.createWithContent(stateFromHTML(parentValue))
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

CustomEditor.propTypes = {
  value: PropTypes.string.isRequired,
};

export default (CustomEditor);