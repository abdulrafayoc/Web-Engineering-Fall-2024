import React, { memo } from 'react';
import { useDocument } from '../context/DocumentContext';
import { Undo2, Redo2 } from 'lucide-react';

export const Controls = memo(function Controls() {
  const { state, dispatch } = useDocument();

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => dispatch({ type: 'UNDO' })}
        disabled={state.currentIndex === 0}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Undo"
      >
        <Undo2 className="w-5 h-5" />
      </button>
      <button
        onClick={() => dispatch({ type: 'REDO' })}
        disabled={state.currentIndex === state.history.length - 1}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Redo"
      >
        <Redo2 className="w-5 h-5" />
      </button>
    </div>
  );
});