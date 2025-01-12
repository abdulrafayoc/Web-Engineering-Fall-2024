import React from 'react';
import { DocumentProvider } from './context/DocumentContext';
import { Editor } from './components/editor/Editor';
import { Sidebar } from './components/collaborators/Sidebar';
import { Controls } from './components/controls/Controls';
import { UserSelector } from './components/collaborators/UserSelector';

function App() {
  return (
    <DocumentProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-xl font-semibold text-gray-800">Collaborative Editor</h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-sm flex">
            <div className="flex-1 p-6">
              <UserSelector />
              <Controls />
              <Editor />
            </div>
            <Sidebar />
          </div>
        </main>
      </div>
    </DocumentProvider>
  );
}

export default App;