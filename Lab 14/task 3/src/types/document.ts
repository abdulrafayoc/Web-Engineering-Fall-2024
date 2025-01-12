export interface Collaborator {
  id: string;
  name: string;
  isTyping: boolean;
}

export interface DocumentState {
  content: string;
  collaborators: Collaborator[];
  history: string[];
  currentIndex: number;
  currentUserId: string;
}

export type DocumentAction =
  | { type: 'UPDATE_CONTENT'; payload: string }
  | { type: 'ADD_COLLABORATOR'; payload: Collaborator }
  | { type: 'SET_TYPING'; payload: { id: string; isTyping: boolean } }
  | { type: 'SET_CURRENT_USER'; payload: string }
  | { type: 'UNDO' }
  | { type: 'REDO' };