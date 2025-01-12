import type { DocumentState, DocumentAction } from '../types/document';

export function documentReducer(state: DocumentState, action: DocumentAction): DocumentState {
  switch (action.type) {
    case 'UPDATE_CONTENT': {
      const newHistory = [...state.history.slice(0, state.currentIndex + 1), action.payload];
      return {
        ...state,
        content: action.payload,
        history: newHistory,
        currentIndex: newHistory.length - 1
      };
    }
    
    case 'ADD_COLLABORATOR':
      return {
        ...state,
        collaborators: [...state.collaborators, action.payload]
      };
      
    case 'SET_TYPING':
      return {
        ...state,
        collaborators: state.collaborators.map(collaborator =>
          collaborator.id === action.payload.id
            ? { ...collaborator, isTyping: action.payload.isTyping }
            : collaborator
        )
      };

    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUserId: action.payload
      };
      
    case 'UNDO':
      if (state.currentIndex > 0) {
        return {
          ...state,
          content: state.history[state.currentIndex - 1],
          currentIndex: state.currentIndex - 1
        };
      }
      return state;
      
    case 'REDO':
      if (state.currentIndex < state.history.length - 1) {
        return {
          ...state,
          content: state.history[state.currentIndex + 1],
          currentIndex: state.currentIndex + 1
        };
      }
      return state;
      
    default:
      return state;
  }
}