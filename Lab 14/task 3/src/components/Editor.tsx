import React, { useCallback, useRef } from 'react';
import { useDocument } from '../context/DocumentContext';

export function Editor() {
  const { state, dispatch } = useDocument();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const setTypingStatus = (isTyping: boolean) => {
    dispatch({ type: 'SET_TYPING', payload: { id: '1', isTyping } });
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'UPDATE_CONTENT', payload: e.target.value });
    setTypingStatus(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setTypingStatus(false);
    }, 1000);
  }, [dispatch]);

  return (
    <div className="w-full">
      <textarea
        className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        value={state.content}
        onChange={handleChange}
        placeholder="Start typing your document..."
      />
    </div>
  );
}