import React from 'react';
import { useDocument } from '../../context/DocumentContext';
import { useTypingIndicator } from '../../hooks/useTypingIndicator';

export function EditorTextArea() {
  const { state, dispatch } = useDocument();
  const handleTyping = useTypingIndicator(dispatch, state.currentUserId);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'UPDATE_CONTENT', payload: e.target.value });
    handleTyping();
  };

  return (
    <textarea
      className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      value={state.content}
      onChange={handleChange}
      placeholder="Start typing your document..."
    />
  );
}