import React, { memo } from 'react';
import type { Collaborator } from '../../types/document';

interface CollaboratorItemProps {
  collaborator: Collaborator;
}

export const CollaboratorItem = memo(function CollaboratorItem({ 
  collaborator: { name, isTyping } 
}: CollaboratorItemProps) {
  return (
    <li className="flex items-center justify-between p-2 rounded-lg bg-white">
      <span className="text-sm text-gray-700">{name}</span>
      {isTyping && (
        <span className="text-xs text-blue-500 animate-pulse">typing...</span>
      )}
    </li>
  );
});