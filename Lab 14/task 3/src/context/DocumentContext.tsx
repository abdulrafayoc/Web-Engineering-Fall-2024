import React, { createContext, useContext, useReducer, useMemo } from 'react';
import type { DocumentState, DocumentAction } from '../types/document';
import { documentReducer } from '../reducers/documentReducer';

// Initial state for the document context
const initialState: DocumentState = {
  content: '',
  collaborators: [
    { id: '1', name: 'Alice', isTyping: false },
    { id: '2', name: 'Bob', isTyping: false }
  ],
  history: [''],
  currentIndex: 0,
  currentUserId: '1'
};

// Create a context for the document
const DocumentContext = createContext<{
  state: DocumentState;
  dispatch: React.Dispatch<DocumentAction>;
} | null>(null);

// Provider component for the document context
export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(documentReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
}

// Custom hook to use the document context
export function useDocument() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
}