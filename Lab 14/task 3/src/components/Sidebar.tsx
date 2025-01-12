import React from 'react';
import { useDocument } from '../context/DocumentContext';
import { Users } from 'lucide-react';

export function Sidebar() {
  const { state } = useDocument();

  return (
    <div className="w-64 bg-gray-50 p-4 border-l">
      <Header />
      <CollaboratorsList collaborators={state.collaborators} />
    </div>
  );
}

function Header() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Users className="w-5 h-5 text-gray-600" />
      <h2 className="font-semibold text-gray-700">Collaborators</h2>
    </div>
  );
}

function CollaboratorsList({ collaborators }) {
  return (
    <ul className="space-y-2">
      {collaborators.map((collaborator) => (
        <CollaboratorItem key={collaborator.id} collaborator={collaborator} />
      ))}
    </ul>
  );
}

function CollaboratorItem({ collaborator }) {
  return (
    <li className="flex items-center justify-between p-2 rounded-lg bg-white">
      <span className="text-sm text-gray-700">{collaborator.name}</span>
      {collaborator.isTyping && (
        <span className="text-xs text-blue-500 animate-pulse">typing...</span>
      )}
    </li>
  );
}