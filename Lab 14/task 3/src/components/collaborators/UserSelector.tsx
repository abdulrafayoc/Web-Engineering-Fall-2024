import React, { memo } from 'react';
import { UserCog } from 'lucide-react';
import { useDocument } from '../../context/DocumentContext';

export const UserSelector = memo(function UserSelector() {
  const { state, dispatch } = useDocument();

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_CURRENT_USER', payload: e.target.value });
  };

  return (
    <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
      <UserCog className="w-5 h-5 text-gray-600" />
      <select
        value={state.currentUserId}
        onChange={handleUserChange}
        aria-label="Select Current User"
        className="flex-1 p-1 rounded border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {state.collaborators.map((collaborator) => (
          <option key={collaborator.id} value={collaborator.id}>
            {collaborator.name}
          </option>
        ))}
      </select>
      <span className="text-xs text-gray-500">Current User</span>
    </div>
  );
});