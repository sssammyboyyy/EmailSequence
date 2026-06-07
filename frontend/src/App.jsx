import { useState } from 'react';
import { emailSequence } from './data/emails';
import EmailPreview from './components/EmailPreview';

function App() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState(false);

  const currentEmail = emailSequence.find(e => e.week === selectedWeek);

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(currentEmail.html);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {/* ------------------------------------------------------------------ */}
      {/* MOBILE-ONLY TOP NAVIGATION (Consolidated & Highly Optimized) */}
      {/* ------------------------------------------------------------------ */}
      
      {/* Mobile: Unified Utility Header */}
      <header className="md:hidden h-14 bg-slate-900 text-slate-200 border-b border-slate-800 flex items-center justify-between px-3 shadow-sm z-20 shrink-0">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded bg-hahu-yellow flex items-center justify-center font-bold text-slate-900 text-xs">HA</div>
          <h1 className="text-sm font-bold text-white tracking-tight">Portal</h1>
        </div>
        
        {/* Utilities: Copy HTML & Dark Mode */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleCopyHtml}
            className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md font-medium text-xs transition-colors shadow-sm"
          >
            {copiedStatus ? 'Copied!' : 'Copy Code'}
          </button>
          
          <div className="h-4 w-px bg-slate-700"></div>
          
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDarkMode ? 'bg-indigo-500' : 'bg-slate-700'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </header>

      {/* Mobile: Horizontal Week Ribbon */}
      <nav className="md:hidden bg-slate-900 border-b border-slate-800 flex overflow-x-auto px-2 py-2 space-x-2 scrollbar-hide z-10 shrink-0 shadow-md">
        {emailSequence.map((email) => (
          <button
            key={email.week}
            onClick={() => setSelectedWeek(email.week)}
            className={`flex-shrink-0 flex items-center justify-center px-4 py-1.5 rounded-full transition-colors border ${
              selectedWeek === email.week
                ? 'bg-hahu-yellow text-slate-900 border-hahu-yellow font-bold shadow-sm'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <span className="text-xs whitespace-nowrap">Week {email.week}</span>
          </button>
        ))}
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* DESKTOP-ONLY SIDEBAR NAVIGATION */}
      {/* ------------------------------------------------------------------ */}
      <aside className="hidden md:flex w-80 bg-slate-900 text-slate-300 flex-col border-r border-slate-800 shadow-xl z-10 shrink-0">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded bg-hahu-yellow flex items-center justify-center font-bold text-slate-900">HA</div>
            <h1 className="text-xl font-bold text-white tracking-tight">Agency Portal</h1>
          </div>
          <p className="text-xs text-slate-400">B2B Email Sequence Manager</p>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Campaign Sequence
          </div>
          <nav className="space-y-1 px-2">
            {emailSequence.map((email) => (
              <button
                key={email.week}
                onClick={() => setSelectedWeek(email.week)}
                className={`w-full flex flex-col text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedWeek === email.week
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-xs font-medium opacity-80 mb-1">Week {email.week}</span>
                <span className="text-sm font-semibold truncate">{email.subject}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <span className="text-sm font-medium">Dark Mode Preview</span>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDarkMode ? 'bg-indigo-500' : 'bg-slate-600'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN CONTENT AREA (Email Preview) */}
      {/* ------------------------------------------------------------------ */}
      <main className="flex-1 flex flex-col h-full bg-slate-50 md:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4=')] relative overflow-hidden">
        
        {/* Desktop-Only Header */}
        <header className="hidden md:flex h-16 bg-white border-b border-slate-200 items-center justify-between px-8 shadow-sm z-10 shrink-0">
          <div className="flex flex-col overflow-hidden mr-4">
            <span className="text-xs text-slate-500 font-medium">Subject Line</span>
            <h2 className="text-lg font-bold text-slate-800 truncate">{currentEmail?.subject}</h2>
          </div>
          
          <div className="flex space-x-3 shrink-0">
            <button 
              onClick={handleCopyHtml}
              className="flex items-center space-x-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-md font-medium text-sm transition-all shadow-sm"
            >
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <span>{copiedStatus ? 'Copied!' : 'Copy HTML'}</span>
            </button>
          </div>
        </header>

        {/* Workspace Canvas (No padding on mobile, heavy padding on desktop) */}
        <div className="flex-1 p-0 md:p-8 overflow-hidden flex justify-center">
          
          <div className="w-full max-w-4xl h-full flex flex-col bg-white md:rounded-xl shadow-none md:shadow-2xl border-0 md:border border-slate-200 overflow-hidden ring-0 md:ring-1 ring-black/5">
            
            {/* Desktop-Only Browser Chrome Simulation */}
            <div className="hidden md:flex h-10 bg-slate-100 border-b border-slate-200 items-center px-4 space-x-2 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="flex-1 ml-4 flex justify-center">
                <div className="bg-white text-slate-400 text-xs px-3 py-1 rounded border border-slate-200 w-1/2 text-center truncate flex items-center justify-center space-x-2">
                  <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                  <span className="truncate">Client Inbox Preview - {isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                </div>
              </div>
            </div>
            
            {/* The Actual Isolated Preview (Fills entirely on mobile) */}
            <div className="flex-1 overflow-hidden relative bg-slate-50">
              <EmailPreview htmlContent={currentEmail?.html || ''} isDarkMode={isDarkMode} />
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}

export default App;
