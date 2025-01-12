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
}