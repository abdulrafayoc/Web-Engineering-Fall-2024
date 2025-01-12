import { useRef, useCallback } from 'react';
import type { DocumentAction } from '../types/document';

export function useTypingIndicator(dispatch: React.Dispatch<DocumentAction>, userId: string) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const startTyping = useCallback(() => {
    dispatch({ type: 'SET_TYPING', payload: { id: userId, isTyping: true } });
  }, [dispatch, userId]);

  const stopTyping = useCallback(() => {
    dispatch({ type: 'SET_TYPING', payload: { id: userId, isTyping: false } });
  }, [dispatch, userId]);

  const handleTyping = useCallback(() => {
    startTyping();
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(stopTyping, 1000);
  }, [startTyping, stopTyping]);

  return handleTyping;
}