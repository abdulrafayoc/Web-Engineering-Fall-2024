import React from 'react';
import { useDocument } from '../../context/DocumentContext';
import { CollaboratorItem } from './CollaboratorItem';

export function CollaboratorList() {
  const { state } = useDocument();
  const { collaborators } = state;

  if (collaborators.length === 0) {
    return <p>No collaborators found.</p>;
  }

  return (
    <ul className="space-y-2">
      {collaborators.map((collaborator) => (
        <CollaboratorItem key={collaborator.id} collaborator={collaborator} />
      ))}
    </ul>
  );
}