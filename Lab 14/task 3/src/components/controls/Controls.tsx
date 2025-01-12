import React, { memo } from 'react';
import { Undo2, Redo2 } from 'lucide-react';
import { useDocument } from '../../context/DocumentContext';
import { ControlButton } from './ControlButton';

export const Controls = memo(function Controls() {
  const { state, dispatch } = useDocument();

  return (
    <div className="flex gap-2 mb-4">
      <ControlButton
        onClick={() => dispatch({ type: 'UNDO' })}
        disabled={state.currentIndex === 0}
        title="Undo"
        Icon={Undo2}
      />
      <ControlButton
        onClick={() => dispatch({ type: 'REDO' })}
        disabled={state.currentIndex === state.history.length - 1}
        title="Redo"
        Icon={Redo2}
      />
    </div>
  );
});