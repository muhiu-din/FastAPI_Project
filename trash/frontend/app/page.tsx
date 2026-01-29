'use client';

import React, { useState } from 'react';
import { Save, Trash2, Plus, Layout, FileText, Calendar } from 'lucide-react';

// Interface for our Note object
interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
}

export default function NoteSaver() {
  // State for the form inputs
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // State for the saved notes list
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Project Ideas',
      content: '1. AI-powered note taker\n2. E-commerce dashboard\n3. Portfolio redesign',
      date: new Date().toLocaleDateString(),
    },
  ]);

  // Handle saving the note
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newNote: Note = {
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleDateString(),
    };

    setNotes([newNote, ...notes]);
    
    // Reset form
    setTitle('');
    setContent('');
  };

  // Handle deleting a note
  const handleDelete = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100">
      
      {/* --- Navbar --- */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-600/20">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Note<span className="text-blue-600">X</span></span>
          </div>
          <div className="text-sm font-medium text-slate-500">
            {notes.length} {notes.length === 1 ? 'Note' : 'Notes'} Saved
          </div>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Input Form */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="bg-slate-900 px-6 py-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-400" />
                <h2 className="text-white font-semibold tracking-wide">New Entry</h2>
              </div>
              
              <form onSubmit={handleSave} className="p-6 space-y-5">
                <div>
                  <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter note title..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-700 placeholder:text-slate-400 font-medium"
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Content
                  </label>
                  <textarea
                    id="content"
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your thoughts here..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-700 placeholder:text-slate-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!title || !content}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/25 transition-all transform active:scale-[0.98]"
                >
                  <Save className="w-4 h-4" />
                  Save Note
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Saved Forms Box (Grid) */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-5 h-5 text-slate-400" />
              <h2 className="text-xl font-bold text-slate-800">Saved Notes</h2>
            </div>

            {notes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400">
                <FileText className="w-12 h-12 mb-3 opacity-20" />
                <p>No notes saved yet.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {notes.map((note) => (
                  <div 
                    key={note.id} 
                    className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                          <Calendar className="w-3 h-3" />
                          {note.date}
                        </div>
                        <button 
                          onClick={() => handleDelete(note.id)}
                          className="text-slate-300 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {note.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                        {note.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </main>
    </div>
  );
}