import { Users } from 'lucide-react';
import { CollaboratorList } from './CollaboratorList';

export function Sidebar() {
  return (
    <div className="w-64 bg-gray-50 p-4 border-l">
      <CollaboratorHeader />
      <CollaboratorList />
    </div>
  );
}

function CollaboratorHeader() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Users className="w-5 h-5 text-gray-600" />
      <h2 className="font-semibold text-gray-700">Collaborators</h2>
      <p className="text-gray-600">Welcome to the team collaboration page.</p>
    </div>
  );
}